"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function page() {
  return (
    <section className="bg-[#f8f5f0] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className={`${playfair.className} text-3xl md:text-5xl font-bold text-gray-900`}
        >
          The Olubadan Palace
        </h2>
        <p
          className={`${poppins.className} text-gray-700 text-lg mt-4 max-w-3xl mx-auto`}
        >
          The Olubadan Palace, known as *Ile Olubadan*, is not just the seat of
          power in Ibadan — it is the living heart of the city’s cultural and
          political identity. A symbol of unity, authority, and history, the
          palace stands as the guardian of Ibadan’s royal legacy.
        </p>
      </div>

      {/* Section 1 - Palace Image */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/olubadan1.jpeg"
              alt="Olubadan Palace"
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
            A Seat of Ancient Wisdom
          </h3>
          <p
            className={`${poppins.className} text-gray-700 text-lg leading-relaxed`}
          >
            The palace is the official residence of the Olubadan of Ibadanland,
            the supreme traditional ruler who embodies centuries of Yoruba
            monarchy. The palace serves as the venue for royal meetings,
            chieftaincy ceremonies, and cultural preservation.
          </p>
        </motion.div>
      </div>

      {/* Section 2 - Cultural Importance */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/olubadan2.jpeg"
              alt="Ibadan Tradition"
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
            The Cultural Epicenter of Ibadan
          </h3>
          <p
            className={`${poppins.className} text-gray-700 text-lg leading-relaxed`}
          >
            From coronations to annual festivals, the palace remains the
            cultural heartbeat of Ibadan. It hosts royal councils, traditional
            court sessions, and ceremonies that showcase the honor, bravery, and
            unity of the Ibadan people.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
