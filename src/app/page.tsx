import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import CulturalHeritage from "@/components/CulturalHeritage";
import CulturalTimeline from "@/components/CulturalTimeline";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PalaceGallery from "@/components/PalaceGallery";
import LatestNewsSection from "@/components/LatestNewsSection";

export const metadata: Metadata = {
  title: "Olubadan of Ibadanland | Official Royal Palace Website",
  description:
    "The official website of the Olubadan of Ibadanland — the paramount ruler of Ibadan. Discover the history, chieftaincy lines, royal heritage, and cultural traditions of Ibadan.",
  keywords: [
    "Olubadan",
    "Ibadan",
    "Yoruba royalty",
    "traditional ruler",
    "Ibadanland",
    "chieftaincy",
    "Nigerian culture",
    "palace",
  ],
  openGraph: {
    title: "Olubadan of Ibadanland | Official Royal Palace Website",
    description:
      "Discover the history, chieftaincy lines, royal heritage, and cultural traditions of Ibadanland.",
    type: "website",
    locale: "en_NG",
  },
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <AboutSection />
      <CulturalHeritage />
      <PalaceGallery />
       <CulturalTimeline />
      <LatestNewsSection />
      <Footer />
    </div>
  );
}
