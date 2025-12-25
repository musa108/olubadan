import AboutSection from "@/components/AboutSection";
import CulturalHeritage from "@/components/CulturalHeritage";
import CulturalTimeline from "@/components/CulturalTimeline";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PalaceGallery from "@/components/PalaceGallery";
import RadioSection from "@/components/RadioSection";
import InaugurationSpeech from "@/components/InaugurationSpeech";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <AboutSection />
      <InaugurationSpeech />
      <CulturalHeritage />
      <PalaceGallery />
      <CulturalTimeline />
      <RadioSection />
      <Footer />
    </div>
  );
}
