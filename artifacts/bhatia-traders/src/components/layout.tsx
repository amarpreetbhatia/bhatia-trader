import React from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Menu, X, Mail, Linkedin } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram } from "react-icons/si";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/", labelEn: "Home", labelHi: "होम" },
  { href: "/products", labelEn: "Products & Services", labelHi: "उत्पाद और सेवाएं" },
  { href: "/promotions", labelEn: "Offers", labelHi: "ऑफ़र" },
  { href: "/about", labelEn: "About Us", labelHi: "हमारे बारे में" },
  { href: "/contact", labelEn: "Contact", labelHi: "संपर्क करें" },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground text-xs md:text-sm py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 9425168575</span>
            <span className="flex items-center gap-1 hidden md:flex"><Mail className="w-3 h-3" /> bhatiatrader@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Narsinghpur, MP</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-heading font-bold text-2xl md:text-3xl text-primary leading-none">Bhatia Traders</span>
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">भाटिया ट्रेडर्स</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`group flex flex-col items-center ${location === link.href ? 'text-primary' : 'text-foreground hover:text-primary'} transition-colors`}
              >
                <span className="font-heading font-semibold text-lg">{link.labelHi}</span>
                <span className="text-xs uppercase tracking-wider -mt-1 font-medium">{link.labelEn}</span>
                {location === link.href && (
                  <motion.div layoutId="nav-indicator" className="h-0.5 bg-accent w-full mt-1 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="flex flex-col py-4 px-4 gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex flex-col ${location === link.href ? 'text-primary border-l-4 border-accent pl-3' : 'text-foreground hover:text-primary pl-4'} transition-all`}
                  >
                    <span className="font-heading font-semibold text-lg">{link.labelHi}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{link.labelEn}</span>
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">Bhatia Traders</h3>
              <p className="text-primary-foreground/80 mb-4 font-heading text-lg">भाटिया है तू बेस्टुम बेस्ट है</p>
              <p className="text-sm text-primary-foreground/70 mb-6">
                Authorized dealer for TVS Motorcycles, JK Tyre, and Exide Battery in Narsinghpur, Madhya Pradesh.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/18k9QL7iBX/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-colors">
                  <SiFacebook size={20} />
                </a>
                <a href="https://www.instagram.com/bhatiatraders_tvs?igsh=NzJsNHh6cXQ3dzVo" target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-colors">
                  <SiInstagram size={20} />
                </a>
                <a href="https://www.linkedin.com/in/bhatia-trader-35795132" target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-xl font-semibold mb-4 text-accent">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="hover:text-accent transition-colors flex items-center gap-2"><span>होम</span> <span className="text-xs opacity-70">Home</span></Link></li>
                <li><Link href="/products" className="hover:text-accent transition-colors flex items-center gap-2"><span>उत्पाद</span> <span className="text-xs opacity-70">Products</span></Link></li>
                <li><Link href="/promotions" className="hover:text-accent transition-colors flex items-center gap-2"><span>ऑफ़र</span> <span className="text-xs opacity-70">Offers</span></Link></li>
                <li><Link href="/about" className="hover:text-accent transition-colors flex items-center gap-2"><span>हमारे बारे में</span> <span className="text-xs opacity-70">About</span></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xl font-semibold mb-4 text-accent">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Station Road, Narsinghpur,<br />Madhya Pradesh 487001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm">+91 9425168575</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm">bhatiatrader@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xl font-semibold mb-4 text-accent">Brands</h4>
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded p-3 text-center">
                  <span className="font-bold text-blue-800 text-lg">TVS Motor</span>
                </div>
                <div className="bg-white rounded p-3 text-center border-b-4 border-yellow-400">
                  <span className="font-bold text-red-600 text-lg">JK TYRE</span>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <span className="font-bold text-green-700 text-lg">EXIDE</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} Bhatia Traders. All rights reserved.</p>
            <p>Designed for Narsinghpur with pride.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919425168575"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#1ebd5a] transition-colors"
        whileHover={{ scale: 1.1 }}
        animate={{ 
          boxShadow: ["0px 0px 0px 0px rgba(37, 211, 102, 0.4)", "0px 0px 0px 15px rgba(37, 211, 102, 0)"]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <SiWhatsapp size={28} />
      </motion.a>
    </div>
  );
}
