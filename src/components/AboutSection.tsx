"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Poppins } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AboutSection() {
  return (
    <section className="py-20 bg-white flex flex-col md:flex-row items-center justify-between px-8 md:px-16 gap-10">
      {/* Image Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="relative w-full md:w-[400px] h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/HisMajesty.jpeg"
            alt="Olubadan Ladoja"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 text-left"
      >
        <h2
          className={`${playfair.className} text-3xl md:text-5xl font-bold text-gray-900 mb-4`}
        >
          His Imperial Majesty, Oba Rashidi Adewolu Ladoja
        </h2>
        <p
          className={`${poppins.className} text-gray-700 text-lg leading-relaxed mb-6`}
        >
          The 44th Olubadan of Ibadanland, Oba Ladoja’s story is one of
          perseverance, wisdom, and service. A former governor and an engineer
          by training, his reign bridges tradition and modern leadership.
        </p>

        <Link href="/biography">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#b68d40] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-[#a67a2e] transition"
          >
            Read More
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
