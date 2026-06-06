"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Tag } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import { palaceNews } from "@/lib/palace-data";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

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

export default function NewsPage() {
  const [publishedNews, setPublishedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          if (data.news && data.news.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mapped = data.news.map((item: any) => ({
              id: item.id,
              headline: item.headline,
              subtitle: item.subtitle || "",
              content: item.content,
              image: item.featuredImageUrl || "/royal_palace.jpeg",
              author: item.authorName || "Palace Office",
              publishDate: item.publishDate || item.createdAt,
              category: item.category.replace(/_/g, " "),
            }));
            setPublishedNews(mapped);
            return;
          }
        }
      } catch (err) {
        console.error("Database fetch failed, using fallback mock news:", err);
      }
      
      // Fallback to static mock news if api fails or database is empty
      const staticNews = palaceNews.filter((n) => n.status === "Published");
      setPublishedNews(staticNews);
    }
    loadNews();
  }, []);

  return (
    <main className={`${poppins.className} min-h-screen bg-gray-50 pb-20`}>
      <section className="w-full bg-white px-6 py-16 shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9b762f]">
            Official updates
          </p>
          <h1 className={`${playfair.className} mt-3 text-4xl font-bold text-gray-950 md:text-5xl`}>
            Latest Palace News
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Published announcements, traditional council updates, cultural events, and government
            relations from the Olubadan Palace.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-2">
        {publishedNews.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="relative h-72 w-full md:h-96">
              <Image src={article.image} alt={article.headline} fill className="object-cover" />
            </div>
            <div className="p-7 md:p-9">
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8f6c2c]">
                <span className="inline-flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(article.publishDate).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className={`${playfair.className} mt-4 text-3xl font-bold text-gray-950`}>
                {article.headline}
              </h2>
              <p className="mt-3 font-medium text-gray-700">{article.subtitle}</p>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-gray-600">
                {typeof article.content === "string" ? (
                  <p>{article.content}</p>
                ) : (
                  article.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                )}
              </div>
              <p className="mt-6 text-sm font-semibold text-gray-800">Signed: {article.author}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
