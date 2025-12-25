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
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className={`${playfair.className} text-3xl md:text-5xl font-bold text-gray-900`}
        >
          The Heritage of Ibadan
        </h2>
        <p
          className={`${poppins.className} text-gray-700 text-lg mt-4 max-w-3xl mx-auto`}
        >
          Ibadan’s greatness lies in its deep cultural roots, royal hierarchy,
          and rich traditions that have preserved its identity for centuries —
          blending the past with the modern spirit of the Yoruba people.
        </p>
      </div>

      {/* Section 1: History */}
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
              src="/ibadan.jpg"
              alt="Ibadan City"
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
            A Brief History of Ibadan
          </h3>
          <p
            className={`${poppins.className} text-gray-700 text-lg leading-relaxed mb-6`}
          >
            Founded in the early 19th century as a war camp, Ibadan grew to
            become one of the most powerful cities in Yorubaland. Known for its
            courage, political influence, and intellect, it became the center of
            trade, education, and governance in the South-West region of
            Nigeria. It is home to Nigeria’s first university — the University
            of Ibadan.
          </p>
        </motion.div>
      </div>

      {/* Section 2: Culture and Leadership */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-20">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <div className="relative rounded-lg overflow-hidden shadow-lg">
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
            Royal Institutions & Leadership
          </h3>
          <p
            className={`${poppins.className} text-gray-700 text-lg leading-relaxed mb-6`}
          >
            The Olubadan serves as the supreme ruler of Ibadan, supported by a
            respected council of chiefs, <strong>Mogajis</strong> (family
            heads), and <strong>Baales</strong> (community leaders). This
            well-structured hierarchy ensures order and preserves Ibadan’s
            age-old customs.
          </p>
        </motion.div>
      </div>

      {/* Section 3: Festivals and Traditions */}
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
            Ibadan celebrates numerous traditional festivals such as the{" "}
            <strong>Oke’badan Festival</strong>,{" "}
            <strong>Egungun Festival</strong>, and <strong>Oro Festival</strong>
            . These events symbolize unity, reverence, and connection with the
            ancestors, showcasing the beauty of Yoruba culture.
          </p>
        </motion.div>
      </div>

      {/* Section 4: Local Government Areas */}
      <div className="max-w-4xl mx-auto text-center mt-20">
        <h3
          className={`${playfair.className} text-2xl md:text-3xl font-semibold mb-6 text-gray-900`}
        >
          Ibadan Metropolitan Local Governments
        </h3>
        <p
          className={`${poppins.className} text-gray-700 text-lg leading-relaxed mb-6`}
        >
          Ibadan Metropolis comprises eleven (11) local government areas that
          make up its administrative and cultural structure:
        </p>
        <ul
          className={`${poppins.className} text-gray-800 text-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3`}
        >
          <li>Ibadan North</li>
          <li>Ibadan North East</li>
          <li>Ibadan North West</li>
          <li>Ibadan South East</li>
          <li>Ibadan South West</li>
          <li>Akinyele</li>
          <li>Egbeda</li>
          <li>Iddo</li>
          <li>Lagelu</li>
          <li>Oluyole</li>
          <li>Ona-Ara</li>
        </ul>
      </div>
    </section>
  );
}
