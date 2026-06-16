"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Poppins } from "next/font/google";
import { Maximize2, Tag, Calendar, X, Play } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fallbackImages = [
  { id: "fallback-1", title: "Royal Palace Exterior", url: "/royal_palace.jpeg", category: "PALACE_EVENTS", description: "Majestic view of the Olubadan Palace." },
  { id: "fallback-2", title: "Coronation Ceremony", url: "/olubadan1.jpeg", category: "CORONATION", description: "Historic crown installation in Ibadanland." },
  { id: "fallback-3", title: "Traditional Assembly", url: "/olubadan3.jpeg", category: "PALACE_EVENTS", description: "Traditional council assembly meeting." },
  { id: "fallback-4", title: "Heritage Procession", url: "/olubadan2.jpeg", category: "FESTIVALS", description: "Cultural procession and parade." },
  { id: "fallback-5", title: "Royal Palace Hall", url: "/olubadan4.jpeg", category: "HISTORICAL_ARCHIVES", description: "Interior reception hall of Olubadan." },
  { id: "fallback-6", title: "Olubadan Cabinet", url: "/olubadan5.jpeg", category: "HISTORICAL_ARCHIVES", description: "Olubadan traditional chiefs assembly." },
];

const categoryTabs = [
  { id: "ALL", label: "All Archives" },
  { id: "CORONATION", label: "Coronation" },
  { id: "FESTIVALS", label: "Festivals" },
  { id: "PALACE_EVENTS", label: "Palace Events" },
  { id: "HISTORICAL_ARCHIVES", label: "Historical Archives" },
];

interface GalleryItem {
  id: string;
  title: string;
  url: string;
  type?: string;
  category: string;
  description?: string | null;
  createdAt?: string | Date;
}

export default function PalaceGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.gallery && data.gallery.length > 0) {
            setItems(data.gallery);
            return;
          }
        }
      } catch (err) {
        console.error("Database gallery fetch failed:", err);
      }
      setItems(fallbackImages);
    }
    loadGallery();
  }, []);

  const filteredItems = activeTab === "ALL"
    ? items
    : items.filter(item => item.category === activeTab);

  return (
    <section className={`${poppins.className} bg-[#faf7f2] py-14 sm:py-24 px-4 sm:px-6 md:px-16 border-t border-b border-[#eae6db]`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9b762f] bg-[#fffaf0] border border-[#e8ddc8] px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-xs">
            Digital Archives
          </span>
          <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight`}>
            The Royal Palace Gallery
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto leading-relaxed font-medium">
            Preserving a visual legacy of wisdom, coronation records, cultural assemblies, and historic festivals of Ibadanland.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-[#eae6db] pb-4">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#191714] text-[#d6b15b] border border-[#d6b15b]/20 shadow-md"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImage(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-[#eae6db] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  {item.type === "VIDEO" ? (
                    <>
                      <video
                        src={item.url}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        muted
                        playsInline
                        loop
                        onMouseOver={(e) => {
                          const v = e.target as HTMLVideoElement;
                          v.play().catch(() => {});
                        }}
                        onMouseOut={(e) => {
                          const v = e.target as HTMLVideoElement;
                          v.pause();
                        }}
                      />
                      <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-[#e1bd62]">
                        <Play className="h-4 w-4 fill-[#e1bd62] text-[#e1bd62]" />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Hover overlay with zoom icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="rounded-full bg-white/10 backdrop-blur-md p-3.5 border border-white/20 text-[#e1bd62] scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#e1bd62] border border-white/10">
                      <Tag className="h-3 w-3 text-[#e1bd62]" />
                      {item.category.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className={`${playfair.className} text-xl font-bold text-gray-950 leading-snug group-hover:text-[#9b762f] transition-colors duration-250`}>
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description || "Historical palace photographic archive."}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3.5 border-t border-[#eae6db] flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5 text-[#9b762f]" />
                    <span>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-NG", {
                        month: "short",
                        year: "numeric"
                      }) : "ARCHIVE"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Premium Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[95dvh]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-[#d6b15b] transition bg-black/60 hover:bg-black/80 rounded-full p-2 z-10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] w-full bg-[#0c0a09] flex items-center justify-center">
                {selectedImage.type === "VIDEO" ? (
                  <video
                    src={selectedImage.url}
                    controls
                    autoPlay
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              <div className="p-4 sm:p-6 bg-white overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#faf8f3] border border-[#e8ddc8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9b762f]">
                    {selectedImage.category.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className={`${playfair.className} text-2xl font-bold text-gray-950`}>
                  {selectedImage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 font-medium">
                  {selectedImage.description || "Palace digital records and visual history files."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
