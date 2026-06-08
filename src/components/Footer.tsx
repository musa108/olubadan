"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Playfair_Display, Poppins } from "next/font/google";
import {
  Crown,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${poppins.className} bg-[#191714] text-[#f4f1ea]/80 pt-12 sm:pt-16 pb-8 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-[#d6b15b]/15 relative overflow-hidden`}>
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,177,91,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(214,177,91,0.02),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pb-12 border-b border-[#d6b15b]/10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#d6b15b]/10 border border-[#d6b15b]/20 flex items-center justify-center shrink-0">
                <Crown className="h-5 w-5 text-[#d6b15b]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d6b15b] leading-none">Secretariat Portal</p>
                <h3 className={`${playfair.className} text-lg font-bold text-white mt-1 leading-tight`}>
                  Palace of Olubadan
                </h3>
              </div>
            </div>
            <p className="text-xs text-[#f4f1ea]/60 leading-relaxed max-w-sm pt-2">
              The official portal of His Imperial Majesty, Oba Rashidi Adewolu Ladoja, the 44th Olubadan of Ibadanland. Preserving cultural pedigree and ancestral heritage.
            </p>
            <div className="flex items-center gap-3.5 pt-3">
              {[
                { icon: Twitter, href: "https://twitter.com/olubadanpalace", label: "Twitter" },
                { icon: Facebook, href: "https://facebook.com/olubadanpalace", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com/olubadanpalace", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com/olubadanpalace", label: "Youtube" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="h-8.5 w-8.5 rounded-lg bg-white/5 border border-[#d6b15b]/10 flex items-center justify-center text-[#d6b15b] hover:bg-[#d6b15b] hover:text-[#191714] hover:border-transparent transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Traditional Lineages */}
          <div>
            <h4 className={`${playfair.className} text-sm font-bold uppercase tracking-wider text-white mb-5 pb-1 border-b border-[#d6b15b]/10 w-fit`}>
              Chieftaincy Lines
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Olubadan Advisory Council", href: "/advisory-council" },
                { label: "Otun Olubadan Chieftaincy Line", href: "/otun-line" },
                { label: "Balogun Chieftaincy Line", href: "/balogun-line" },
                { label: "Iyalode Chieftaincy Line", href: "/iyalode-line" },
                { label: "Mogajis of Ibadanland", href: "/mogaji-line" },
                { label: "Baales of Ibadanland", href: "/baale-line" },
                { label: "Honorary Chieftaincy", href: "/honorary-chieftaincy" },
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={item.href}
                      className="text-[#f4f1ea]/60 hover:text-[#d6b15b] transition flex items-center gap-1.5 font-medium"
                    >
                      <ArrowRight className="h-3 w-3 text-[#d6b15b]/40 shrink-0" />
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform Resources */}
          <div>
            <h4 className={`${playfair.className} text-sm font-bold uppercase tracking-wider text-white mb-5 pb-1 border-b border-[#d6b15b]/10 w-fit`}>
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Palace Home", href: "/" },
                { label: "Kabiesi Biography", href: "/biography" },
                { label: "Historical Timeline", href: "/#timeline" },
                { label: "Digital Palace Gallery", href: "/gallery" },
                { label: "Official Speeches", href: "/speeches" },
                { label: "Palace News Chronicles", href: "/news" },
                { label: "Title Holders Gateway", href: "/portal" },
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={item.href}
                      className="text-[#f4f1ea]/60 hover:text-[#d6b15b] transition flex items-center gap-1.5 font-medium"
                    >
                      <ArrowRight className="h-3 w-3 text-[#d6b15b]/40 shrink-0" />
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Streams */}
          <div className="space-y-5">
            <div>
              <h4 className={`${playfair.className} text-sm font-bold uppercase tracking-wider text-white mb-5 pb-1 border-b border-[#d6b15b]/10 w-fit`}>
                Royal Contacts
              </h4>
              <ul className="space-y-3 text-xs text-[#f4f1ea]/65 font-medium">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#d6b15b] shrink-0 mt-0.5" />
                  <span>Olubadan Palace, Oja Oba Area,<br />Ibadan, Oyo State, Nigeria.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#d6b15b] shrink-0" />
                  <a href="mailto:secretariat@olubadanpalace.org" className="hover:text-[#d6b15b] transition">secretariat@olubadanpalace.org</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#d6b15b] shrink-0" />
                  <a href="tel:+2348000000000" className="hover:text-[#d6b15b] transition">+234 800 000 0000</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#d6b15b] mb-2">Live Feeds</p>
              <div className="flex gap-2">
                <Link href="/radio" className="rounded-lg bg-white/5 border border-[#d6b15b]/10 hover:border-[#d6b15b]/45 text-[10px] font-bold text-white px-3 py-1.5 transition">
                  Radio Feed
                </Link>
                <Link href="/video" className="rounded-lg bg-[#d6b15b] text-[#191714] text-[10px] font-bold px-3 py-1.5 border border-transparent hover:bg-[#c39f4d] transition">
                  Video Stream
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright strip */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[11px] text-[#f4f1ea]/45 font-medium">
            &copy; {currentYear} Palace of the Olubadan of Ibadanland. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-[11px] text-[#f4f1ea]/45 font-medium">
            <Link href="/portal" className="hover:text-[#d6b15b] transition">Secretariat Login</Link>
            <span>&middot;</span>
            <Link href="/admin" className="hover:text-[#d6b15b] transition">Console Gateway</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
