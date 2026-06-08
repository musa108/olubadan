"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Crown } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import FadeInSection from "@/components/FadeInSection";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const heroImages = [
  "/olubadan1.jpeg",
  "/olubadan2.jpeg",
  "/olubadan3.jpeg",
  "/olubadan4.jpeg",
  "/olubadan5.jpeg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds for continuous elegant pacing
    return () => clearInterval(interval);
  }, []);

  return (
    <FadeInSection>
      <section className="relative min-h-[90vh] overflow-hidden bg-[#0c0a09] flex items-center">
        {/* Cinematic Fading & Ken Burns Zoom Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1.15, filter: "blur(0px)" }}
              exit={{ opacity: 0, transition: { duration: 1.5 } }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[current]})` }}
            />
          </AnimatePresence>
        </div>

        {/* Premium Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-transparent z-1"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/90 z-1"></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#191714] via-transparent to-transparent h-48 bottom-0 z-2"></div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:py-24 md:px-12 flex flex-col justify-center min-h-[90vh]">
          <div className="max-w-3xl">
            {/* Crown sub-badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6b15b]/30 bg-[#d6b15b]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d6b15b] backdrop-blur-md"
            >
              <Crown className="h-4 w-4 text-[#d6b15b]" />
              The Royal Cabinet of Ibadanland
            </motion.div>

            {/* Premium Typography & Titles */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`${playfair.className} text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl`}
            >
              Preserving Ibadanland&apos;s <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e1bd62] via-[#f7dfa3] to-[#d6b15b]">Royal Heritage</span> and Public Record
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className={`${poppins.className} mt-5 max-w-xl text-base leading-relaxed text-white/80 font-normal md:text-lg lg:text-xl`}
            >
              Access verified news bulletins, traditional council decrees, historical biographies, and ancestral line compound profiles directly from the Royal Cabinet.
            </motion.p>

            {/* Premium Interactive Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4.5"
            >
              <Link
                href="/news"
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-linear-to-r from-[#d1a84d] to-[#e1bd62] px-7 py-4 text-sm font-bold text-gray-950 shadow-lg shadow-[#d6b15b]/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#d6b15b]/30"
              >
                Read latest news
                <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform duration-250" />
              </Link>
              <Link
                href="/otun-line"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-md px-7 py-4 text-sm font-bold text-white hover:bg-white/10 hover:border-white/40 transition-all duration-250"
              >
                Explore Traditional Lines
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
