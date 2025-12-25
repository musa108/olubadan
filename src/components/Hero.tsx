"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Poppins } from "next/font/google";
import FadeInSection from "@/components/FadeInSection";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
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
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <FadeInSection>
      <section className="relative h-[90vh] overflow-hidden flex items-center bg-black">
        <div className="absolute inset-0 flex">
          {/* Stack images side by side */}
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x: `-${current * 100}%`, // move container left
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="min-w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text content */}
        <div className="relative z-10 text-left px-8 md:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`${playfair.className} text-white text-4xl md:text-6xl font-bold tracking-wide`}
          >
            Olubadan Kingdom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`${poppins.className} text-white text-lg md:text-xl mt-4 leading-relaxed max-w-[45ch]`}
          >
            The Olubadan Kingdom is a historic and culturally rich monarchy in
            Ibadan, Nigeria. It represents the heritage, traditions, and
            leadership of the Yoruba people.
          </motion.p>
        </div>
      </section>
    </FadeInSection>
  );
}
