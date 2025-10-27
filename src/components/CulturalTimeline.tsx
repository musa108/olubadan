"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const timelineData = [
  {
    year: "1829",
    title: "Founding of Ibadan",
    description:
      "Ibadan was founded as a war camp and soon evolved into a major Yoruba city, symbolizing unity and resilience.",
  },
  {
    year: "1930",
    title: "Recognition of the Olubadan System",
    description:
      "The Olubadan chieftaincy system was formally established, ensuring a clear, peaceful ascension process for future rulers.",
  },
  {
    year: "1955",
    title: "First Modern Palace Constructed",
    description:
      "The first official Olubadan Palace was completed, marking a new era in Ibadan’s royal and cultural identity.",
  },
  {
    year: "2007",
    title: "High Chief Rashidi Ladoja’s Reform Influence",
    description:
      "Ladoja’s tenure as governor left a lasting impact on Ibadan’s governance and royal respect, modernizing traditional institutions.",
  },
  {
    year: "2024",
    title: "A Modern Cultural Revival",
    description:
      "Ibadan continues to embrace its deep traditions while integrating modernity, preserving the throne’s dignity in a changing world.",
  },
];

export default function CulturalTimeline() {
  return (
    <section className="bg-[#faf7f2] py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`${playfair.className} text-3xl md:text-5xl font-bold text-gray-900`}
          >
            Cultural Timeline
          </h2>
          <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
            Explore the milestones that shaped Ibadan’s identity — from its
            founding roots to its thriving royal heritage today.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-4 border-[#d4a373] ml-6 md:ml-16 space-y-16">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="relative pl-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute left-[-11px] top-1 w-6 h-6 bg-[#d4a373] rounded-full border-4 border-white shadow-md"></div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                {item.year} — {item.title}
              </h3>
              <p className="text-gray-700 mt-2 max-w-2xl">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
