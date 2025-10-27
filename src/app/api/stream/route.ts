import { NextResponse } from "next/server";
import https from "https";

export async function GET() {
  const url = "http://stream.zenolive.com/e9x2n97b9uduv"; // Royal FM Ibadan

  return new Promise<NextResponse>((resolve) => {
    https.get(url, (stream: NodeJS.ReadableStream) => {
      const headers = new Headers({
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
      });

      resolve(new NextResponse(stream as unknown as BodyInit, { headers }));
    });
  });
}
