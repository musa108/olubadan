import LivePlayer from "@/components/LivePlayer";

export default function VideoPage() {
  return (
    <LivePlayer
      type="video"
      title="Olubadan Live Video Stream"
      description="Join us for live events, cultural celebrations, and exclusive broadcasts from the Olubadan Palace. Watch ceremonies, inaugurations, and important announcements in real-time."
      image="/HisMajesty.jpeg"
      youtubeChannelOrVideoId="YOUR_YOUTUBE_CHANNEL_ID"
      isLive={true}
      showChat={true}
      videoId="YOUR_YOUTUBE_VIDEO_ID"
    />
  );
}
