import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import motorcycleImg from "@/assets/motorcycle.jpg";
import tyreImg from "@/assets/tyre.jpg";
import batteryImg from "@/assets/battery.jpg";

export default function Products() {
  const sections = [
    {
      id: "tvs",
      titleHi: "TVS मोटरसाइकिल और स्कूटर",
      titleEn: "TVS Motorcycles & Scooters",
      color: "blue",
      img: motorcycleImg,
      features: [
        "Apache Series - For the racing enthusiast",
        "Jupiter & iQube - Smart everyday commute",
        "Radeon & NTORQ - Performance and style",
        "XL100 - Heavy duty work partner"
      ],
      featuresHi: [
        "अपाचे सीरीज - रेसिंग के दीवानों के लिए",
        "जुपिटर और आईक्यूब - स्मार्ट रोज़मर्रा की सवारी",
        "रेडियॉन और एनटॉर्क - बेहतरीन माइलेज",
        "XL100 - भारी काम का साथी"
      ]
    },
    {
      id: "jktyre",
      titleHi: "JK Tyre (जेके टायर)",
      titleEn: "JK Tyre Exclusive Dealership",
      color: "yellow",
      img: tyreImg,
      features: [
        "Car & SUV radial tyres",
        "Commercial vehicle tyres",
        "Tractor & farm equipment tyres",
        "Wheel alignment & balancing services"
      ],
      featuresHi: [
        "कार और एसयूवी के रेडियल टायर",
        "कमर्शियल वाहनों के टायर",
        "ट्रैक्टर और कृषि उपकरणों के टायर",
        "व्हील अलाइनमेंट और बैलेंसिंग"
      ],
      reverse: true
    },
    {
      id: "exide",
      titleHi: "Exide बैटरी",
      titleEn: "Exide Battery Solutions",
      color: "red",
      img: batteryImg,
      features: [
        "Two-wheeler & Four-wheeler batteries",
        "Tractor & heavy vehicle batteries",
        "Inverter batteries for home & shop",
        "Free battery checkup & exchange offers"
      ],
      featuresHi: [
        "टू-व्हीलर और फोर-व्हीलर की बैटरी",
        "ट्रैक्टर और भारी वाहनों की बैटरी",
        "घर और दुकान के लिए इन्वर्टर बैटरी",
        "फ्री बैटरी चेकअप और एक्सचेंज ऑफर"
      ]
    }
  ];

  return (
    <div className="w-full pt-10 pb-20">
      <Helmet>
        <title>Products & Services | TVS, JK Tyre, Exide | Bhatia Traders Narsinghpur</title>
        <meta name="description" content="Explore our range of TVS motorcycles, JK Tyres, and Exide batteries at Bhatia Traders, Narsinghpur MP." />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            हमारे उत्पाद और सेवाएं
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest font-semibold">Products & Services</p>
        </div>

        <div className="space-y-24">
          {sections.map((section, idx) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className={`rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] bg-muted`}>
                  <img 
                    src={section.img} 
                    alt={section.titleEn}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h2 className={`text-3xl font-bold font-heading mb-2 ${
                  section.color === 'blue' ? 'text-blue-800' : 
                  section.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {section.titleHi}
                </h2>
                <h3 className="text-lg text-muted-foreground mb-8 font-medium">{section.titleEn}</h3>
                
                <ul className="space-y-4 mb-8">
                  {section.featuresHi.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                        section.color === 'blue' ? 'bg-blue-600' : 
                        section.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-600'
                      }`} />
                      <div>
                        <p className="font-bold text-foreground">{feature}</p>
                        <p className="text-sm text-muted-foreground">{section.features[i]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://wa.me/919425168575" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded font-medium transition-colors shadow"
                >
                  पूछताछ करें (Inquire Now)
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
