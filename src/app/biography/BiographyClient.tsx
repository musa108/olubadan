"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Poppins } from "next/font/google";
import {
  Award,
  Compass,
  GraduationCap,
  Building2,
  Calendar,
  Landmark,
  MapPin,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const timelineEvents = [
  {
    year: "1944",
    title: "Birth in Gambari",
    description: "Born on September 25, 1944, in Gambari, Surulere Local Government Area of Oyo State to Alhaji Aruna and Alhaja Haleemat Ladoja.",
    icon: Calendar,
  },
  {
    year: "1966 - 1972",
    title: "Chemical Engineering Studies",
    description: "After attending Ibadan Boys' High School and Olivet Baptist High School, proceeded to the prestigious University of Liège, Belgium to study Chemical Engineering.",
    icon: GraduationCap,
  },
  {
    year: "1972 - 1985",
    title: "Corporate Excellence",
    description: "Employed at Total Nigeria PLC, serving in diverse engineering and management roles for 13 years before launching independent shipping and manufacturing businesses.",
    icon: Building2,
  },
  {
    year: "1992",
    title: "Elected Senator & Mogaji",
    description: "Elected Senator representing Oyo South Senatorial District in the Nigerian Senate. In the same year, became the Magaji of the Arusa Family Compound.",
    icon: Landmark,
  },
  {
    year: "1993",
    title: "Entering the Olubadan Line",
    description: "Formally installed as the Jagun Olubadan, embarking on the historic civil ascension path to the Olubadan stool.",
    icon: Compass,
  },
  {
    year: "2003 - 2007",
    title: "Governor of Oyo State",
    description: "Elected Governor of Oyo State. His tenure is celebrated for landmark education reforms and his historic legal victory in the Supreme Court, which defeated an unconstitutional impeachment plot and set a vital precedent for Nigerian democracy.",
    icon: Award,
  },
  {
    year: "2025",
    title: "Coronation as 44th Olubadan",
    description: "Crowned as the 44th Olubadan of Ibadanland on September 26, 2025, amidst global celebrations, succeeding to the throne of his ancestors.",
    icon: MapPin,
  },
];

const achievements = [
  {
    title: "Constitutional Precedent",
    description: "Stood as a champion of the rule of law by successfully challenging his illegal impeachment in Oyo State all the way to the Supreme Court of Nigeria in 2006, securing a landmark ruling that protected legislative processes and democratic checks-and-balances nationwide.",
  },
  {
    title: "Financial Sector Innovation",
    description: "Co-founded Crystal Bank in the early 1990s, which later evolved into Standard Trust Bank (STB) and ultimately merged with the United Bank for Africa (UBA), contributing directly to the modernization of Nigeria's financial services industry.",
  },
  {
    title: "Chieftaincy Preservation",
    description: "Vigorously defended the ancient, rank-based traditional ascension hierarchy of Ibadanland against political attempts to alter or restructure its sacred rules, keeping the centuries-old coronation pathway intact.",
  },
  {
    title: "Grassroots Empowerment",
    description: "Inaugurated the Ibadan Community Guard for community-based security and launched the agricultural 'Gaari Ibadan' economic program to drive local food production and sustainability.",
  },
];

const galleryImages = [
  {
    src: "/olubadan1.jpeg",
    title: "Royal Coronation",
    description: "His Imperial Majesty Oba Rashidi Adewolu Ladoja during his formal crown installation as the 44th Olubadan.",
  },
  {
    src: "/oluband-with-garri.jpeg",
    title: "Gaari Ibadan Project",
    description: "The Olubadan introducing local food security and agricultural empowerment initiatives for Ibadanland.",
  },
  {
    src: "/akpabio and oba.jpeg",
    title: "Statehood Advocacy",
    description: "Oba Ladoja advocating for traditional institution rights and the creation of Ibadan State with Senate President Godswill Akpabio.",
  },
  {
    src: "/oba-and-fg.jpeg",
    title: "Federal Dialogues",
    description: "His Imperial Majesty hosting Federal Government and security delegations to discuss regional stability and development.",
  },
  {
    src: "/royal_festival.jpeg",
    title: "Cultural Heritage",
    description: "Presiding over one of the major annual cultural processions and traditional heritage festivals in Ibadan.",
  },
];

export default function BiographyClient() {
  return (
    <main className={`${poppins.className} min-h-screen bg-[#fffcf7] text-gray-800 pb-24`}>
      {/* Premium Editorial Hero Section */}
      <section className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden bg-[#0f0d0b]">
        <Image
          src="/ladoja.jpg"
          alt="Oba Rashidi Adewolu Ladoja"
          fill
          priority
          className="object-cover object-top opacity-75 scale-105"
        />
        {/* Layered Overlays for Dramatic Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/45 to-transparent z-1" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0f0d0b]/20 to-[#0f0d0b]/80 z-1" />
        
        <div className="absolute inset-x-0 bottom-0 z-10 max-w-5xl mx-auto px-6 md:px-12 pb-12 sm:pb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d6b15b]/45 bg-[#d6b15b]/15 px-4.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e8c36b] backdrop-blur-md mb-4.5">
              The 44th Olubadan of Ibadanland
            </span>
            <h1
              className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight`}
            >
              Oba Rashidi <br className="hidden md:inline" />
              Adewolu Ladoja
            </h1>
            <p className="text-gray-300 text-sm md:text-lg mt-3.5 max-w-xl font-medium tracking-wide">
              Chemical Engineer, Distinguished Statesman, Former Senator, Oyo State Governor, and Paramount Monarch of Ibadanland.
            </p>
          </div>
          <div className="shrink-0 flex justify-center md:justify-start">
            <div className="border border-[#d6b15b]/30 bg-black/40 backdrop-blur-md rounded-2xl p-5 text-center min-w-[200px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Coronation Date</span>
              <span className="text-xl font-extrabold text-[#d6b15b] block">Sept 26, 2025</span>
              <span className="text-[10px] text-gray-400 block mt-2 border-t border-white/10 pt-2">Succeeding to the Ancient Stool</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Quote Strip */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mt-16">
        <div className="relative rounded-2xl bg-white border border-[#eae6db] p-8 md:p-12 shadow-sm text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-2.5 h-full bg-[#d6b15b]" />
          <p className={`${playfair.className} text-xl md:text-2xl italic leading-relaxed text-gray-800 max-w-3xl mx-auto`}>
            &ldquo;The throne of the Olubadan is not merely a seat of authority, but a sacred covenant of service, representing the unified aspirations, courage, and historic resilience of the Ibadan people.&rdquo;
          </p>
          <div className="mt-5 flex justify-center items-center gap-2">
            <span className="w-8 h-px bg-[#d6b15b]/50" />
            <span className="text-xs font-bold text-[#9b762f] uppercase tracking-widest">Royal Proclamation</span>
            <span className="w-8 h-px bg-[#d6b15b]/50" />
          </div>
        </div>
      </section>

      {/* Main Biography Content Grid */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Columns - Biography Chapters */}
        <div className="lg:col-span-2 space-y-12">
          {/* Chapter 1 */}
          <div className="space-y-4">
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-gray-950 flex items-center gap-3`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fffaf0] border border-[#e8ddc8] text-[#9b762f] text-sm font-bold">I</span>
              Early Life & Intellectual Foundations
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
              Oba Rashidi Adewolu Ladoja was born on the 25th of September, 1944 at Gambari in Surulere Local Government Area of Oyo State. Growing up in the cultural heart of Ibadanland, he began his educational journey at the Progressive Day School, Alaadorin, Ibadan.
            </p>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
              He thereafter proceeded to Ibadan Boys&apos; High School, Oke-Bola, for his secondary education and furthered his studies at Olivet Baptist High School for his Advanced Levels. Demonstrating exceptional aptitude in science and mathematics, Ladoja traveled to Europe, earning a degree in **Chemical Engineering** from the prestigious University of Liège, Belgium.
            </p>
          </div>

          {/* Chapter 2 */}
          <div className="space-y-4">
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-gray-950 flex items-center gap-3`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fffaf0] border border-[#e8ddc8] text-[#9b762f] text-sm font-bold">II</span>
              Corporate Distinction & Enterprise
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
              Returning to Nigeria as a professional engineer, he joined Total Nigeria PLC in 1972. Over the next 13 years, Ladoja distinguished himself in various technical, engineering, and administrative roles, eventually transitioning to build a formidable business empire.
            </p>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
              He went on to establish shipping, manufacturing, and agricultural corporations. A visionary financier, he co-founded Crystal Bank in the early 1990s. The bank eventually grew into Standard Trust Bank (STB) and subsequently merged with the United Bank for Africa (UBA), establishing him as a pioneer in modern Nigerian banking.
            </p>
          </div>

          {/* Chapter 3 */}
          <div className="space-y-4">
            <div className="rounded-xl border border-red-200/50 bg-red-50/20 p-5 mb-5 flex items-start gap-4">
              <ShieldAlert className="h-6 w-6 text-red-700 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-red-950">A Defender of the Rule of Law</h4>
                <p className="text-xs text-red-900 leading-relaxed mt-1 font-medium">
                  His refusal to yield Oyo State treasury resources to illegal godfather structures led to an unconstitutional impeachment plot in 2006. His successful court appeal restored his governorship, solidifying Nigerian judiciary independence.
                </p>
              </div>
            </div>

            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-gray-950 flex items-center gap-3`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fffaf0] border border-[#e8ddc8] text-[#9b762f] text-sm font-bold">III</span>
              Political Career & Statesmanship
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
              Ladoja entered politics in 1992, winning the election to represent Oyo South in the Senate of the Third Republic. He became a prominent pro-democracy voice and was later elected Governor of Oyo State in 2003 under the Peoples Democratic Party (PDP).
            </p>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
              His tenure as Governor was characterized by far-reaching reforms in education, infrastructural expansion, and public sector accountability. When local political godfathers orchestrated an illegal impeachment process against him in January 2006, Ladoja refused to resort to violence. Instead, he initiated a historic legal battle that reached the Supreme Court of Nigeria. In December 2006, the court declared his impeachment null and void, reinstating him and establishing a foundational legal precedent safeguarding the office of the executive governor across the nation.
            </p>
          </div>
        </div>

        {/* Right Column - Side Details Info */}
        <div className="space-y-8">
          {/* Quick Info Card */}
          <div className="rounded-2xl border border-[#eae6db] bg-[#faf8f4] p-6 shadow-xs space-y-4.5">
            <h3 className={`${playfair.className} text-lg font-bold text-gray-950 border-b border-[#eae6db] pb-3`}>
              Royal Profile Summary
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between py-1.5 border-b border-[#eae6db]/60">
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Royal Title</span>
                <span className="text-gray-900 font-bold text-right">Olubadan of Ibadanland</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eae6db]/60">
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Predecessor</span>
                <span className="text-gray-900 font-bold text-right">Oba Owolabi Olakulehin</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eae6db]/60">
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Date of Birth</span>
                <span className="text-gray-900 font-bold text-right">September 25, 1944</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eae6db]/60">
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Education</span>
                <span className="text-gray-900 font-bold text-right">Univ. of Liège (Belgium)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eae6db]/60">
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Profession</span>
                <span className="text-gray-900 font-bold text-right">Chemical Engineer</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Lineage Path</span>
                <span className="text-gray-900 font-bold text-right">Otun Olubadan Line</span>
              </div>
            </div>
          </div>

          {/* Quick Achievements Highlight */}
          <div className="rounded-2xl border border-[#eae6db] bg-white p-6 shadow-xs space-y-4">
            <h3 className={`${playfair.className} text-lg font-bold text-gray-950`}>
              Key Achievements
            </h3>
            <ul className="space-y-3.5">
              {achievements.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <ChevronRight className="h-4.5 w-4.5 text-[#9b762f] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-950 uppercase">{item.title}</h5>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mt-0.5">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Royal Chieftaincy Ascension Section */}
      <section className="bg-[#faf8f4] border-t border-b border-[#eae6db] py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-gray-950`}>
              Ascension to the Royal Throne
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">
              Ibadanland operates a unique, rotation-based chieftaincy ladder where promotions are awarded strictly by rank and consensus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-[#eae6db]">
              <h4 className="text-base font-bold text-gray-950 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d6b15b]" />
                Thirty-Two Years of Devotion
              </h4>
              <p className="text-gray-600 leading-relaxed font-medium">
                Oba Rashidi Ladoja entered the Olubadan traditional hierarchy in 1992, becoming the Magaji of the Arusa Family Compound in Ibadan. A year later in 1993, he was formally installed as the **Jagun Olubadan**, which is the entry-point title for the Otun Olubadan line. Over the next three decades, he ascended through 22 distinct hierarchical titles.
              </p>
            </div>
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-[#eae6db]">
              <h4 className="text-base font-bold text-gray-950 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d6b15b]" />
                Guardianship of Tradition
              </h4>
              <p className="text-gray-600 leading-relaxed font-medium">
                As Otun Olubadan, Ladoja was a vociferous defender of the ancestral structure of Ibadan chieftains. In 2017, when the state government proposed modifications that would grant crown-wearing status to lower chiefs, Ladoja contested the changes, arguing that the ancient, rank-based ascension rules preserved Ibadan&apos;s peace and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Milestones Timeline */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b762f]">Timeline</span>
          <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-gray-950 mt-1`}>
            Milestones of a Royal Journey
          </h2>
        </div>

        <div className="relative border-l border-[#e8ddc8] ml-4 md:ml-32 space-y-12">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Node Point Icon */}
                <div className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-[#d6b15b] shadow-sm text-[#9b762f]">
                  <Icon className="h-4.5 w-4.5" />
                </div>

                {/* Left side year indicator (responsive layout) */}
                <div className="md:absolute md:-left-36 md:top-1.5 md:w-28 md:text-right">
                  <span className="text-base font-extrabold text-[#9b762f] bg-[#fffaf0] px-2.5 py-1 rounded-lg border border-[#e8ddc8] md:border-transparent md:bg-transparent">
                    {event.year}
                  </span>
                </div>

                {/* Content Box */}
                <div className="bg-white border border-[#eae6db] rounded-2xl p-6 shadow-xs mt-3.5 md:mt-0">
                  <h4 className={`${playfair.className} text-lg font-bold text-gray-950`}>
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium mt-2">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Historical Gallery Section */}
      <section className="bg-white border-t border-[#eae6db] py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b762f]">Archives</span>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-gray-950 mt-1`}>
              Photographic History & Achievements
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Digital photographic records documenting His Imperial Majesty&apos;s governance, advocacy, projects, and traditional coronations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-[#fffcf7] border border-[#eae6db] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition"
              >
                <div className="relative h-52 w-full bg-gray-100 overflow-hidden shrink-0">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className={`${playfair.className} text-base font-bold text-gray-950`}>
                      {img.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mt-2">
                      {img.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
