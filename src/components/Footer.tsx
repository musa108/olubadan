"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-14 pb-6 px-6 md:px-16 border-t border-[#2b2b2b]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12"
      >
        {/* Column 1 */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-[#D4AF37] tracking-wide"
          >
            Olubadan Kingdom
          </motion.h3>

          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Preserving culture, promoting unity, and embracing the modern Yoruba
            identity through history, art, and leadership.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-xl font-semibold text-[#D4AF37] mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Biography", href: "/biography" },
              { label: "Cultural Timeline", href: "/timeline" },
              { label: "Royal Radio", href: "/radio" },
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  href={item.href}
                  className="hover:text-[#D4AF37] transition"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-xl font-semibold text-[#D4AF37] mb-3">
            Stay Connected
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Follow us for updates and royal announcements.
          </p>

          <div className="flex space-x-4">
            {["Twitter", "Instagram", "Facebook"].map((item, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-gray-300 hover:text-[#D4AF37] transition text-sm"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-10 text-xs text-gray-500"
      >
        © {new Date().getFullYear()} Olubadan Kingdom. All Rights Reserved.
      </motion.div>
    </footer>
  );
}
