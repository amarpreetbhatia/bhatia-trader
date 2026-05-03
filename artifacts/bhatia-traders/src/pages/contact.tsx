import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Linkedin } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram } from "react-icons/si";

export default function Contact() {
  return (
    <div className="w-full pt-10 pb-20 bg-muted/30">
      <Helmet>
        <title>Contact Us | Bhatia Traders Narsinghpur</title>
        <meta name="description" content="Contact Bhatia Traders in Narsinghpur for TVS motorcycles, JK Tyre, and Exide batteries. Call +91 9425168575." />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            संपर्क करें
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest font-semibold">Contact Us</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">फ़ोन / Phone</h3>
              <p className="text-muted-foreground mb-4">+91 9425168575</p>
              <a href="tel:+919425168575" className="text-primary font-semibold hover:underline">Call Now</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent-foreground">
                <SiWhatsapp className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">व्हाट्सएप / WhatsApp</h3>
              <p className="text-muted-foreground mb-4">+91 9425168575</p>
              <a href="https://wa.me/919425168575" target="_blank" rel="noreferrer" className="text-accent-foreground font-semibold hover:underline">Message Us</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">ईमेल / Email</h3>
              <p className="text-muted-foreground mb-4">bhatiatrader@gmail.com</p>
              <a href="mailto:bhatiatrader@gmail.com" className="text-primary font-semibold hover:underline">Send Email</a>
            </motion.div>
          </div>

          {/* Map and Socials */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm h-full flex flex-col"
            >
              <div className="p-8 border-b border-border">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-1">हमारा पता / Our Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Station Road, Narsinghpur<br />
                      Madhya Pradesh 487001<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-1">खुलने का समय / Timings</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      सोमवार से शनिवार (Mon - Sat): 9:00 AM - 7:30 PM<br />
                      रविवार (Sunday): Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow bg-muted relative min-h-[300px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117469.75239121683!2d79.11721526130985!3d22.955513220556272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397f8c0576b5c007%3A0x6b8dd42ec56b7c52!2sNarsinghpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1709669528434!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: "absolute", top: 0, left: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bhatia Traders Location"
                ></iframe>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary text-primary-foreground rounded-xl p-8 text-center"
            >
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
