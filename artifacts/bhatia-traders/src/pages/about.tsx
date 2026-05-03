import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2, Users, MapPin, Award } from "lucide-react";
import content from "@/content/site-content.json";

const BASE = import.meta.env.BASE_URL;

export default function About() {
  const a = content.about;
  return (
    <div className="w-full">
      <Helmet>
        <title>About Us | Bhatia Traders Narsinghpur</title>
        <meta name="description" content="Learn about Bhatia Traders, the trusted TVS, JK Tyre, and Exide dealer in Narsinghpur MP since years." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">हमारे बारे में</h1>
            <p className="text-xl text-primary-foreground/80 uppercase tracking-widest font-semibold">About Bhatia Traders</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-6">
                नरसिंहपुर का भरोसा<br />
                <span className="text-primary text-2xl md:text-3xl">Narsinghpur's Trust</span>
              </h2>

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <strong className="text-foreground">भाटिया ट्रेडर्स (Bhatia Traders)</strong> {a.para1Hindi}
                </p>
                <p>{a.para1English}</p>
                <p>{a.para2Hindi}</p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-muted p-4 rounded-lg border border-border">
                  <h4 className="font-bold text-2xl text-primary mb-1">{a.stat1Value}</h4>
                  <p className="text-sm font-medium">
                    {a.stat1LabelEnglish}<br />
                    <span className="text-muted-foreground text-xs">{a.stat1LabelHindi}</span>
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg border border-border">
                  <h4 className="font-bold text-2xl text-primary mb-1">{a.stat2Value}</h4>
                  <p className="text-sm font-medium">
                    {a.stat2LabelEnglish}<br />
                    <span className="text-muted-foreground text-xs">{a.stat2LabelHindi}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/5] bg-muted border-8 border-white">
                <img
                  src={`${BASE}images/${a.mainImage}`}
                  alt="Bhatia Traders Dealership"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-accent text-accent-foreground p-8 rounded-xl shadow-xl max-w-xs hidden md:block">
                <Award className="w-10 h-10 mb-4" />
                <h3 className="font-bold font-heading text-xl mb-2">Authorized Dealership</h3>
                <p className="text-sm font-medium">Proudly representing India's top automotive brands in Narsinghpur MP.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Users className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="text-2xl font-bold font-heading mb-4">Customer First</h3>
              <p className="text-primary-foreground/80">ग्राहक सर्वोपरि। हर ग्राहक का व्यक्तिगत रूप से स्वागत और सम्मान।</p>
            </div>
            <div className="p-6">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="text-2xl font-bold font-heading mb-4">Quality Service</h3>
              <p className="text-primary-foreground/80">बेहतरीन आफ्टर-सेल्स सर्विस और प्रशिक्षित मैकेनिक।</p>
            </div>
            <div className="p-6">
              <MapPin className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="text-2xl font-bold font-heading mb-4">Local Trust</h3>
              <p className="text-primary-foreground/80">नरसिंहपुर की माटी से जुड़ा, किसानों और कर्मचारियों का भरोसेमंद साथी।</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
