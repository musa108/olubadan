import type { Metadata } from "next";
import LivePlayer from "@/components/LivePlayer";

export const metadata: Metadata = {
  title: "Live Video Stream | Olubadan Palace",
  description:
    "Watch live events, royal ceremonies, cultural celebrations, and exclusive broadcasts from the Olubadan Palace on our official live video stream.",
  openGraph: {
    title: "Live Video — Olubadan of Ibadanland",
    description:
      "Watch live ceremonies, events, and announcements from the Olubadan Palace.",
    type: "website",
    locale: "en_NG",
  },
};

export default function VideoPage() {
  return (
    <LivePlayer
      type="video"
      title="Olubadan Live Video Stream"
      description="Join us for live events, cultural celebrations, and exclusive broadcasts from the Olubadan Palace. Watch ceremonies, inaugurations, and important announcements in real-time."
      image="/HisMajesty.jpeg"
      youtubeChannelOrVideoId="UCX3zNcZlGgx48zQmsXnX0IQ"
      isLive={true}
    />
  );
}
