"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Crown, ShieldCheck, LogOut, Settings } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

const chieftaincyLines = [
  { name: "Olubadan Advisory Council", href: "/advisory-council" },
  { name: "Otun Olubadan Line", href: "/otun-line" },
  { name: "Balogun Chieftaincy Line", href: "/balogun-line" },
  { name: "Iyalode Chieftaincy Line", href: "/iyalode-line" },
  { name: "Mogajis of Ibadanland", href: "/mogaji-line" },
  { name: "Baales of Ibadanland", href: "/baale-line" },
  { name: "Honorary Chieftaincy", href: "/honorary-chieftaincy" },
];

const liveStreamOptions = [
  { name: "Radio Stream", href: "/radio" },
  { name: "Video Stream", href: "/video" },
];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAdmin = session?.user?.role === "SUPER_ADMIN";
  const isTitleHolder = session?.user?.role === "LINE_REPRESENTATIVE";

  const [isOpen, setIsOpen] = useState(false);
  const [isChieftaincyOpen, setIsChieftaincyOpen] = useState(false);
  const [isStreamOpen, setIsStreamOpen] = useState(false);

  // Hide the public header on admin and portal-only pages
  const hideHeader = pathname?.startsWith("/admin");

  if (hideHeader) return null;

  return (
    <>
      {/* Admin Session Indicator Bar */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#191714] border-b border-[#d6b15b]/20 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 rounded-full bg-[#d6b15b]/10 border border-[#d6b15b]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#d6b15b]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Super Admin Session Active
                </div>
                <span className="text-white/30 text-[11px] hidden sm:inline">
                  Viewing as: {session?.user?.name || session?.user?.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-lg bg-[#d6b15b] hover:bg-[#c29e4b] px-3 py-1.5 text-[11px] font-bold text-[#191714] transition"
                >
                  <Settings className="h-3 w-3" />
                  Admin Console
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 hover:bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/50 hover:text-white/80 transition"
                >
                  <LogOut className="h-3 w-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Title Holder Session Indicator */}
        {isTitleHolder && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a1814] border-b border-[#9b762f]/20 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-[#9b762f]/10 border border-[#9b762f]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9b762f]">
                  <Crown className="h-3.5 w-3.5" />
                  Title Holder Portal
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/portal/dashboard"
                  className="rounded-lg bg-[#9b762f]/10 hover:bg-[#9b762f]/20 border border-[#9b762f]/20 px-3 py-1.5 text-[11px] font-bold text-[#9b762f] transition"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 hover:bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/40 hover:text-white/70 transition"
                >
                  <LogOut className="h-3 w-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${poppins.className} bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm`}
      >
        <div className="max-w-7xl mx-auto flex items-center px-4 py-3 gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mr-auto shrink-0">
            <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-[#b68d40]/20">
              <Image src="/the king.jpeg" alt="Olubadan" fill className="object-cover" />
            </div>
            <div className="leading-tight">
              <span className={`${playfair.className} text-xl font-bold text-[#b68d40] tracking-wide block leading-none`}>
                Olubadan
              </span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.18em]">
                of Ibadanland
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">

            <Link
              href="/biography"
              className="px-3.5 py-2 rounded-lg text-gray-600 hover:text-[#b68d40] hover:bg-[#fffaf0] transition-all duration-200 font-semibold"
            >
              Biography
            </Link>

            <Link
              href="/news"
              className="px-3.5 py-2 rounded-lg text-gray-600 hover:text-[#b68d40] hover:bg-[#fffaf0] transition-all duration-200 font-semibold"
            >
              News
            </Link>


            {/* Chieftaincy Lines Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-gray-600 hover:text-[#b68d40] hover:bg-[#fffaf0] transition-all duration-200 font-semibold group-hover:text-[#b68d40] group-hover:bg-[#fffaf0]">
                Chieftaincy Lines
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-250 text-gray-400 group-hover:text-[#b68d40]" />
              </button>

              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[230px]">
                  <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                      Traditional Council
                    </span>
                  </div>
                  {chieftaincyLines.map((line) => (
                    <Link
                      key={line.href}
                      href={line.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fffaf0] hover:text-[#9b762f] transition-colors duration-150 font-medium"
                    >
                      {line.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <Link
              href="/gallery"
              className="px-3.5 py-2 rounded-lg text-gray-600 hover:text-[#b68d40] hover:bg-[#fffaf0] transition-all duration-200 font-semibold"
            >
              Gallery
            </Link>

            {/* Live Stream Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-gray-600 hover:text-[#b68d40] hover:bg-[#fffaf0] transition-all duration-200 font-semibold group-hover:text-[#b68d40] group-hover:bg-[#fffaf0]">
                Live Stream
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-250 text-gray-400 group-hover:text-[#b68d40]" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-40">
                  {liveStreamOptions.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fffaf0] hover:text-[#9b762f] transition-colors duration-150 font-medium"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Portal Link */}
            {!session && (
              <Link
                href="/portal"
                className="ml-2 flex items-center gap-1.5 rounded-lg bg-[#191714] hover:bg-[#2a2520] px-4 py-2 text-xs font-bold text-[#d6b15b] border border-[#d6b15b]/20 transition-all duration-200"
              >
                <Crown className="h-3.5 w-3.5" />
                Portal Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-[#b68d40] focus:outline-none transition p-1"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-4 space-y-1">
                <Link
                  href="/biography"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-[#fffaf0] hover:text-[#9b762f] transition"
                >
                  Biography
                </Link>
                <Link
                  href="/news"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-[#fffaf0] hover:text-[#9b762f] transition"
                >
                  News
                </Link>


                {/* Mobile Chieftaincy Lines */}
                <div>
                  <button
                    onClick={() => setIsChieftaincyOpen(!isChieftaincyOpen)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-[#fffaf0] hover:text-[#9b762f] transition"
                  >
                    Chieftaincy Lines
                    <ChevronDown
                      size={14}
                      className={`transform transition-transform duration-250 ${isChieftaincyOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isChieftaincyOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 mt-1 border-l-2 border-[#b68d40]/30 ml-3 flex flex-col space-y-0.5 overflow-hidden"
                      >
                        {chieftaincyLines.map((line) => (
                          <Link
                            key={line.href}
                            href={line.href}
                            onClick={() => { setIsOpen(false); setIsChieftaincyOpen(false); }}
                            className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#9b762f] hover:bg-[#fffaf0] transition"
                          >
                            {line.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/gallery"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-[#fffaf0] hover:text-[#9b762f] transition"
                >
                  Gallery
                </Link>

                {/* Mobile Live Stream */}
                <div>
                  <button
                    onClick={() => setIsStreamOpen(!isStreamOpen)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-[#fffaf0] hover:text-[#9b762f] transition"
                  >
                    Live Stream
                    <ChevronDown
                      size={14}
                      className={`transform transition-transform duration-250 ${isStreamOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isStreamOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 mt-1 border-l-2 border-[#b68d40]/30 ml-3 flex flex-col space-y-0.5 overflow-hidden"
                      >
                        {liveStreamOptions.map((opt) => (
                          <Link
                            key={opt.href}
                            href={opt.href}
                            onClick={() => { setIsOpen(false); setIsStreamOpen(false); }}
                            className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#9b762f] transition"
                          >
                            {opt.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!session && (
                  <Link
                    href="/portal"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#191714] px-4 py-3 text-sm font-bold text-[#d6b15b] border border-[#d6b15b]/20 transition"
                  >
                    <Crown className="h-4 w-4" />
                    Portal Login
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
