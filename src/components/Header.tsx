"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAncestralOpen, setIsAncestralOpen] = useState(false);
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    "BIOGRAPHY",
    "ANCESTRAL LINES",
    "LIVE STREAM",
    "NEWS",
  ];

  const ancestralLines = [
    { name: "OTUN LINE", href: "/otunline" },
    { name: "BALOGUN LINE", href: "/balogunline" },
    { name: "MOGAJI LINE", href: "/mogajiline" },
    { name: "BAALE LINE", href: "/baaleline" },
  ];

  const liveStreamOptions = [
    { name: "RADIO", href: "/radio" },
    { name: "VIDEO", href: "/video" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center px-4 py-4">
        
        {/* LOGO — stays fully left now */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center space-x-4 mr-auto"
        >
          <Image
            src="/the king.jpeg"
            alt="Olubadan"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <Link
            href="/"
            className={`${playfair.className} text-3xl font-bold text-[#b68d40] tracking-wide`}
          >
            Olubadan
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <nav
          className={`${poppins.className} hidden md:flex space-x-16 text-gray-700 font-medium`}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={
                item === "ANCESTRAL LINES" || item === "LIVE STREAM"
                  ? "relative group"
                  : ""
              }
            >
              <Link
                href={
                  item === "ANCESTRAL LINES" || item === "LIVE STREAM"
                    ? "#"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                onClick={(e) =>
                  (item === "ANCESTRAL LINES" || item === "LIVE STREAM") &&
                  e.preventDefault()
                }
                className="relative flex items-center gap-1 hover:text-[#b68d40] transition duration-200"
              >
                {item}
                {(item === "ANCESTRAL LINES" || item === "LIVE STREAM") && (
                  <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                )}
                <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-[#b68d40]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              {/* Dropdown for Ancestral Lines */}
              {item === "ANCESTRAL LINES" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-50"
                >
                  <div className="flex flex-col py-2">
                    {ancestralLines.map((line) => (
                      <Link
                        key={line.name}
                        href={line.href}
                        className="px-4 py-2 text-gray-700 hover:bg-[#b68d40] hover:text-white transition duration-200 font-medium"
                      >
                        {line.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Dropdown for Live Stream */}
              {item === "LIVE STREAM" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-50"
                >
                  <div className="flex flex-col py-2">
                    {liveStreamOptions.map((option) => (
                      <Link
                        key={option.name}
                        href={option.href}
                        className="px-4 py-2 text-gray-700 hover:bg-[#b68d40] hover:text-white transition duration-200 font-medium"
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-[#b68d40] focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`${poppins.className} md:hidden bg-white shadow-md`}
          >
            <nav className="flex flex-col space-y-3 px-6 py-4 text-gray-700 font-medium">
              {menuItems.map((item) => (
                <div key={item}>
                  {item === "ANCESTRAL LINES" ? (
                    <>
                      <button
                        onClick={() => setIsAncestralOpen(!isAncestralOpen)}
                        className="flex items-center gap-2 w-full hover:text-[#b68d40] transition"
                      >
                        {item}
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            isAncestralOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isAncestralOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col space-y-2 mt-2 pl-4 border-l-2 border-[#b68d40]"
                          >
                            {ancestralLines.map((line) => (
                              <Link
                                key={line.name}
                                href={line.href}
                                className="hover:text-[#b68d40] transition"
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsAncestralOpen(false);
                                }}
                              >
                                {line.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item === "LIVE STREAM" ? (
                    <>
                      <button
                        onClick={() => setIsLiveStreamOpen(!isLiveStreamOpen)}
                        className="flex items-center gap-2 w-full hover:text-[#b68d40] transition"
                      >
                        {item}
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            isLiveStreamOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isLiveStreamOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col space-y-2 mt-2 pl-4 border-l-2 border-[#b68d40]"
                          >
                            {liveStreamOptions.map((option) => (
                              <Link
                                key={option.name}
                                href={option.href}
                                className="hover:text-[#b68d40] transition"
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsLiveStreamOpen(false);
                                }}
                              >
                                {option.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "")}`}
                      className="hover:text-[#b68d40] transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
