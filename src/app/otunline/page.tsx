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

export default function OtunLine() {
  const chiefs = [
    {
      title: "HIS ROYAL MAJESTY",
      name: "OBA (SIR) EDDY OYEWOLE",
      position: "OTUN OLUBADAN OF IBADANLAND",
      image: "/oba/otun1.jpg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "OBA ABIODUN KOLA-DAISI",
      position: "OSI OLUBADAN OF IBADANLAND",
      image: "/oba/otun2.jpeg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "OBA HAMIDU AJIBADE",
      position: "ASHIPA OLUBADAN OF IBADANLAND",
      image: "/oba/otun3.jpeg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "OBA ADEBAYO AKANDE",
      position: "EKERIN OLUBADAN OF IBADANLAND",
      image: "/oba/otun4.jpg",
    },
    {
      title: "HIS ROYAL MAJESTY",
      name: "KOLA BABALOLA, SAN",
      position: "EKARUN OLUBADAN OF IBADANLAND",
      image: "/oba/otun5.jpg",
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
          Otun Line of Ibadanland
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className={`${poppins.className} text-gray-700 text-lg mt-4 max-w-3xl mx-auto`}
        >
          The Otun Line represents one of the most respected chieftaincy
          structures in Ibadan, made up of distinguished leaders whose titles
          reflect honor, service, leadership, and deep cultural heritage.
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
            <div className="relative w-full h-72 md:h-80">
              <Image
                src={chief.image}
                alt={chief.title}
                fill
                className="object-cover object-top"
                sizes="(max-width:768px) 100vw,
                       (max-width:1200px) 50vw,
                       33vw"
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
