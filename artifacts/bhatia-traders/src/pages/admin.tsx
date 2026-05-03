import React, { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Save, Upload, ChevronDown, ChevronUp, CheckCircle2, Loader2, AlertCircle, LogOut, Image as ImageIcon } from "lucide-react";

// ─────────────────────────── Constants ───────────────────────────
const ADMIN_USERNAME = "amarpreet";
const ADMIN_PASSWORD = "jeet4Bhatia";
const GITHUB_TOKEN = import.meta.env.VITE_CMS_TOKEN as string;
const GITHUB_OWNER = "amarpreetbhatia";
const GITHUB_REPO = "bhatia-trader";
const CONTENT_PATH = "artifacts/bhatia-traders/src/content/site-content.json";
const IMAGES_PATH = "artifacts/bhatia-traders/public/images";
const GH_HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
};

// ─────────────────────── GitHub helpers ───────────────────────
async function ghFetchContent() {
  const r = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
    { headers: GH_HEADERS }
  );
  if (!r.ok) throw new Error(`GitHub API error ${r.status}`);
  const d = await r.json();
  const decoded = decodeURIComponent(escape(atob(d.content.replace(/\n/g, ""))));
  return { content: JSON.parse(decoded), sha: d.sha as string };
}

async function ghSaveContent(content: object, sha: string) {
  const json = JSON.stringify(content, null, 2);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  const r = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
    {
      method: "PUT",
      headers: GH_HEADERS,
      body: JSON.stringify({
        message: "Update site content via CMS",
        content: encoded,
        sha,
      }),
    }
  );
  if (!r.ok) {
    const err = await r.json();
    throw new Error(err.message || `Save failed (${r.status})`);
  }
  return r.json();
}

async function ghUploadImage(file: File, filename: string) {
  const arrayBuf = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuf);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);

  // Check if file already exists (need sha to update)
  let sha: string | undefined;
  try {
    const check = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${IMAGES_PATH}/${filename}`,
      { headers: GH_HEADERS }
    );
    if (check.ok) sha = (await check.json()).sha;
  } catch {/* new file */}

  const body: Record<string, string> = {
    message: `Upload image: ${filename}`,
    content: base64,
  };
  if (sha) body.sha = sha;

  const r = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${IMAGES_PATH}/${filename}`,
    { method: "PUT", headers: GH_HEADERS, body: JSON.stringify(body) }
  );
  if (!r.ok) {
    const err = await r.json();
    throw new Error(err.message || `Upload failed (${r.status})`);
  }
  return filename;
}

