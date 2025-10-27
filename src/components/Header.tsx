"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import Image from "next/image";

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

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between max-lg:justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <Image
            src="/the king.jpeg"
            alt="Olubadan"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <Link
            href="/"
            className={`${playfair.className} text-3xl font-bold text-blue-700 tracking-wide`}
          >
            Olubadan
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav
          className={`${poppins.className} hidden md:flex space-x-16 text-gray-700 font-medium`}
        >
          <Link href="/biography" className="hover:text-blue-600 transition">
            BIOGRAPHY
          </Link>
          <Link href="/otun" className="hover:text-blue-600 transition">
            OTUN LINE
          </Link>
          <Link href="/osi" className="hover:text-blue-600 transition">
            BALOGUN LINE
          </Link>
          <Link href="/radio" className="hover:text-blue-600 transition">
            RADIO
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className={`${poppins.className} md:hidden bg-white shadow-md`}>
          <nav className="flex flex-col space-y-3 px-6 py-4 text-gray-700 font-medium">
            <Link href="/biography" className="hover:text-blue-600 transition">
              BIOGRAPHY
            </Link>
            <Link href="/otun" className="hover:text-blue-600 transition">
              OTUN LINE
            </Link>
            <Link href="/osi" className="hover:text-blue-600 transition">
              BALOGUN LINE
            </Link>
            <Link href="/radio" className="hover:text-blue-600 transition">
              RADIO
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
