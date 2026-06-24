"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Tag, ArrowRight } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import { palaceNews } from "@/lib/palace-data";

type NewsItem = {
  id: string;
  headline: string;
  subtitle: string;
  content: string | string[];
  image: string;
  author: string;
  publishDate: string;
  category: string;
};

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function LatestNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data: unknown = await res.json();

        const safe = data as {
          news?: Array<{
            id?: string;
            headline?: string;
            subtitle?: string;
            content?: string | string[];
            featuredImageUrl?: string;
            authorName?: string;
            publishDate?: string;
            createdAt?: string;
            category?: string;
          }>;
        };

        if (safe.news && safe.news.length > 0) {
          const mapped: NewsItem[] = safe.news
            .map((item) => {
              const id = item.id;
              const headline = item.headline;
              if (!id || !headline) return null;

              const publishDate = item.publishDate || item.createdAt || new Date().toISOString();

              return {
                id,
                headline,
                subtitle: item.subtitle || "",
                content: item.content || "",
                image: item.featuredImageUrl || "/royal_palace.jpeg",
                author: item.authorName || "Palace Office",
                publishDate,
                category: (item.category || "").replace(/_/g, " "),
              };
            })
            .filter((x): x is NewsItem => x !== null);

          setNews(mapped.slice(0, 6));
          return;
        }
      } catch {
        // ignore and fall back to static mock news
      }

      const staticNews = palaceNews
        .filter((n) => n.status === "Published")
        .slice(0, 6)
        .map((n) => ({
          id: n.id,
          headline: n.headline,
          subtitle: n.subtitle,
          content: n.content,
          image: n.image,
          author: n.author,
          publishDate: n.publishDate,
          category: n.category,
        }));
      setNews(staticNews);
    }

    loadNews();
  }, []);

  return (
    <section className={`${poppins.className} py-14 sm:py-24 px-4 sm:px-6 md:px-16 bg-[#faf8f4] text-gray-900`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9b762f] bg-[#fdfaf3] border border-[#e8ddc8] px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-xs">
              Palace Chronicles
            </span>
            <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#191714] leading-tight`}>
              Latest From the Royal Seat
            </h2>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Stay informed with verified reports, traditional council announcements, and cultural updates direct from the Olubadan Palace.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#9b762f] hover:text-[#7f6027] group border-b border-[#9b762f]/30 pb-1.5 hover:border-[#7f6027] transition-all"
            >
              Explore all announcements
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {news.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <Link key={item.id} href="/news" className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#eae6db] shadow-xs hover:shadow-xl transition-all duration-300">
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col flex-1"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.headline}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#e1bd62] border border-white/10">
                        <Tag className="h-3 w-3 text-[#e1bd62]" />
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-3.5">
                        <CalendarDays className="h-3.5 w-3.5 text-[#9b762f]" />
                        {new Date(item.publishDate).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <h3 className={`${playfair.className} text-xl font-bold text-gray-950 leading-snug group-hover:text-[#9b762f] transition-colors duration-250`}>
                        {item.headline}
                      </h3>
                      <p className="mt-2.5 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {item.subtitle || (Array.isArray(item.content) ? item.content[0] : item.content)}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#eae6db] flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        BY {item.author.replace("Signed: ", "")}
                      </span>
                      <span className="text-xs font-bold text-[#9b762f] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read More <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#eae6db] rounded-2xl">
            <p className="text-gray-500">Loading royal bulletins...</p>
          </div>
        )}
      </div>
    </section>
  );
}

