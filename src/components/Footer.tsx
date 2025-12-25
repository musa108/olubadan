"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e1e1e] text-gray-300 py-10 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center md:text-left grid md:grid-cols-3 gap-10"
      >
        {/* Column 1 */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-3">
            Olubadan Kingdom
          </h3>
          <p className="text-sm text-gray-400">
            Preserving culture, promoting unity, and embracing the modern Yoruba
            identity through history, art, and leadership.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/biography" className="hover:text-white transition">
                Biography
              </Link>
            </li>
            <li>
              <Link href="/timeline" className="hover:text-white transition">
                Cultural Timeline
              </Link>
            </li>
            <li>
              <Link href="/radio" className="hover:text-white transition">
                Royal Radio
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">
            Stay Connected
          </h4>
          <p className="text-sm text-gray-400 mb-3">
            Follow us for updates and royal news.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="#" className="hover:text-white transition">
              Twitter
            </Link>
            <Link href="#" className="hover:text-white transition">
              Instagram
            </Link>
            <Link href="#" className="hover:text-white transition">
              Facebook
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Olubadan Kingdom. All Rights Reserved.
      </div>
    </footer>
  );
}
