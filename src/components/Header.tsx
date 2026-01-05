"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    "BIOGRAPHY",
    "OTUN LINE",
    "BALOGUN LINE",
    "MOGAJI LINE",
    "BAALE LINE",
    "RADIO",
    "NEWS",
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
            >
              <Link
                href={`/${item.toLowerCase().replace(" ", "")}`}
                className="relative hover:text-[#b68d40] transition duration-200"
              >
                {item}
                <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-[#b68d40]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
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
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "")}`}
                  className="hover:text-[#b68d40] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
