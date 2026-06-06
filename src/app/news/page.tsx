import type { Metadata } from "next";
import NewsPage from "@/components/Newspage";

export const metadata: Metadata = {
  title: "Palace News & Announcements",
  description:
    "Stay informed with the latest news, royal announcements, and cultural events from the Palace of the Olubadan of Ibadanland.",
  keywords: ["Olubadan news", "Ibadan palace news", "traditional ruler announcement", "Yoruba cultural events"],
  openGraph: {
    title: "Palace News & Announcements | Olubadan Palace",
    description: "Latest royal news and palace announcements from Ibadanland.",
    type: "website",
  },
};

export default function Page() {
  return <NewsPage />;
}
