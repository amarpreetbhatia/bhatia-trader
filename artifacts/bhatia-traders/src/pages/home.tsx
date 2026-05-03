import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Wrench, Battery, Star } from "lucide-react";
import content from "@/content/site-content.json";

const BASE = import.meta.env.BASE_URL;

export default function Home() {
  const h = content.home;
  return (
    <div className="w-full">
      <Helmet>
        <title>Bhatia Traders | TVS Dealer Narsinghpur | JK Tyre & Exide</title>
        <meta name="description" content="Authorized TVS Motorcycle dealer, JK Tyre exclusive dealer, and Exide Battery dealer in Narsinghpur, Madhya Pradesh." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10" />
          <img
            src={`${BASE}images/${h.heroImage}`}
            alt="Bhatia Traders Showroom"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-accent text-accent-foreground font-bold px-4 py-1.5 rounded mb-6 font-heading tracking-wide uppercase shadow-lg">
              {h.heroBadge}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-4 leading-tight">
              <span className="block mb-2">{h.taglineHindi1}</span>
              <span className="block text-accent">{h.taglineHindi2}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-primary-foreground/90">
              {h.taglineEnglish}
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl text-primary-foreground/80 leading-relaxed">
              {h.heroDescHindi}
              <br className="hidden md:block" />
              {h.heroDescEnglish}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-accent text-accent-foreground hover:bg-white hover:text-primary px-8 py-4 rounded font-bold transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl"
              >
                हमारे उत्पाद देखें <span className="text-sm font-normal uppercase tracking-wider ml-2 border-l border-current pl-2">View Products</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white hover:text-primary px-8 py-4 rounded font-bold transition-all flex items-center gap-2"
              >
                संपर्क करें <span className="text-sm font-normal uppercase tracking-wider ml-2 border-l border-current pl-2">Contact Us</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-2">हमारे प्रमुख ब्रांड</h2>
            <p className="text-muted-foreground uppercase tracking-widest font-semibold">Our Top Brands</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h.brands.map((brand, idx) => {
              const styles = [
                { color: "border-blue-700", bg: "bg-blue-50", icon: <ShieldCheck className="w-12 h-12 text-blue-700" /> },
                { color: "border-yellow-400", bg: "bg-yellow-50", icon: <Wrench className="w-12 h-12 text-yellow-600" /> },
                { color: "border-red-600", bg: "bg-red-50", icon: <Battery className="w-12 h-12 text-red-600" /> },
              ][idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className={`bg-white rounded-xl shadow-lg border-t-4 ${styles.color} p-8 hover:shadow-xl transition-shadow flex flex-col items-center text-center`}
                >
                  <div className={`w-24 h-24 rounded-full ${styles.bg} flex items-center justify-center mb-6`}>
                    {styles.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">{brand.title}</h3>
                  <p className="text-foreground font-medium mb-2">{brand.descHindi}</p>
                  <p className="text-muted-foreground text-sm">{brand.descEnglish}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-2">हम पर भरोसा क्यों करें?</h2>
              <p className="text-muted-foreground uppercase tracking-widest font-semibold mb-8">Why Choose Us?</p>

              <div className="space-y-6">
                {h.whyChooseUs.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-accent/20 p-2 rounded-full text-accent-foreground">
                      <Star className="w-5 h-5 fill-accent text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.hindi}</h4>
                      <p className="text-muted-foreground text-sm">{item.english}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-primary/5 flex items-center justify-center relative overflow-hidden border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10" />
                <div className="text-center relative z-10 p-8">
                  <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">{h.yearsExperience} Years</h3>
                  <p className="text-xl font-bold text-foreground">Of Trust & Service</p>
                  <p className="text-muted-foreground mt-2">नरसिंहपुर की शान</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{h.ctaTitleHindi}</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{h.ctaDescEnglish}</p>
          <a
            href={`https://wa.me/${content.contact.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-white hover:text-primary px-8 py-4 rounded font-bold transition-all shadow-lg text-lg"
          >
            व्हाट्सएप पर बात करें <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
