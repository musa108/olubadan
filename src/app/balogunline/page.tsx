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
  weight: ["400", "500"],
});

export default function BalogunLine() {
  const chiefs = [
    {
      title: "HIS ROYAL MAJESTY",
      name: "OBA TAJUDEEN ABIMBOLA AJIBOLA",
      position: "BALOGUN OF IBADANLAND",
      image: "/balogun1.jpeg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "OBA KOLAWOLE ADEGBOLA",
      position: "OTUN BALOGUN OF IBADANLAND",
      image: "/balogun2.jpg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "OBA JOHN ISIOYE DADA ",
      position: "OSI BALOGUN OF IBADANLAND",
      image: "/balogun3.jpg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "ABIODUN AZEEZ",
      position: "ASHIPA BALOGUN OF IBADANLAND",
      image: "/balogun4.jpg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "AKEEM BOLAJI ADEWOYIN",
      position: "EKERIN BALOGUN OF IBADANLAND",
      image: "/balogun5.jpg",
    },
    {
      title: "HIGH CHIEF",
      name: "SHARAFADEEN ABIODUN",
      position: "EKARUN BALOGUN OF IBADANLAND ",
      image: "/balogun6.jpg",
    },
  ];

  return (
    <section className="bg-[#f8f5f0] py-20 px-6 md:px-16">
      {/* Page Title */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${playfair.className} text-4xl md:text-5xl font-bold text-gray-900`}
        >
          Balogun Line of Ibadanland
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className={`${poppins.className} text-gray-700 text-lg mt-4 max-w-3xl mx-auto`}
        >
          The Balogun Line represents the warrior class of Ibadan—renowned for
          bravery, discipline, and leadership. These chiefs uphold a proud
          tradition of protecting Ibadanland and serving its people with honor.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {chiefs.map((chief, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
          >
            <div className="relative w-full h-64">
              <Image
                src={chief.image}
                alt={chief.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 text-center">
              <h3
                className={`${playfair.className} text-xl font-bold text-gray-900`}
              >
                {chief.title}
              </h3>

              <p
                className={`${poppins.className} text-gray-700 mt-1 uppercase`}
              >
                {chief.name}
              </p>

              <p
                className={`${poppins.className} text-[#b68d40] font-semibold mt-2`}
              >
                {chief.position}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
