"use client";

import Image from "next/image";
import { Playfair_Display, Poppins } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO SECTION */}
      <div className="w-full bg-white shadow-sm py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center px-6"
        >
          <h1
            className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#b68d40]`}
          >
            Latest Palace News
          </h1>
          <p
            className={`${poppins.className} mt-4 text-gray-600 text-lg md:text-xl`}
          >
            Stay informed with official updates directly from the Olubadan
            Palace.
          </p>
        </motion.div>
      </div>

      {/* NEWS ARTICLE 1 */}
      <div className="max-w-4xl mx-auto px-6 mt-16">
        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/akpabio and oba.jpeg"
            alt="Ibadan State Creation"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10"
        >
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#b68d40] font-bold`}
          >
            AKPABIO RAISES HOPE ON THE CREATION OF IBADAN STATE
          </h2>

          <p
            className={`${poppins.className} text-gray-700 mt-6 leading-relaxed text-[17px]`}
          >
            Ladoja meets Senate President, restates call for creation of Ibadan
            State. The Olubadan of Ibadanland, His Imperial Majesty, Oba Rashidi
            Adewolu Ladoja, has enlisted the support of the National Assembly
            for the creation of Ibadan State.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            The Olubadan restated the call at his Bodija, Ibadan residence over
            the weekend when the Senate President, Senator Godswill Akpabio and
            some principal officers paid him homage.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            The first class monarch stated that Ibadan consists of 3080 square
            kilometres, with a population of about 4 million people and 11 local
            government councils. He said that it had been a state capital along
            with Kaduna and Enugu from the time of regional Government in the
            50s through 60s, and is economically viable.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            Oba Ladoja also urged the National Assembly to make laws that would
            ensure respect for the dignity of the traditional institution in
            Nigeria.
          </p>

          <p
            className={`${poppins.className} italic text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            “As you are well aware, I am no more a politician. But when I knock
            on your door, please treat me as one of you.”
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            Senator Adamu Aliero congratulated Oba Ladoja on his ascension to
            the throne, describing him as diligent and thorough.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            Senate President Akpabio expressed optimism about the creation of
            Ibadan State, adding that Oba Ladoja represents a great asset to
            Ibadan and the South-West.
          </p>

          <p className={`${poppins.className} font-medium text-gray-800 mt-8`}>
            <strong>Signed:</strong> <br />
            Adeola Oloko <br />
            Media Aide, Olubadan of Ibadanland.
          </p>
        </motion.div>
      </div>

      {/* NEWS ARTICLE 2 — NEWLY ADDED */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        {/* Cover Image (Add your image name here) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/news2.jpeg" // 🔥 Replace with actual image file
            alt="Olubadan Appointed New Chairman"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10"
        >
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#b68d40] font-bold`}
          >
            OLUBADAN IS NEW CHAIRMAN, OYO STATE TRADITIONAL COUNCIL
          </h2>

          <p
            className={`${poppins.className} text-gray-700 mt-6 leading-relaxed text-[17px]`}
          >
            The dust over the rotational chairmanship of Oyo State Council of
            Obas and Chiefs has been settled by the Oyo State Government. The
            State Governor, Engr. Seyi Makinde, disclosed on Thursday that the
            rotational chairmanship—which rotates between Olubadan, Soun of
            Ogbomoso and Alaafin of Oyo—will begin with Oba Rashidi Adewolu
            Ladoja.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            At a well-attended inauguration of the State Council of Obas and
            Chiefs at the Western House of Chiefs, Governor Makinde announced:
            “After consultation with Their Imperial Majesties, it was decided
            that the rotational system with Olubadan as the chair should begin.”
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            Oba Ladoja, surrounded by top monarchs including Soun of Ogbomoso,
            Eleruwa of Eruwa, Aseyin of Iseyin, Okere of Saki and others,
            expressed gratitude to the Governor for reconstituting the Council
            and thanked fellow monarchs for their unity and solidarity.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            Speaking with reporters after the meeting, the Olubadan stated that
            the focus of the Council would be ensuring peace, security, safety,
            and progress across all domains in Oyo State.
          </p>

          <p className={`${poppins.className} font-medium text-gray-800 mt-8`}>
            <strong>Signed:</strong> <br />
            Adeola Oloko <br />
            Media Aide, Olubadan of Ibadanland.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
