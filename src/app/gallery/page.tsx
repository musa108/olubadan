import type { Metadata } from "next";
import PalaceGallery from "@/components/PalaceGallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Royal Gallery | Olubadan Palace",
  description:
    "Browse the official photo gallery of the Olubadan Palace — featuring coronation archives, cultural festivals, chieftaincy ceremonies, and historic moments from Ibadanland.",
  keywords: [
    "Olubadan gallery",
    "Ibadan royal photos",
    "palace coronation archive",
    "Yoruba cultural festival",
    "chieftaincy ceremony photos",
  ],
  openGraph: {
    title: "Royal Gallery — Olubadan Palace",
    description:
      "Browse official palace photographs — coronation archives, festivals, and royal ceremonies from Ibadanland.",
    type: "website",
    locale: "en_NG",
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <PalaceGallery />
      <Footer />
    </div>
  );
}