async function ghPollDeployStatus(): Promise<"success" | "failure" | "in_progress"> {
  const r = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs?per_page=3`,
    { headers: GH_HEADERS }
  );
  const d = await r.json();
  const run = d.workflow_runs?.find((w: { name: string }) => w.name === "Deploy to GitHub Pages");
  if (!run) return "in_progress";
  if (run.status === "completed") return run.conclusion === "success" ? "success" : "failure";
  return "in_progress";
}

// ─────────────────────── Tiny UI helpers ───────────────────────
function Label({ text, hint }: { text: string; hint?: string }) {
  return (
    <div className="py-3 pr-4 w-48 shrink-0">
      <div className="font-semibold text-sm text-gray-800">{text}</div>
      {hint && <div className="text-xs text-gray-400 mt-0.5">{hint}</div>}
    </div>
  );
}

function TextInput({ value, onChange, multiline, rows = 3 }: {
  value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number;
}) {
  const cls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-y";
  return multiline ? (
    <textarea className={cls} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
  );
}

function ImageField({ label, hint, filename, onChange }: {
  label: string; hint?: string; filename: string; onChange: (filename: string, file?: File) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const BASE = import.meta.env.BASE_URL;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large. Please use an image under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
    setUploading(true);
    try {
      const newName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      await ghUploadImage(file, newName);
      onChange(newName, file);
    } catch (err) {
      alert(`Image upload failed: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex border-b border-gray-100 items-center gap-4 py-3">
      <Label text={label} hint={hint} />
      <div className="flex items-center gap-4 flex-1">
        <div className="w-20 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <img src={`${BASE}images/${filename}`} alt="current" className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          )}
        </div>
        <label className={`flex items-center gap-2 cursor-pointer bg-white border border-dashed border-blue-400 hover:border-blue-600 text-blue-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Upload New Photo"}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />
        </label>
        <span className="text-xs text-gray-400">JPG / PNG / WebP · Max 5MB</span>
      </div>
    </div>
  );
}

function FieldRow({ label, hint, value, onChange, multiline, rows }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number;
}) {
  return (
    <div className="flex border-b border-gray-100 items-start gap-4 py-3">
      <Label text={label} hint={hint} />
      <div className="flex-1 py-1">
        <TextInput value={value} onChange={onChange} multiline={multiline} rows={rows} />
      </div>
    </div>
  );
}

// ─────────────────────── Page tab forms ───────────────────────
type Content = ReturnType<typeof getDefaultContent>;
function getDefaultContent() {
  return {
    home: {
      heroBadge: "", taglineHindi1: "", taglineHindi2: "", taglineEnglish: "",
      heroDescHindi: "", heroDescEnglish: "", heroImage: "hero.jpg", yearsExperience: "",
      ctaTitleHindi: "", ctaDescEnglish: "",
      brands: [
        { title: "", descHindi: "", descEnglish: "" },
        { title: "", descHindi: "", descEnglish: "" },
        { title: "", descHindi: "", descEnglish: "" },
      ],
      whyChooseUs: [
        { hindi: "", english: "" }, { hindi: "", english: "" },
        { hindi: "", english: "" }, { hindi: "", english: "" },
      ],
    },
    products: {
      tvs: { titleHindi: "", titleEnglish: "", image: "motorcycle.jpg", features: Array(4).fill({ hindi: "", english: "" }) },
      jktyre: { titleHindi: "", titleEnglish: "", image: "tyre.jpg", features: Array(4).fill({ hindi: "", english: "" }) },
      exide: { titleHindi: "", titleEnglish: "", image: "battery.jpg", features: Array(4).fill({ hindi: "", english: "" }) },
    },
    promotions: { offers: "", news: "" },
    about: {
      mainImage: "about.jpg", para1Hindi: "", para1English: "", para2Hindi: "",
      stat1Value: "", stat1LabelEnglish: "", stat1LabelHindi: "",
      stat2Value: "", stat2LabelEnglish: "", stat2LabelHindi: "",
    },
    contact: { phone: "", email: "", address: "", hoursWeekday: "", hoursSunday: "", mapsEmbedUrl: "" },
  };
}

function set<T extends object>(obj: T, path: string, value: unknown): T {
  const keys = path.split(".");
  const result = JSON.parse(JSON.stringify(obj)) as T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = result;
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
  cur[keys[keys.length - 1]] = value;
  return result;
}

function HomeTab({ content, onChange }: { content: Content; onChange: (c: Content) => void }) {
  const h = content.home;
  const up = (path: string) => (v: string) => onChange(set(content, `home.${path}`, v));
  const brandNames = ["TVS Motor", "JK Tyre", "Exide Battery"];
  const whyLabels = ["Point 1", "Point 2", "Point 3", "Point 4"];
  return (
    <div>
      <ImageField label="Hero Image" hint="Main background photo" filename={h.heroImage}
        onChange={(name) => onChange(set(content, "home.heroImage", name))} />
      <FieldRow label="Badge Text" hint="Small tag above headline" value={h.heroBadge} onChange={up("heroBadge")} />
      <FieldRow label="Tagline (Hindi) Line 1" value={h.taglineHindi1} onChange={up("taglineHindi1")} />
      <FieldRow label="Tagline (Hindi) Line 2" hint="Shown in yellow" value={h.taglineHindi2} onChange={up("taglineHindi2")} />
      <FieldRow label="Subtitle (English)" value={h.taglineEnglish} onChange={up("taglineEnglish")} />
      <FieldRow label="Description (Hindi)" multiline rows={2} value={h.heroDescHindi} onChange={up("heroDescHindi")} />
      <FieldRow label="Description (English)" multiline rows={2} value={h.heroDescEnglish} onChange={up("heroDescEnglish")} />
      <FieldRow label="Years Experience" hint='e.g. "20+"' value={h.yearsExperience} onChange={up("yearsExperience")} />
      <FieldRow label="CTA Title (Hindi)" hint="Bottom section heading" value={h.ctaTitleHindi} onChange={up("ctaTitleHindi")} />
      <FieldRow label="CTA Subtitle (English)" value={h.ctaDescEnglish} onChange={up("ctaDescEnglish")} />

      <div className="mt-6 mb-2 font-bold text-gray-700 border-t pt-4">Brand Cards (3 brands)</div>
      {h.brands.map((brand, i) => (
        <div key={i} className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase mb-2">{brandNames[i]}</div>
          <FieldRow label="Hindi Description" value={brand.descHindi}
            onChange={(v) => { const b = [...h.brands]; b[i] = { ...b[i], descHindi: v }; onChange(set(content, "home.brands", b)); }} />
          <FieldRow label="English Description" value={brand.descEnglish}
            onChange={(v) => { const b = [...h.brands]; b[i] = { ...b[i], descEnglish: v }; onChange(set(content, "home.brands", b)); }} />
        </div>
      ))}

      <div className="mt-6 mb-2 font-bold text-gray-700 border-t pt-4">Why Choose Us (4 points)</div>
      {h.whyChooseUs.map((item, i) => (
        <div key={i} className="mb-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase mb-2">{whyLabels[i]}</div>
          <FieldRow label="Hindi Text" value={item.hindi}
            onChange={(v) => { const w = [...h.whyChooseUs]; w[i] = { ...w[i], hindi: v }; onChange(set(content, "home.whyChooseUs", w)); }} />
          <FieldRow label="English Text" value={item.english}
            onChange={(v) => { const w = [...h.whyChooseUs]; w[i] = { ...w[i], english: v }; onChange(set(content, "home.whyChooseUs", w)); }} />
        </div>
      ))}
    </div>
  );
}

function ProductSection({ sectionKey, label, data, content, onChange }: {
  sectionKey: "tvs" | "jktyre" | "exide"; label: string;
  data: Content["products"]["tvs"]; content: Content; onChange: (c: Content) => void;
}) {
  const up = (path: string) => (v: string) => onChange(set(content, `products.${sectionKey}.${path}`, v));
  return (
    <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 font-bold text-gray-700 border-b border-gray-200">{label}</div>
      <div className="p-3">
        <ImageField label="Product Image" filename={data.image}
          onChange={(name) => onChange(set(content, `products.${sectionKey}.image`, name))} />
        <FieldRow label="Title (Hindi)" value={data.titleHindi} onChange={up("titleHindi")} />
        <FieldRow label="Title (English)" value={data.titleEnglish} onChange={up("titleEnglish")} />
        {data.features.map((f, i) => (
          <div key={i} className="flex border-b border-gray-100 items-start gap-4 py-3">
            <Label text={`Feature ${i + 1}`} />
            <div className="flex-1 flex flex-col gap-1 py-1">
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hindi text" value={f.hindi}
                onChange={(e) => {
                  const feats = [...data.features]; feats[i] = { ...feats[i], hindi: e.target.value };
                  onChange(set(content, `products.${sectionKey}.features`, feats));
                }} />
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                placeholder="English text" value={f.english}
                onChange={(e) => {
                  const feats = [...data.features]; feats[i] = { ...feats[i], english: e.target.value };
                  onChange(set(content, `products.${sectionKey}.features`, feats));
                }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsTab({ content, onChange }: { content: Content; onChange: (c: Content) => void }) {
  return (
    <div>
      <ProductSection sectionKey="tvs" label="TVS Motorcycles & Scooters" data={content.products.tvs} content={content} onChange={onChange} />
      <ProductSection sectionKey="jktyre" label="JK Tyre" data={content.products.jktyre} content={content} onChange={onChange} />
      <ProductSection sectionKey="exide" label="Exide Battery" data={content.products.exide} content={content} onChange={onChange} />
    </div>
  );
}

function PromotionsTab({ content, onChange }: { content: Content; onChange: (c: Content) => void }) {
  const pr = content.promotions;
  return (
    <div>
      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <strong>Formatting tip:</strong> Use <code className="bg-blue-100 px-1 rounded">##</code> for headings,
        <code className="bg-blue-100 px-1 rounded mx-1">**bold text**</code> for bold,
        <code className="bg-blue-100 px-1 rounded mx-1">---</code> for a divider line.
      </div>
      <FieldRow label="Current Offers" hint="Promotions column" value={pr.offers} onChange={(v) => onChange(set(content, "promotions.offers", v))} multiline rows={14} />
      <FieldRow label="Latest News" hint="News column" value={pr.news} onChange={(v) => onChange(set(content, "promotions.news", v))} multiline rows={14} />
    </div>
  );
}

function AboutTab({ content, onChange }: { content: Content; onChange: (c: Content) => void }) {
  const a = content.about;
  const up = (path: string) => (v: string) => onChange(set(content, `about.${path}`, v));
  return (
    <div>
      <ImageField label="About Image" hint="Photo on About page" filename={a.mainImage}
        onChange={(name) => onChange(set(content, "about.mainImage", name))} />
      <FieldRow label="Paragraph 1 (Hindi)" multiline rows={3} value={a.para1Hindi} onChange={up("para1Hindi")} />
      <FieldRow label="Paragraph 1 (English)" multiline rows={3} value={a.para1English} onChange={up("para1English")} />
      <FieldRow label="Paragraph 2 (Hindi)" multiline rows={3} value={a.para2Hindi} onChange={up("para2Hindi")} />
      <div className="mt-4 mb-2 font-bold text-gray-700 border-t pt-4">Stats (2 boxes)</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase mb-2">Stat Box 1</div>
          <FieldRow label='Value' hint='e.g. "100%"' value={a.stat1Value} onChange={up("stat1Value")} />
          <FieldRow label="Label (English)" value={a.stat1LabelEnglish} onChange={up("stat1LabelEnglish")} />
          <FieldRow label="Label (Hindi)" value={a.stat1LabelHindi} onChange={up("stat1LabelHindi")} />
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase mb-2">Stat Box 2</div>
          <FieldRow label='Value' hint='e.g. "20k+"' value={a.stat2Value} onChange={up("stat2Value")} />
          <FieldRow label="Label (English)" value={a.stat2LabelEnglish} onChange={up("stat2LabelEnglish")} />
          <FieldRow label="Label (Hindi)" value={a.stat2LabelHindi} onChange={up("stat2LabelHindi")} />
        </div>
      </div>
    </div>
  );
}

function ContactTab({ content, onChange }: { content: Content; onChange: (c: Content) => void }) {
  const c = content.contact;
  const up = (path: string) => (v: string) => onChange(set(content, `contact.${path}`, v));
  return (
    <div>
      <FieldRow label="Phone Number" hint="+91 XXXXXXXXXX" value={c.phone} onChange={up("phone")} />
      <FieldRow label="Email Address" value={c.email} onChange={up("email")} />
      <FieldRow label="Address" hint="Each line on a new line" multiline rows={3} value={c.address} onChange={up("address")} />
      <FieldRow label="Weekday Hours" value={c.hoursWeekday} onChange={up("hoursWeekday")} />
      <FieldRow label="Sunday Hours" value={c.hoursSunday} onChange={up("hoursSunday")} />
      <FieldRow label="Google Maps URL" hint="Paste embed URL from Google Maps → Share → Embed" multiline rows={2} value={c.mapsEmbedUrl} onChange={up("mapsEmbedUrl")} />
    </div>
  );
}

// ─────────────────────── User Guide ───────────────────────
function UserGuide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 overflow-hidden">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left font-bold text-amber-800 hover:bg-amber-100 transition-colors">
        <span>📖 How to use this Content Manager — User Guide</span>
        {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-amber-900 space-y-3 border-t border-amber-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold mb-1">✅ How to change text:</p>
              <ol className="list-decimal list-inside space-y-1 text-amber-800">
                <li>Click the tab for the page you want to edit (Home, Products, etc.)</li>
                <li>Find the field you want to change</li>
                <li>Click inside the white box and edit the text</li>
                <li>Click the big green <strong>Save & Deploy</strong> button at the bottom</li>
                <li>Wait 2–3 minutes — the website will update automatically</li>
              </ol>
            </div>
            <div>
              <p className="font-bold mb-1">🖼️ How to change a photo:</p>
              <ol className="list-decimal list-inside space-y-1 text-amber-800">
                <li>Find the image field (shows a preview of the current photo)</li>
                <li>Click <strong>Upload New Photo</strong></li>
                <li>Choose a JPG or PNG image from your phone or computer (max 5MB)</li>
                <li>The new photo will appear as a preview immediately</li>
                <li>Click <strong>Save & Deploy</strong> — the website will update</li>
              </ol>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
            <p className="font-bold">⚠️ Important Rules:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Do <strong>NOT</strong> delete all the text from any field — keep some text always</li>
              <li>Do <strong>NOT</strong> add or remove sections — only change the text inside existing fields</li>
              <li>If the website looks broken after a save, contact your developer</li>
              <li>Each save triggers a full website rebuild (takes 2–3 minutes)</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800">
            <p className="font-bold">💡 Offers & News tab:</p>
            <p>Use <code className="bg-green-100 px-1 rounded">## Heading</code> for a heading, <code className="bg-green-100 px-1 rounded">**text**</code> for bold, and <code className="bg-green-100 px-1 rounded">---</code> (three dashes) to add a divider between items.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────── Login Screen ───────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Incorrect username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2e6e] to-[#0f1f4d] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1a2e6e] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bhatia Traders</h1>
          <p className="text-gray-500 text-sm mt-1">Content Manager · Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          <button type="submit"
            className="w-full bg-[#1a2e6e] hover:bg-[#0f1f4d] text-white font-bold py-3 rounded-lg transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────── Main Admin ───────────────────────
const TABS = [
  { id: "home", label: "🏠 Home" },
  { id: "products", label: "🏍️ Products" },
  { id: "promotions", label: "🏷️ Offers & News" },
  { id: "about", label: "ℹ️ About" },
  { id: "contact", label: "📞 Contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];
type SaveState = "idle" | "loading" | "saving" | "deploying" | "success" | "error";

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem("bt_admin") === "1");
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [content, setContent] = useState<Content>(getDefaultContent());
  const [sha, setSha] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  const loadContent = useCallback(async () => {
    setSaveState("loading");
    setErrorMsg("");
    try {
      const { content: c, sha: s } = await ghFetchContent();
      setContent(c as Content);
      setSha(s);
      setSaveState("idle");
    } catch (err) {
      setErrorMsg(`Failed to load content: ${(err as Error).message}`);
      setSaveState("error");
    }
  }, []);

  useEffect(() => {
    if (loggedIn) loadContent();
  }, [loggedIn, loadContent]);

  const handleLogin = () => {
    sessionStorage.setItem("bt_admin", "1");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bt_admin");
    setLoggedIn(false);
  };

  const handleSave = async () => {
    setSaveState("saving");
    setErrorMsg("");
    try {
      const result = await ghSaveContent(content, sha);
      setSha(result.content.sha);
      setSaveState("deploying");
      // Poll for deploy completion
      for (let i = 0; i < 30; i++) {
        await new Promise((r) => setTimeout(r, 8000));
        const status = await ghPollDeployStatus();
        if (status === "success") { setSaveState("success"); return; }
        if (status === "failure") { setSaveState("error"); setErrorMsg("Deploy failed — check GitHub Actions for details."); return; }
      }
      setSaveState("success");
    } catch (err) {
      setErrorMsg(`Save failed: ${(err as Error).message}`);
      setSaveState("error");
    }
  };

  if (!loggedIn) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a2e6e] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#1a2e6e] font-bold text-sm">B</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Bhatia Traders</h1>
            <p className="text-blue-200 text-xs">Website Content Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href={import.meta.env.BASE_URL || "/"} target="_blank" rel="noreferrer"
            className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition-colors">
            <ImageIcon className="w-4 h-4" />View Website
          </a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <UserGuide />

        {/* Load error */}
        {saveState === "loading" && (
          <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading current website content...</span>
          </div>
        )}

        {saveState === "error" && errorMsg.includes("load") && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Could not load content</p>
              <p className="text-sm mt-1">{errorMsg}</p>
              <button onClick={loadContent} className="mt-3 text-sm text-red-700 underline">Try again</button>
            </div>
          </div>
        )}

        {(saveState !== "loading" && !errorMsg.includes("load")) && (
          <>
            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-white rounded-xl p-1.5 shadow-sm border border-gray-200 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-max px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#1a2e6e] text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              {activeTab === "home" && <HomeTab content={content} onChange={setContent} />}
              {activeTab === "products" && <ProductsTab content={content} onChange={setContent} />}
              {activeTab === "promotions" && <PromotionsTab content={content} onChange={setContent} />}
              {activeTab === "about" && <AboutTab content={content} onChange={setContent} />}
              {activeTab === "contact" && <ContactTab content={content} onChange={setContent} />}
            </div>

            {/* Save bar */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              {saveState === "error" && !errorMsg.includes("load") && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}
              {saveState === "success" && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>Website updated successfully!</strong> Changes are live at{" "}
                    <a href="https://amarpreetbhatia.github.io/bhatia-trader/" target="_blank" rel="noreferrer"
                      className="underline">amarpreetbhatia.github.io/bhatia-trader</a>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  {saveState === "deploying" && (
                    <span className="flex items-center gap-2 text-blue-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deploying... website will be live in ~2 minutes
                    </span>
                  )}
                  {saveState === "idle" && "Make changes above, then save to update the website."}
                  {saveState === "saving" && (
                    <span className="flex items-center gap-2 text-blue-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving changes to GitHub...
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSave}
                  disabled={saveState === "saving" || saveState === "deploying"}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-md text-base"
                >
                  {saveState === "saving" || saveState === "deploying"
                    ? <><Loader2 className="w-5 h-5 animate-spin" />Deploying...</>
                    : <><Save className="w-5 h-5" />Save & Deploy</>}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
