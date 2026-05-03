import React from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Tag, BellRing } from "lucide-react";

// Import raw markdown content
import promotionsMd from "@/content/promotions.md?raw";
import newsMd from "@/content/news.md?raw";

export default function Promotions() {
  return (
    <div className="w-full pt-10 pb-20 bg-muted/30 min-h-screen">
      <Helmet>
        <title>Offers & News | Bhatia Traders Narsinghpur</title>
        <meta name="description" content="Latest promotions, EMI offers, and news from Bhatia Traders - TVS, JK Tyre, and Exide dealer in Narsinghpur." />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            ऑफ़र और ताज़ा खबर
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest font-semibold">Promotions & News</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Promotions Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
              <div className="bg-accent text-accent-foreground p-3 rounded-lg shadow-sm">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading">Current Offers</h2>
                <p className="text-sm text-muted-foreground">वर्तमान ऑफर</p>
              </div>
            </div>

            <div className="prose prose-blue max-w-none prose-headings:font-heading prose-h2:text-primary prose-h2:border-b-0 prose-h2:pb-0 prose-h2:mt-8 prose-h2:mb-4 prose-p:my-2 prose-hr:my-8 bg-card p-6 md:p-8 rounded-xl shadow-md border border-border">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {promotionsMd}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* News Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-sm">
                <BellRing className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading">Latest News</h2>
                <p className="text-sm text-muted-foreground">ताज़ा खबर</p>
              </div>
            </div>

            <div className="prose prose-blue max-w-none prose-headings:font-heading prose-h2:text-primary prose-h2:border-b-0 prose-h2:pb-0 prose-h2:mt-8 prose-h2:mb-4 prose-p:my-2 prose-hr:my-8 bg-card p-6 md:p-8 rounded-xl shadow-md border border-border">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {newsMd}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
