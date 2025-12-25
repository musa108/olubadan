"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function CulturalHeritage() {
  return (
    <section className="bg-[#f8f5f0] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className={`${playfair.className} text-3xl md:text-5xl font-bold text-gray-900`}
        >
          The Cultural Heritage of Ibadan
        </h2>
        <p
          className={`${poppins.className} text-gray-700 text-lg mt-4 max-w-3xl mx-auto`}
        >
          A city of warriors, scholars, and kings — Ibadan’s legacy continues to
          shine through its deep-rooted customs, royal institutions, and vibrant
          festivals that honor the spirit of the Yoruba people.
        </p>
      </div>

      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <div className="relative max-md:w-full  max-md:h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/royal_festival.jpeg"
              alt="Ibadan Festival"
              height={400}
              width={600}
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-left"
        >
          <h3
            className={`${playfair.className} text-2xl md:text-3xl font-semibold mb-4 text-gray-900`}
          >
            Royal Festivals & Traditions
          </h3>
          <p
            className={`${poppins.className} text-gray-700 text-lg leading-relaxed mb-6`}
          >
            Ibadan is known for its colorful festivals that celebrate culture,
            unity, and the Yoruba spirit. Each festival reinforces the bond
            between the palace and the people, keeping ancient customs alive for
            future generations.
          </p>
          <Link href="/ibadanHeritage">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#b68d40] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-[#a67a2e] transition"
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <div className="relative max-md:w-full  max-md:h-fullrounded-lg overflow-hidden shadow-lg">
            <Image
              src="/royal_palace.jpeg"
              alt="Olubadan Palace"
              height={400}
              width={600}
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-left"
        >
          <h3
            className={`${playfair.className} text-2xl md:text-3xl font-semibold mb-4 text-gray-900`}
          >
            The Palace: Symbol of Strength & Unity
          </h3>
          <p
            className={`${poppins.className} text-gray-700 text-lg leading-relaxed mb-6`}
          >
            The Olubadan Palace stands as a symbol of wisdom, leadership, and
            continuity. It is where history meets modern governance — a place
            where tradition guides the present and inspires the future.
          </p>
          <Link href="/palace">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#b68d40] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-[#a67a2e] transition"
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
