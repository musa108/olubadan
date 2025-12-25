"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Poppins } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RadioSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Fresh FM Ibadan 105.9 confirmed live stream link
  const streamUrl = "http://stream.zenolive.com/e9x2n97b9uduv";

  const handlePlayToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="bg-linear-to-b from-[#fffaf4] to-[#f9f3e8] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Radio Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <Image
            src="/frsh_fm.jpg"
            alt="Fresh FM Ibadan Studio"
            className="w-full h-80 object-cover rounded-2xl shadow-xl"
            width={640}
            height={480}
          />
        </motion.div>

        {/* Radio Text */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-left"
        >
          <h2
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#3B2F2F]`}
          >
            Fresh FM 105.9 Ibadan – The Voice of the Southwest
          </h2>
          <p
            className={`${poppins.className} text-gray-700 text-lg mt-4 leading-relaxed mb-6`}
          >
            Tune in to the vibrant pulse of Yoruba culture with{" "}
            <span className="font-semibold text-[#b68d40]">
              Fresh FM Ibadan 105.9
            </span>
            . Enjoy captivating talk shows, rich music, and community stories
            from the heart of the city.
          </p>
          <button
            onClick={handlePlayToggle}
            className="bg-[#b68d40] hover:bg-[#a67a2e] text-white px-8 py-3 rounded-md font-semibold shadow-md transition-all"
          >
            {isPlaying ? "Pause Live" : "Play Live"}
          </button>
          <audio ref={audioRef} src={streamUrl} preload="none" />
        </motion.div>
      </div>
    </section>
  );
}
