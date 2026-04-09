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
      {/* NEWS ARTICLE 1 — NEWLY ADDED */}
      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
      <div className="w-full flex flex-col h-full">
        {/* Cover Image (Add your image name here) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/news4.jpeg"
            alt="Olubadan shines at THE SUN`s Award night"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10 flex-1"
        >
          <h2
            className={`${playfair.className} text-3xl uppercase md:text-4xl text-[#b68d40] font-bold`}
          >
            Olubadan shines at THE SUN`s Award night
          </h2>

          <p
            className={`${poppins.className} text-gray-700 mt-6 leading-relaxed text-[17px]`}
          >
            His Imperial Majesty, Oba Rashidi Adewolu Ladoja, the 44th Olubadan of Ibadanland
            and former governor of Oyo State, has been named as one of the winners of The Sun
            Lifetime Achievement Award for 2025.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >

            Saturday,January 31 was a glorious day for Olubadan of Ibadanland,
            His Imperial Majesty,Oba Rashidi Adewolu Ladoja,Arusa 1 as he received
            the Lifetime Service Award from one of Nigeria`s leading newsapers,
            The Sun at Eko Hotel,Lagos.
            Dignitaries from different walks of life-home and abroad- honoured the
            Chairman,Oyo State Council of Obas and Chiefs at the occasion.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            It was indeed a night to remember as the event, chaired by Air Peace boss,Chief Onyema,
            paraded serving Governors,distinguished Senators,Honourable members,
            Federal House of Representatives,royal fathers,
            industry captains and fathers of faith.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            It was indeed a night to remember as the event, chaired by Air Peace boss,
            Chief Onyema, paraded serving Governors,distinguished Senators,
            Honourable members,Federal House of Representatives,
            royal fathers,industry captains and fathers of faith.
          </p>

          <p className={`${poppins.className} font-medium text-gray-800 mt-8`}>
            <strong>Signed:</strong> <br />
            Adeola Oloko <br />
            Media Aide, Olubadan of Ibadanland.
          </p>
        </motion.div>
      </div>
      {/* NEWS ARTICLE 2*/}
      <div className="w-full flex flex-col h-full">
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
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10 flex-1"
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

      {/* NEWS ARTICLE 3— NEWLY ADDED */}
      <div className="w-full flex flex-col h-full">
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
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10 flex-1"
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

      {/* NEWS ARTICLE 4 — NEWLY ADDED */}
      <div className="w-full flex flex-col h-full">
        {/* Cover Image (Add your image name here) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/oba-and-fg.jpeg"
            alt="Ladoja visits SGF, seeks FG's assistance over ecological problems"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10 flex-1"
        >
          <h2
            className={`${playfair.className} text-3xl uppercase md:text-4xl text-[#b68d40] font-bold`}
          >
            Ladoja visits SGF, seeks FGs assistance over ecological problems
          </h2>

          <p
            className={`${poppins.className} text-gray-700 mt-6 leading-relaxed text-[17px]`}
          >
            The Olubadan of Ibadanland, Oba Rashidi Adewolu Ladoja has implored the
            Federal Government to help solve the ecological problems in Ibadan.
            The first class monarch made this plea today in Abuja when he visited
            the Secretary to the Government of the Federation, Dr George Akume.
            In a release signed by his Media Aide, Adeola Oloko, the Olubadan
            acknowledged the previous interventions of the Federal Government and
            World Bank on Ogunpa channelisation programme.
            The royal father, however, added that Ogunpa ecological problem
            gained more prominence because the areas affected are elitist areas
            stretching from Mokola, Ekotedo, Ogunpa, Oke Ado to Molete.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            He therefore requested the assistance of the Federal Government to help solve the
            ecological problems threatening the down-troddenpeople
            living around Oranyan, Kudeti Agbongbon Area and some other parts of city
            that have not been in the spotlight due to no fault on some other parts of city
            that have not been in the spotlight due to no fault of theirs.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            the Federal Government scribe, Dr George Akume ssid he was not surprised that Kabiyesi
            Olubadan could come all the way from Ibadan to Abuja to bring the attention of the
            Federal Government to the plight of his people, adding that this is why Olubadan
            has won a wide perspective of affection.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            He promised that everything would be done by the Federal Government to assist.
            Oba Ladoja was accompanied by Senator Fatai Buhari (Oyo North) and
            Senator Sharafadeen Alli (Oyo South) amongst others.
          </p>

          <p className={`${poppins.className} font-medium text-gray-800 mt-8`}>
            <strong>Signed:</strong> <br />
            Adeola Oloko <br />
            Media Aide, Olubadan of Ibadanland.
          </p>
        </motion.div>
      </div>

      {/* NEWS ARTICLE 5— NEWLY ADDED */}
      <div className="w-full flex flex-col h-full">
        {/* Cover Image (Add your image name here) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/the king.jpeg"
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
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10 flex-1"
        >
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#b68d40] font-bold uppercase`}
          >
            We need legal backing to overcome landgrabbers
            -Olubadan
          </h2>

          <p
            className={`${poppins.className} text-gray-700 mt-6 leading-relaxed text-[17px]`}
          >
            To overcome landgrabbers, we need legal backing.
            The Olubadan of Ibadanland, Oba Rashidi Adewolu
            Ladoja has said.The royal father who made this call in Ibadan on Wednesday
            while receiving the report of Niyi Akintola anti-landgrabbing committee at
            the Olubadan Palace,Oke- Aremo,Ibadan,contended that it is do-able.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            According to the first class monarch,the proposed legal framework
            would entail passing of bye-laws by our local government councillors,
            in accordance with the Land use act to spell out the creation of special
            tribunals that would give accelerated hearing to cases of landgrabbing in
            Ibadan, and specify sanctions. Said Oba Ladoja: &quot; We have come to a situation
            where suspected landgrabbers should know that enough is enough.
            We were investigating a land matter in this palace last week.
            Somebody brought what he called a 1912 Supreme Court judgement
            to say that the land at Alapa to Maamu, Oluyole Local Govt belonged
            to his family.And we told him that the Northern and Southern Nigeria
            were amalgamated in 1914.Your court judgement predates Nigeria.
            Therefore,it is fake.1912 to 2025 is over 100 years.A lawyer
            amongst us was asking him if he didnt know that it is wrong
            to seek to implement court judgement after 10 years it was delivered.
            Same thing with fake survey plans and funny,funny petitions.
            How can somebody living in Ibadan,sell off some peoples land in
            Ibadan and use an address in Osogbo to petition the Police Inspector
            General in Abuja to allege threat to life,gun running, terrorism.
            I think there should be a punishment against fake petitioners.&quot;
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            According to Olubadan,the tremendous amount of public interest generated by the
            committee made the composition of the proposed tribunals with men and women of
            proven integrity imperative. Oba Ladoja said it is difficult to estimate the
            amount of damage done to Ibadan investment climate as a result of perrenial
            cases of landgrabbing.
            At the report presentation witnessed by Oba Tajudeen Ajibola, Balogun of Ibadanland;
            Oba Kola Adegbola, Otun Balogun; Oba Abiodun Kola-Daisi,Osi Olubadan and
            Oba Abiodun Azeez Agagagugu, Asipa Balogun,the Olubadan also promised to
            take drastic action against Mogajis,Baales and other chiefs implicated
            in land grabbing cases.Oba Ladoja commended the Committee members for
            their competence and integrity, &quot;saying Ibadan is collectively
            proud of you and grateful.&quot; Apart from the chairman, other committee
            members who received royal commendation include Barr Yinka Okunade,Barr Akeem Aponmode,
            Barr. Tunji Thomas and Barr.Abiodun AbdulRaheem.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            Earlier,the chairman, Chief Akintola SAN said the Committee received 179 memoranda,
            with 25 or 26 others with the Palace Secretary.He described landgrabbers as cabals
            with extensive network of connection with vital organs of Government and
            extra-ministerial Departments.
            &quot; This was why we engaged the State Government, Local Government Chairmen, Police,lawyers,
            judges,town planners, surveyors, Ministry of Lands, estate developers, Baales,Mogajis etc.
            Your Imperial Majesty,we don&apos;t want to pronounce judgement but the system stinks &quot;
            Barr Akintola said memoranda from outside Ibadan have, however, been returned to
            the sender because Ibadan is our coverage area.
          </p>

          <p className={`${poppins.className} font-medium text-gray-800 mt-8`}>
            <strong>Signed:</strong> <br />
            Adeola Oloko <br />
            Media Aide, Olubadan of Ibadanland.
          </p>
        </motion.div>
      </div>
      <div className="w-full flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/oluband-with-garri.jpeg"
            alt="Olubadan inaugurates Ibadan Community Guard"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-2xl p-8 md:p-12 mt-10 flex-1"
        >
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#b68d40] font-bold uppercase`}
          >
            Olubadan Inaugurates Ibadan Community Guard, Unveils Gaari Ibadan Initiative
          </h2>

          <p
            className={`${poppins.className} text-gray-700 mt-6 leading-relaxed text-[17px]`}
          >
            Oba Rashidi Adewolu Ladoja on Tuesday formally inaugurated the Ibadan
            Community Guard, a strategic grassroots security initiative designed
            to collaborate with relevant security agencies in strengthening
            surveillance and ensuring effective policing across the eleven Local
            Government Areas of Ibadanland.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            The historic event, held at the Palace of the Olubadan, Oke Aremo in
            Ibadan, marked a significant step toward enhancing community-based
            security architecture in response to prevailing challenges in parts
            of the ancient city.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            Speaking at the ceremony, the revered monarch emphasized the
            importance of collective responsibility in safeguarding lives and
            property, noting that the Community Guard will be strategically
            deployed across all eleven Local Government Areas to complement the
            efforts of conventional security agencies.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            In a related development, the event also featured the official
            unveiling of Gaari Ibadan, an economic and food security initiative
            driven by the Ibadan Economic Investment and Business Development
            Desk in collaboration with the Ibadan Food Security Initiative. The
            programme is aimed at promoting local production, boosting economic
            growth, and ensuring food sustainability within the metropolis.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            The ceremony attracted notable dignitaries including members of the
            Olubadan-in-Council, former Minister of Industry and Iyalaje Iyalode
            of Ibadanland, Onikepo Akande, Senator Sharafadeen Alli, CP. Fatai
            Owoseni, prominent entrepreneur Jubril Dotun Sanusi, and the
            President-General of the Central Council of Ibadanland, Ajeniyi
            Ajewole, among other distinguished guests.
          </p>

          <p
            className={`${poppins.className} text-gray-700 mt-4 leading-relaxed text-[17px]`}
          >
            The inauguration underscores the commitment of the Olubadan to
            peace, security, and sustainable development across Ibadanland.
          </p>

          <p className={`${poppins.className} font-medium text-gray-800 mt-8`}>
            <strong>Signed:</strong> <br />
            Palace of the Olubadan of Ibadanland.
          </p>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
