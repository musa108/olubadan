import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary if credentials exist
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // If Cloudinary is not configured, fall back to mock upload for safety in development
    if (!isCloudinaryConfigured) {
      console.warn("Cloudinary environment variables are not set. Returning a mock URL.");
      // Generate a temporary local URL or place holder matching file type
      const fileType = file.type.startsWith("video") ? "video" : "image";
      const mockUrl = fileType === "video" 
        ? "https://res.cloudinary.com/demo/video/upload/dog.mp4" 
        : `/mock-upload-${Date.now()}-${file.name}`;
      return NextResponse.json({
        url: mockUrl,
        warning: "Cloudinary credentials not configured. Using mock fallback.",
      });
    }

    // Determine resource type (image or video)
    const resourceType = file.type.startsWith("video/")
      ? "video"
      : file.type.startsWith("image/")
      ? "image"
      : "auto";

    // Upload to Cloudinary via upload stream
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "olubadan_palace",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) return resolve(result);
          reject(new Error("Upload failed with no result."));
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error: unknown) {
    console.error("File upload error:", error);
    const message = error instanceof Error ? error.message : "File upload failed.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
