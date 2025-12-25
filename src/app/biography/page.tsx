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

export default function BiographyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/ladoja.jpg"
          alt="Olubadan Ladoja"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1
            className={`${playfair.className} text-4xl md:text-6xl font-bold text-white text-center`}
          >
            Biography of Oba Rashidi Adewolu Ladoja
          </h1>
        </div>
      </section>

      {/* Biography Text */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className={`${poppins.className} text-lg leading-relaxed`}>
            OBA Rashidi Adewolu Ladoja was born on the 25th September, 1944 at
            Gambari in Surulere Local Government Area of Oyo State. He started
            his elementary school at Progressive Day School, Alaadorin, Ibadan,
            Oyo State. After the completion of his elementary school, he
            proceeded to Ibadan Boys’ High School, Oke-Bola. He furthered his
            education by attending Olivet Baptist High School for his A level
            study between 1964 - 1965. He later proceeded to University of
            Liège, Belgium to study Chemical Engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className={`${poppins.className} text-lg leading-relaxed`}>
            After his graduation from the University of Liege, Belgium as a
            Chemical Engineer, he was employed by Total Nigeria Plc (now known
            as TotalEnergies) in the year 1972. He worked in many capacities in
            Total Nigeria Plc and ended his position in 1985. After his position
            from Total Nigeria Plc, he established his own Shipping Company. In
            1922, he contested for Oyo South Senatorial elections and won. He
            became the Senator representing Oyo South Senatorial District in the
            Senate. In order to further in his political pursuit, he contested
            for the Governorship election of Oyo State under the Peoples
            Democratic Party (PDP) and won. With this victory, he became the
            Governor of Oyo State between 2003 - 2007.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className={`${poppins.className} text-lg leading-relaxed`}>
            In 1992, he became the Magaji of Arusa Compund and he joined the
            Olubadan lineage as Jagun Olubadan in 1993. He is now the next in
            line to the throne of Olubadan as the Otun Olubadan. Senator High
            Chief Rashidi Adewolu Ladoja is a fellow of the Nigerian Society of
            Engineers. He is also a member of many socio-political groups in
            Nigeria and also, a recipient of many awards both locally,
            nationally, and international levels. Senator High Chief Rashidi
            Adewolu Ladoja has a lot of investments in Financial, Industrial,
            Transportation, Maritime, and Agricultural sectors. He is one of the
            founders of Crystal Bank which later became Standard Trust that
            merged with UBA. Senator High Chief Rashidi Adewolu Ladoja is
            happily married with children
          </p>
        </motion.div>
      </section>
    </main>
  );
}
