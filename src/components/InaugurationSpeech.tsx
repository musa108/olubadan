"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function InaugurationPage() {
  return (
    <section className="bg-[#f8f5f0] py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${playfair.className} text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8`}
        >
          Kabiesi’s full speech at his installation as the 44th Olubadan of
          Ibadan land
        </motion.h1>

        {/* YouTube Video Embed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/B767xDfGVVU"
              title="Inauguration Speech of the Olubadan of Ibadan"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className={`${poppins.className} text-gray-700 text-lg leading-relaxed`}
        >
          <p className="mb-6">
            The inauguration of His Imperial Majesty as the Olubadan of
            Ibadanland was a historic moment celebrated by citizens and
            dignitaries alike. This speech captures a powerful message of unity,
            tradition, and cultural pride.
          </p>

          <p className="mb-6">
            In his address, the Olubadan emphasized the importance of preserving
            cultural heritage while fostering progress and unity among the
            people of Ibadan and beyond.
          </p>

          <p>
            This video serves as a timeless record of tradition, leadership, and
            royal stewardship — capturing a moment that resonates with all who
            value heritage and service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
