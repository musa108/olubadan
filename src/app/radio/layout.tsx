import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Radio | Olubadan Palace — Fresh FM 105.9 & Palace Stream",
  description:
    "Tune in to Fresh FM 105.9 Ibadan or watch the Olubadan Palace live radio stream. Cultural conversations, Yoruba heritage stories, and royal announcements from the heart of Ibadanland.",
  keywords: ["Fresh FM 105.9", "Ibadan radio", "Olubadan live", "Yoruba culture radio", "palace broadcast"],
  openGraph: {
    title: "Olubadan Palace Live Radio",
    description: "Listen to Fresh FM 105.9 or the Olubadan Palace live radio stream.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RadioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
