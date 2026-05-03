import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import content from "@/content/site-content.json";

const BASE = import.meta.env.BASE_URL;

export default function Products() {
  const p = content.products;

  const sections = [
    { key: "tvs" as const, color: "blue", reverse: false },
    { key: "jktyre" as const, color: "yellow", reverse: true },
    { key: "exide" as const, color: "red", reverse: false },
  ];

  const colorMap = {
    blue: { title: "text-blue-800", dot: "bg-blue-600" },
    yellow: { title: "text-yellow-600", dot: "bg-yellow-500" },
    red: { title: "text-red-600", dot: "bg-red-600" },
  };

  return (
    <div className="w-full pt-10 pb-20">
      <Helmet>
        <title>Products & Services | TVS, JK Tyre, Exide | Bhatia Traders Narsinghpur</title>
        <meta name="description" content="Explore our range of TVS motorcycles, JK Tyres, and Exide batteries at Bhatia Traders, Narsinghpur MP." />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">हमारे उत्पाद और सेवाएं</h1>
          <p className="text-muted-foreground uppercase tracking-widest font-semibold">Products & Services</p>
        </div>

        <div className="space-y-24">
          {sections.map(({ key, color, reverse }, idx) => {
            const section = p[key];
            const c = colorMap[color as keyof typeof colorMap];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] bg-muted">
                    <img
                      src={`${BASE}images/${section.image}`}
                      alt={section.titleEnglish}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <h2 className={`text-3xl font-bold font-heading mb-2 ${c.title}`}>{section.titleHindi}</h2>
                  <h3 className="text-lg text-muted-foreground mb-8 font-medium">{section.titleEnglish}</h3>

                  <ul className="space-y-4 mb-8">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                        <div>
                          <p className="font-bold text-foreground">{feature.hindi}</p>
                          <p className="text-sm text-muted-foreground">{feature.english}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/${content.contact.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded font-medium transition-colors shadow"
                  >
                    पूछताछ करें (Inquire Now)
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
