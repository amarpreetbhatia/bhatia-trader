import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Linkedin } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram } from "react-icons/si";
import content from "@/content/site-content.json";

export default function Contact() {
  const c = content.contact;
  const waNumber = c.phone.replace(/\D/g, "");
  return (
    <div className="w-full pt-10 pb-20 bg-muted/30">
      <Helmet>
        <title>Contact Us | Bhatia Traders Narsinghpur</title>
        <meta name="description" content={`Contact Bhatia Traders in Narsinghpur for TVS motorcycles, JK Tyre, and Exide batteries. Call ${c.phone}.`} />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">संपर्क करें</h1>
          <p className="text-muted-foreground uppercase tracking-widest font-semibold">Contact Us</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">फ़ोन / Phone</h3>
              <p className="text-muted-foreground mb-4">{c.phone}</p>
              <a href={`tel:${waNumber}`} className="text-primary font-semibold hover:underline">Call Now</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent-foreground">
                <SiWhatsapp className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">व्हाट्सएप / WhatsApp</h3>
              <p className="text-muted-foreground mb-4">{c.phone}</p>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="text-accent-foreground font-semibold hover:underline">Message Us</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">ईमेल / Email</h3>
              <p className="text-muted-foreground mb-4">{c.email}</p>
              <a href={`mailto:${c.email}`} className="text-primary font-semibold hover:underline">Send Email</a>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0 }} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
              <div className="p-8 border-b border-border">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-1">हमारा पता / Our Address</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{c.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-1">खुलने का समय / Timings</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {c.hoursWeekday}<br />
                      {c.hoursSunday}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-grow bg-muted relative min-h-[300px]">
                <iframe
                  src={c.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bhatia Traders Location"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
              <h3 className="font-bold font-heading text-2xl mb-6">सोशल मीडिया पर हमसे जुड़ें</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="https://www.facebook.com/share/18k9QL7iBX/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 hover:text-accent transition-colors">
                  <div className="bg-white/10 p-4 rounded-full"><SiFacebook size={24} /></div>
                  <span className="text-sm">TVS Facebook</span>
                </a>
                <a href="https://www.facebook.com/share/1BK738cn4C/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 hover:text-accent transition-colors">
                  <div className="bg-white/10 p-4 rounded-full"><SiFacebook size={24} /></div>
                  <span className="text-sm">JK Tyre Facebook</span>
                </a>
                <a href="https://www.instagram.com/bhatiatraders_tvs?igsh=NzJsNHh6cXQ3dzVo" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 hover:text-accent transition-colors">
                  <div className="bg-white/10 p-4 rounded-full"><SiInstagram size={24} /></div>
                  <span className="text-sm">TVS Instagram</span>
                </a>
                <a href="https://www.instagram.com/jktyre_bhatiatrader.s?igsh=MXNtczZyYzF2MHg4Mg==" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 hover:text-accent transition-colors">
                  <div className="bg-white/10 p-4 rounded-full"><SiInstagram size={24} /></div>
                  <span className="text-sm">JK Tyre Instagram</span>
                </a>
                <a href="https://www.linkedin.com/in/bhatia-trader-35795132" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 hover:text-accent transition-colors">
                  <div className="bg-white/10 p-4 rounded-full"><Linkedin size={24} /></div>
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
