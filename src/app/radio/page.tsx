"use client";

import { useState } from "react";
import LivePlayer from "@/components/LivePlayer";
import RadioSection from "@/components/RadioSection";
import { Playfair_Display, Poppins } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RadioPage() {
  const [showLiveStream, setShowLiveStream] = useState(false);

  return (
    <div className="">
      {/* Toggle Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-r from-[#b68d40] to-[#8b6830] py-8 px-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-2`}>
              Radio Options
            </h2>
            <p className={`${poppins.className} text-[#f0e6d8] text-sm md:text-base`}>
              Choose between listening to Fresh FM 105.9 or watching our live radio stream
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setShowLiveStream(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                !showLiveStream
                  ? "bg-white text-[#b68d40] shadow-lg"
                  : "bg-[#8b6830] text-white hover:bg-[#7a5a1f]"
              }`}
            >
              Fresh FM
            </button>
            <button
              onClick={() => setShowLiveStream(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                showLiveStream
                  ? "bg-white text-[#b68d40] shadow-lg"
                  : "bg-[#8b6830] text-white hover:bg-[#7a5a1f]"
              }`}
            >
              Live Stream
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      {showLiveStream ? (
        <LivePlayer
          type="radio"
          title="Olubadan Live Radio Stream"
          description="Tune in to exclusive live radio broadcasts featuring cultural conversations, Yoruba heritage stories, and special announcements from the Olubadan Palace. Experience the voice of tradition."
          image="/HisMajesty.jpeg"
          youtubeChannelOrVideoId="YOUR_YOUTUBE_RADIO_CHANNEL_ID"
          isLive={true}
        />
      ) : (
        <RadioSection />
      )}
    </div>
  );
}
