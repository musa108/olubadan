"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Poppins } from "next/font/google";
import Image from "next/image";
import { Radio, Video, MessageCircle } from "lucide-react";
import { useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface LivePlayerProps {
  type: "video" | "radio";
  title: string;
  description: string;
  image: string;
  youtubeChannelOrVideoId: string;
  isLive?: boolean;
  showChat?: boolean;
  videoId?: string;
}

export default function LivePlayer({
  type,
  title,
  description,
  image,
  youtubeChannelOrVideoId,
  isLive = true,
  showChat = false,
  videoId,
}: LivePlayerProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isVideo = type === "video";
  const embedUrl = isVideo
    ? `https://www.youtube.com/embed/${youtubeChannelOrVideoId}?autoplay=0&fs=1`
    : `https://www.youtube.com/embed/live_stream?channel=${youtubeChannelOrVideoId}&autoplay=0`;

  const chatUrl = videoId
    ? `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${typeof window !== 'undefined' ? window.location.hostname : ''}`
    : "";

  return (
    <section className="bg-linear-to-b from-[#fffaf4] to-[#f9f3e8] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {isVideo ? (
              <Video size={32} className="text-[#b68d40]" />
            ) : (
              <Radio size={32} className="text-[#b68d40]" />
            )}
            <h1
              className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#3B2F2F]`}
            >
              {title}
            </h1>
          </div>
          {isLive && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-red-600 font-semibold">LIVE NOW</span>
            </div>
          )}
          <p
            className={`${poppins.className} text-gray-700 text-lg max-w-2xl mx-auto`}
          >
            {description}
          </p>
        </motion.div>

        {/* Player & Chat Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`grid gap-8 ${showChat ? "md:grid-cols-4" : "md:grid-cols-3"} items-start`}
        >
          {/* Main Player */}
          <div className={showChat ? "md:col-span-3" : "md:col-span-2"}>
            <div className="w-full aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="Live Stream Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Chat Section (for video only) */}
          {showChat && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96 flex flex-col">
                {/* Chat Header */}
                <div className="bg-[#b68d40] text-white p-4 flex items-center gap-2">
                  <MessageCircle size={20} />
                  <h3 className={`${playfair.className} font-bold`}>
                    Live Chat
                  </h3>
                </div>

                {/* Chat Content */}
                {videoId ? (
                  <iframe
                    src={chatUrl}
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    className="flex-1"
                    title="YouTube Live Chat"
                  ></iframe>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-4 text-center">
                    <div>
                      <MessageCircle
                        size={48}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      <p className="text-gray-500 text-sm">
                        Live stream chat will appear here. Chat is powered by YouTube.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Chat Toggle */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="md:hidden w-full mt-4 bg-[#b68d40] hover:bg-[#a67a2e] text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                {isChatOpen ? "Hide Chat" : "Show Chat"}
              </button>
            </motion.div>
          )}

          {/* Sidebar Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={showChat ? "md:col-span-1 md:col-start-4 md:row-start-3" : "md:col-span-1"}
          >
            {/* Stream Image */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={image}
                alt={title}
                width={300}
                height={300}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className={`${poppins.className} text-sm text-gray-600`}>
                  Stream Type
                </p>
                <p
                  className={`${playfair.className} text-lg font-bold text-[#b68d40]`}
                >
                  {isVideo ? "Live Video" : "Live Audio"}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className={`${poppins.className} text-sm text-gray-600`}>
                  Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  <p className={`${poppins.className} text-sm font-semibold`}>
                    {isLive ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="bg-[#b68d40] text-white rounded-lg p-4 shadow-md">
                <p className={`${poppins.className} text-sm mb-2 font-semibold`}>
                  📺 Pro Tip
                </p>
                <p className={`${poppins.className} text-xs`}>
                  {isVideo
                    ? "Full screen for the best viewing experience. Adjust volume using your player controls."
                    : "Subscribe to get notifications when we go live. Follow on social media for updates."}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
