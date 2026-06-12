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
    verification: {
      google: "KeIcM4KzduDPCi0sjVxjIHa4n51lIoAnUGBjH_XCtlk",
    },
  };

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GovernmentOrganization",
            "name": "The Royal Cabinet of Ibadanland",
            "alternateName": "Olubadan of Ibadanland Palace",
            "url": "https://www.olubadanofibadan.com",
            "logo": "https://www.olubadanofibadan.com/the%20king.jpeg",
            "description": "The official digital headquarters of the Olubadan of Ibadanland, paramount traditional ruler of Ibadan. Discover history, royal lines, and news.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ibadan",
              "addressRegion": "Oyo State",
              "addressCountry": "NG"
            }
          })
        }}
      />
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
