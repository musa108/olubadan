"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Video } from "lucide-react";

interface FileUploadWidgetProps {
  onUploadComplete: (url: string) => void;
  label?: string;
  accept?: string;
  defaultValue?: string;
  buttonText?: string;
}

export default function FileUploadWidget({
  onUploadComplete,
  label = "Upload File",
  accept = "image/*,video/*,application/pdf,.doc,.docx",
  defaultValue = "",
  buttonText = "Choose File",
}: FileUploadWidgetProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUrl(data.url);
      onUploadComplete(data.url);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const isImage = (fileUrl: string) => {
    return (
      fileUrl.match(/\.(jpeg|jpg|gif|png|webp)/i) != null ||
      fileUrl.includes("image/upload")
    );
  };

  const isVideo = (fileUrl: string) => {
    return (
      fileUrl.match(/\.(mp4|webm|ogg|mov|mkv|3gp|wmv)/i) != null ||
      fileUrl.includes("video/upload")
    );
  };

  return (
    <div className="space-y-2">
      {label && (
        <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">
          {label}
        </span>
      )}
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all duration-200 ${
          dragActive
            ? "border-[#d6b15b] bg-[#faf8f3]"
            : "border-[#e8e3da] bg-[#faf8f3] hover:border-[#d6b15b]/50"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center justify-center py-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#d6b15b] mb-2" />
            <p className="text-xs font-medium text-gray-500">Uploading file to Palace Server...</p>
          </div>
        ) : url ? (
          <div className="flex flex-col items-center space-y-3 w-full">
            {isImage(url) ? (
              <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-[#e8e3da] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="Uploaded preview" className="h-full w-full object-cover" />
              </div>
            ) : isVideo(url) ? (
              <div className="relative h-24 w-32 rounded-lg overflow-hidden border border-[#e8e3da] bg-black flex items-center justify-center">
                <video src={url} className="h-full w-full object-contain" muted playsInline />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Video className="h-6 w-6 text-white" />
                </div>
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d6b15b]/10 text-[#d6b15b]">
                <FileText className="h-6 w-6" />
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Upload Complete
            </div>
            <input
              type="text"
              readOnly
              value={url}
              className="w-full text-center rounded-lg border border-[#e8e3da] bg-white px-3 py-1.5 text-[11px] font-mono text-gray-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setUrl("");
                onUploadComplete("");
              }}
              className="text-[10px] font-bold uppercase tracking-wider text-red-650 hover:underline"
            >
              Remove &amp; Upload New
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-xs font-semibold text-[#191714] mb-1">
              Drag and drop your file here, or
            </p>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#e8e3da] bg-white px-3 py-1.5 text-xs font-bold text-[#191714] shadow-xs hover:bg-[#faf8f3] transition">
              <span>{buttonText}</span>
              <input
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-gray-400 mt-2">
              Supports JPG, PNG, WEBP, MP4, and PDF
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
