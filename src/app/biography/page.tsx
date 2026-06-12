import type { Metadata } from "next";
import BiographyClient from "./BiographyClient";

export const metadata: Metadata = {
  title: "Biography of Oba Rashidi Adewolu Ladoja",
  description:
    "Read the full biography of Oba Rashidi Adewolu Ladoja — chemical engineer, senator, Governor of Oyo State, and the 44th Olubadan of Ibadanland.",
  keywords: ["Rashidi Ladoja", "Olubadan biography", "44th Olubadan", "Ibadan king", "Oyo State governor"],
  openGraph: {
    title: "Biography of Oba Rashidi Adewolu Ladoja | Olubadan Palace",
    description:
      "The life and legacy of Oba Rashidi Adewolu Ladoja — engineer, statesman, and paramount ruler of Ibadanland.",
    type: "profile",
  },
};

export default function BiographyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Oba Rashidi Adewolu Ladoja",
            "alternateName": ["Rashidi Ladoja", "Oba Ladoja", "Ladoja Olubadan"],
            "jobTitle": "Olubadan of Ibadanland",
            "birthDate": "1944-09-25",
            "birthPlace": {
              "@type": "Place",
              "name": "Gambari, Oyo State, Nigeria"
            },
            "description": "Chemical engineer, former Oyo State Senator, former Oyo State Governor, and the 44th Olubadan of Ibadanland.",
            "memberOf": {
              "@type": "Organization",
              "name": "Olubadan Traditional Chieftaincy Council"
            },
            "sameAs": [
              "https://en.wikipedia.org/wiki/Rashidi_Ladoja"
            ]
          })
        }}
      />
      <BiographyClient />
    </>
  );
}
