"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const images = [
  "/palace1.jpg",
  "/palace2.jpg",
  "/palace3.jpeg",
  "/olubadan1.jpeg",
  "/royal_palace.jpeg",
  "/palace4.jpg",
];

export default function PalaceGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="bg-[#faf7f2] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className={`${playfair.className} text-3xl md:text-5xl font-bold text-gray-900`}
        >
          The Royal Palace Gallery
        </h2>
        <p className="text-gray-700 text-lg mt-4 max-w-3xl mx-auto">
          A glimpse into the majestic Olubadan Palace — a heritage of wisdom,
          power, and Yoruba pride. Every corner tells a story of tradition and
          leadership.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedImage(src)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src={src}
              alt={`Palace ${index + 1}`}
              width={500}
              height={300}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-[90%] md:w-[70%] h-[70vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={selectedImage}
                alt="Selected Palace"
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
