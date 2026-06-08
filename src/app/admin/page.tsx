"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FileUploadWidget from "@/components/FileUploadWidget";
import { signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import {
  Activity,
  Archive,
  CheckCircle2,
  FileText,
  ImageIcon,
  Megaphone,
  Radio,
  ShieldCheck,
  Users,
  Video,
  Lock,
  X,
  PlusCircle,
  AlertCircle,
  LogOut,
  Edit,
  Trash2,
  ListRestart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Poppins } from "next/font/google";
import { LineKey, lineLabels } from "@/lib/palace-data";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const navItems = [
  { label: "Overview", icon: Activity },
  { label: "Profile Management", icon: ShieldCheck },
  { label: "News Management", icon: FileText },
  { label: "Announcements", icon: Megaphone },
  { label: "Gallery Management", icon: ImageIcon },
  { label: "Radio & Streams", icon: Radio },
  { label: "User Management", icon: Users },
  { label: "Audit Logs", icon: Archive },
];

// Thin auth shell — hooks here only: useSession
export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className={`${poppins.className} min-h-screen bg-[#191714] flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-[#d6b15b] border-t-transparent animate-spin" />
          <p className="text-white/50 text-sm font-medium">Loading Palace Admin session...</p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "SUPER_ADMIN") {
    return (
      <main className={`${poppins.className} min-h-screen bg-[#191714] flex items-center justify-center p-6`}>
        <div className="rounded-2xl border border-[#d6b15b]/20 bg-[#1e1a16] p-8 text-center max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,177,91,0.05),transparent_70%)] pointer-events-none" />
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d6b15b]/10 border border-[#d6b15b]/20">
            <Lock className="h-7 w-7 text-[#d6b15b]" />
          </div>
          <h2 className={`${playfair.className} text-2xl font-bold text-white`}>Access Restricted</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            You must be authenticated as a Super Admin to access the Palace Console.
          </p>
          <div className="mt-6">
            <Link
              href="/portal"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#d6b15b] px-5 py-3 text-sm font-bold text-[#191714] hover:bg-[#c29e4b] transition shadow-md border border-[#d6b15b]/20"
            >
              Sign In to Palace Gateway
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Auth confirmed — delegate to AdminContent where all data state lives
  return <AdminContent session={session} />;
}

interface AdminProfile {
  id: string;
  userId: string;
  line: string;
  title: string;
  fullTraditionalName: string;
  currentPosition: string;
  biography: string;
  familyHistory: string;
  achievements: string;
  palaceResponsibilities: string;
  profilePictureUrl?: string | null;
  status: string;
  reviewNote?: string | null;
  reviewedAt?: string | null;
  reviewedById?: string | null;
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
  } | null;
  
  // New Compact Bio Data Fields
  dateOfBirth?: string | null;
  familyCompound?: string | null;
  familyVillage?: string | null;
  localGovernment?: string | null;
  highestQualification?: string | null;
  fieldSpecialization?: string | null;
  otherQualifications?: string | null;
  currentOccupation?: string | null;
  yearInstalled?: string | null;
  languagesSpoken?: string | null;
  expertiseInterest?: string | null;
}

interface AdminNews {
  id: string;
  headline: string;
  subtitle?: string | null;
  content: string;
  featuredImageUrl?: string | null;
  category: string;
  status: string;
  createdAt: string;
}

interface AdminAnnouncement {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
}

interface AdminGalleryItem {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  type: string;
  category: string;
  status: string;
  createdAt: string;
}

interface AdminStreamSetting {
  id: string;
  type: string;
  title: string;
  streamUrl: string;
  isActive: boolean;
  description?: string | null;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  line?: string | null;
  positionTitle?: string | null;
}

interface AdminAuditLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string | null;
  createdAt: string;
  actor?: {
    name: string;
    email: string;
  } | null;
}

// All useState/useEffect hooks live here — rendered only after auth is confirmed
function AdminContent({ session }: { session: Session }) {
  // Dashboard Data State
  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [newsList, setNewsList] = useState<AdminNews[]>([]);
  const [announcementsList, setAnnouncementsList] = useState<AdminAnnouncement[]>([]);
  const [galleryList, setGalleryList] = useState<AdminGalleryItem[]>([]);
  const [streamsList, setStreamsList] = useState<AdminStreamSetting[]>([]);
  const [usersList, setUsersList] = useState<AdminUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeNav, setActiveNav] = useState("Overview");
  const [registerLine, setRegisterLine] = useState("OTUN");
  const [adminChiefCertificateUrl, setAdminChiefCertificateUrl] = useState("");

  // Selection / Form states
  const [selectedProfile, setSelectedProfile] = useState<AdminProfile | null>(null);
  const [reviewNote, setReviewNote] = useState("");

  // CRUD Toggle / Edit state
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [editingNews, setEditingNews] = useState<AdminNews | null>(null);
  const [isAddingAnn, setIsAddingAnn] = useState(false);
  const [editingAnn, setEditingAnn] = useState<AdminAnnouncement | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [editingGallery, setEditingGallery] = useState<AdminGalleryItem | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isAddingChief, setIsAddingChief] = useState(false);

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [
        resProfiles,
        resNews,
        resAnnouncements,
        resGallery,
        resStreams,
        resUsers,
        resLogs
      ] = await Promise.all([
        fetch("/api/profiles?includeUnpublished=true"),
        fetch("/api/news?includeUnpublished=true"),
        fetch("/api/announcements?includeUnpublished=true"),
        fetch("/api/gallery?includeUnpublished=true"),
        fetch("/api/streams"),
        fetch("/api/users"),
        fetch("/api/audit-logs"),
      ]);

      if (resProfiles.ok) {
        const d = await resProfiles.json();
        setProfiles(d.profiles || []);
      }
      if (resNews.ok) {
        const d = await resNews.json();
        setNewsList(d.news || []);
      }
      if (resAnnouncements.ok) {
        const d = await resAnnouncements.json();
        setAnnouncementsList(d.announcements || []);
      }
      if (resGallery.ok) {
        const d = await resGallery.json();
        setGalleryList(d.gallery || []);
      }
      if (resStreams.ok) {
        const d = await resStreams.json();
        setStreamsList(d.streams || []);
      }
      if (resUsers.ok) {
        const d = await resUsers.json();
        setUsersList(d.users || []);
      }
      if (resLogs.ok) {
        const d = await resLogs.json();
        setAuditLogs(d.logs || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch administrative platform data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerAlert = (type: "success" | "error", message: string) => {
    if (type === "success") {
      setSuccess(message);
      setTimeout(() => setSuccess(""), 4000);
    } else {
      setError(message);
      setTimeout(() => setError(""), 4000);
    }
  };

  // Profile Approvals
  const handleUpdateProfileStatus = async (id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, reviewNote: reviewNote || null }),
      });
      if (res.ok) {
        triggerAlert("success", `Profile status successfully set to ${newStatus}.`);
        setSelectedProfile(null);
        setReviewNote("");
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to update profile status.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProfile = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this chieftaincy representative profile? This cannot be undone.")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        triggerAlert("success", "Representative profile deleted successfully.");
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to delete profile.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  // News CRUD Handlers
  const handleSaveNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const headline = String(formData.get("headline"));
    const subtitle = String(formData.get("subtitle"));
    const category = String(formData.get("category"));
    const status = String(formData.get("status"));
    const content = String(formData.get("content"));
    const featuredImageUrl = String(formData.get("featuredImageUrl")) || undefined;

    const payload = { headline, subtitle, category, status, content, featuredImageUrl };

    try {
      const url = editingNews ? `/api/news/${editingNews.id}` : "/api/news";
      const method = editingNews ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingNews ? payload : { ...payload, authorName: "Palace Super Admin" }),
      });

      if (res.ok) {
        triggerAlert("success", editingNews ? "News bulletin updated." : "News bulletin published.");
        setEditingNews(null);
        setIsAddingNews(false);
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to save news bulletin.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Delete this news article?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        triggerAlert("success", "News article deleted.");
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to delete news article.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  // Announcement CRUD Handlers
  const handleSaveAnn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title"));
    const content = String(formData.get("content"));
    const status = String(formData.get("status"));

    const payload = { title, content, status };

    try {
      const url = editingAnn ? `/api/announcements/${editingAnn.id}` : "/api/announcements";
      const method = editingAnn ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerAlert("success", editingAnn ? "Announcement updated." : "Announcement created.");
        setEditingAnn(null);
        setIsAddingAnn(false);
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to save announcement.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAnn = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      if (res.ok) {
        triggerAlert("success", "Announcement deleted.");
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to delete announcement.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  // Gallery CRUD Handlers
  const handleSaveGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title"));
    const description = String(formData.get("description"));
    const url = String(formData.get("url"));
    const category = String(formData.get("category"));
    const status = String(formData.get("status"));

    const payload = { title, description, url, category, status, type: "IMAGE" };

    try {
      const endpoint = editingGallery ? `/api/gallery/${editingGallery.id}` : "/api/gallery";
      const method = editingGallery ? "PATCH" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerAlert("success", editingGallery ? "Gallery archive item updated." : "Gallery archive item added.");
        setEditingGallery(null);
        setIsAddingGallery(false);
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to save gallery item.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Delete this archive gallery item?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        triggerAlert("success", "Gallery item deleted.");
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to delete gallery item.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  // Streams Management
  const handleSaveStream = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title"));
    const streamUrl = String(formData.get("streamUrl"));
    const description = String(formData.get("description"));
    const isActive = formData.get("isActive") === "true";

    const payload = { title, streamUrl, description, isActive };

    try {
      const res = await fetch(`/api/streams/${type}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerAlert("success", `${type} feed settings updated successfully.`);
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to update feed.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  // User Management
  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const phone = String(formData.get("phone"));
    const password = String(formData.get("password"));
    const role = String(formData.get("role"));
    const line = formData.get("line") ? String(formData.get("line")) : undefined;
    const positionTitle = formData.get("positionTitle") ? String(formData.get("positionTitle")) : undefined;

    const payload = { name, email, phone, password, role, line, positionTitle };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerAlert("success", "Representative user login account created successfully.");
        setIsAddingUser(false);
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to create representative user account.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  // Super Admin direct Title Holder Profile creation (creates account + profile record in 1 step)
  const handleRegisterChief = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const line = String(formData.get("line"));

    // Certificate validation for MOGAJI and BAALE
    if ((line === "MOGAJI" || line === "BAALE") && !adminChiefCertificateUrl) {
      triggerAlert("error", "Certificate upload is required for Mogaji and Baale lines.");
      setActionLoading(false);
      return;
    }

    // Determine dynamic title
    let title = "";
    if (line === "BAALE") {
      title = String(formData.get("title")) || "Part Two (Baale)";
    } else if (line === "MOGAJI") {
      title = "Mogaji";
    } else if (line === "IYALODE") {
      title = "Iyalode";
    } else {
      title = "Chief";
    }

    const documentUrls = adminChiefCertificateUrl
      ? [{ title: "Certificate of Installation", url: adminChiefCertificateUrl }]
      : [];
    
    const payload = {
      fullName: String(formData.get("fullName")),
      email: String(formData.get("email")),
      phone: String(formData.get("phone")),
      password: String(formData.get("password")) || "change-this-password",
      positionTitle: String(formData.get("positionTitle")),
      line,
      title,
      fullTraditionalName: String(formData.get("fullTraditionalName")),
      currentPosition: String(formData.get("currentPosition") || "Community Head"),
      biography: String(formData.get("biography")),
      familyHistory: String(formData.get("familyHistory")),
      achievements: String(formData.get("achievements")),
      palaceResponsibilities: String(formData.get("palaceResponsibilities")),
      profilePictureUrl: String(formData.get("profilePictureUrl")) || undefined,
      documentUrls,
      // New Compact Bio Data Fields
      dateOfBirth: String(formData.get("dateOfBirth") || ""),
      familyCompound: String(formData.get("familyCompound") || ""),
      familyVillage: String(formData.get("familyVillage") || ""),
      localGovernment: String(formData.get("localGovernment") || ""),
      highestQualification: String(formData.get("highestQualification") || ""),
      fieldSpecialization: String(formData.get("fieldSpecialization") || ""),
      otherQualifications: String(formData.get("otherQualifications") || ""),
      currentOccupation: String(formData.get("currentOccupation") || ""),
      yearInstalled: ["BAALE", "IYALODE", "HONORARY"].includes(line) ? String(formData.get("yearInstalled") || "") : "",
      yearInstalledAsMagaji: ["ADVISORY_COUNCIL", "OTUN", "BALOGUN", "MOGAJI"].includes(line) ? String(formData.get("yearInstalledAsMagaji") || "") : "",
      yearPromotedLine: ["ADVISORY_COUNCIL", "OTUN", "BALOGUN"].includes(line) ? String(formData.get("yearPromotedLine") || "") : "",
      languagesSpoken: String(formData.get("languagesSpoken") || ""),
      expertiseInterest: String(formData.get("expertiseInterest") || ""),
    };

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerAlert("success", "Title Holder record & access credentials created successfully!");
        setAdminChiefCertificateUrl("");
        setIsAddingChief(false);
        fetchData();
      } else {
        const err = await res.json();
        triggerAlert("error", err.error || "Failed to register title holder.");
      }
    } catch {
      triggerAlert("error", "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const pendingProfiles = profiles.filter((p) => p.status === "PENDING_REVIEW");
  const verifiedProfiles = profiles.filter((p) => p.status === "PUBLISHED");

  return (
    <main className={`${poppins.className} min-h-screen bg-[#f4f1ea] text-[#191714] pb-20 flex flex-col`}>
      
      {/* Toast Alert System */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-green-500/20 text-sm"
          >
            <CheckCircle2 className="h-5 w-5" />
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-red-500/20 text-sm"
          >
            <AlertCircle className="h-5 w-5" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-7xl grid gap-0 lg:grid-cols-[260px_1fr] flex-1">
        
        {/* Sidebar */}
        <aside className="relative bg-[#191714] text-white lg:sticky lg:top-0 lg:h-screen flex flex-col overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,177,91,0.07),transparent_60%)] pointer-events-none" />

          {/* Brand Header */}
          <div className="relative border-b border-white/8 px-5 py-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-[#d6b15b]/40">
                <Image src="/the king.jpeg" alt="Olubadan" fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d6b15b]">Super Admin</p>
                <h1 className={`${playfair.className} text-lg font-bold leading-tight`}>Palace Console</h1>
              </div>
            </div>
            <div className="rounded-lg bg-[#d6b15b]/8 border border-[#d6b15b]/15 px-3 py-2">
              <p className="text-[10px] text-white/40 font-medium">Signed in as</p>
              <p className="text-xs font-semibold text-white/80 truncate">{session?.user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;
              return (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    setIsAddingNews(false);
                    setEditingNews(null);
                    setIsAddingAnn(false);
                    setEditingAnn(null);
                    setIsAddingGallery(false);
                    setEditingGallery(null);
                    setIsAddingUser(false);
                    setIsAddingChief(false);
                  }}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#d6b15b]/15 text-[#d6b15b] border border-[#d6b15b]/20"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#d6b15b]" : "text-white/40"}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="relative border-t border-white/8 px-3 py-4 space-y-1.5">

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/60 hover:bg-red-500/10 hover:text-red-400 transition"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="min-w-0 space-y-6 px-4 py-6 md:px-8 flex-1">
          
          {/* Dashboard Dynamic Header */}
          <div className="rounded-2xl overflow-hidden relative bg-[#191714] px-8 py-7 shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(214,177,91,0.08),transparent_55%)]" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d6b15b]">
                  Olubadan Palace Administrative Panel
                </p>
                <h2 className={`${playfair.className} mt-1.5 text-3xl font-bold text-white`}>
                  {activeNav} Control Centre
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/50 leading-relaxed">
                  {activeNav === "Overview" && "Review central platform configurations, latest news bulletins, and chieftaincy status updates."}
                  {activeNav === "Profile Management" && "Verify traditional pedigree records, approve applications, or register new chiefs."}
                  {activeNav === "News Management" && "Create, publish, edit, and delete verified bulletins on the Olubadan homepage."}
                  {activeNav === "Announcements" && "Publish official central alerts, banquets schedules, and mandate traditional council warnings."}
                  {activeNav === "Gallery Management" && "Digital preservation of historical files, festival photographs, and coronation archives."}
                  {activeNav === "Radio & Streams" && "Set active stream URLs for Fresh FM Radio and YouTube Live Video feeds."}
                  {activeNav === "User Management" && "Create credentials and manage traditional council staff and line representative portal accounts."}
                  {activeNav === "Audit Logs" && "System administrative audit logs ensuring non-repudiation of updates."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-400/10 border border-green-400/20 px-3 py-1.5 text-xs font-semibold text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  System Live
                </span>
                <button
                  onClick={fetchData}
                  disabled={loading}
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition disabled:opacity-55"
                >
                  <ListRestart className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-32 bg-white border border-[#e8e3da] rounded-2xl shadow-sm">
              <div className="h-8 w-8 rounded-full border-2 border-[#d6b15b] border-t-transparent animate-spin mb-3" />
              <p className="text-sm font-medium text-gray-500">Retrieving secure palace registry...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNav}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                
                {/* 1. OVERVIEW VIEW */}
                {activeNav === "Overview" && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {[
                        { label: "Verified Chiefs", value: verifiedProfiles.length, sub: "Published on line profiles", color: "from-[#d6b15b]/10 to-[#d6b15b]/5" },
                        { label: "Review Queue", value: pendingProfiles.length, sub: "Dossiers awaiting verification", color: "from-amber-500/10 to-amber-500/5" },
                        { label: "Palace Bulletins", value: newsList.length, sub: "Announcements & news articles", color: "from-blue-500/10 to-blue-500/5" },
                        { label: "Archive Files", value: galleryList.length, sub: "Coronation photos in database", color: "from-purple-500/10 to-purple-500/5" },
                      ].map(({ label, value, sub, color }) => (
                        <div key={label} className="rounded-2xl border border-[#e8e3da] bg-white p-5 shadow-sm relative overflow-hidden">
                          <div className={`absolute inset-0 bg-linear-to-br ${color} pointer-events-none`} />
                          <div className="relative">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#9b762f]">{label}</p>
                            <p className="mt-2 text-4xl font-bold text-[#191714]">{value}</p>
                            <p className="mt-1.5 text-xs text-gray-500">{sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                      {/* Left: Pending Profiles */}
                      <div className="rounded-2xl border border-[#e8e3da] bg-white shadow-sm overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-[#f0ece2] px-6 py-4">
                          <h3 className={`${playfair.className} text-xl font-bold`}>Pending Chieftaincy Profiles</h3>
                          <span className="rounded-full bg-amber-50 text-amber-700 px-2.5 py-1 text-xs font-bold border border-amber-200">{pendingProfiles.length} Awaiting</span>
                        </div>
                        <div className="divide-y divide-[#f4f1ea] flex-1 max-h-80 overflow-y-auto">
                          {pendingProfiles.length > 0 ? (
                            pendingProfiles.map((p) => (
                              <div key={p.id} className="p-4 hover:bg-[#faf8f3] transition flex justify-between items-center gap-4">
                                <div>
                                  <p className="font-bold text-sm">{p.fullTraditionalName}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">{p.title} · {lineLabels[p.line.toLowerCase() as LineKey] || p.line}</p>
                                </div>
                                <button
                                  onClick={() => { setSelectedProfile(p); setReviewNote(p.reviewNote || ""); }}
                                  className="rounded-lg border border-[#e8e3da] bg-[#f4f1ea] px-3 py-1.5 text-xs font-bold hover:border-[#d6b15b] hover:text-[#9b762f] transition"
                                >
                                  Review Dossier
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-center py-12 text-xs text-gray-400 font-semibold">Review queue is empty. No pending dossiers.</p>
                          )}
                        </div>
                        <div className="p-4 border-t border-[#f0ece2] bg-[#faf8f3]">
                          <button onClick={() => setActiveNav("Profile Management")} className="text-xs font-bold text-[#9b762f] hover:text-[#7f6027] transition w-full text-center">
                            Go to Profile Management
                          </button>
                        </div>
                      </div>

                      {/* Right: Quick Settings Summary */}
                      <div className="rounded-2xl border border-[#e8e3da] bg-white shadow-sm overflow-hidden flex flex-col justify-between">
                        <div className="border-b border-[#f0ece2] px-6 py-4 flex items-center justify-between">
                          <h3 className={`${playfair.className} text-xl font-bold`}>Palace Stream Feeds</h3>
                          <Radio className="h-5 w-5 text-[#d6b15b]" />
                        </div>
                        <div className="p-6 space-y-4 flex-1">
                          {streamsList.map((stream) => (
                            <div key={stream.id} className="p-4 rounded-xl border border-[#e8e3da] bg-[#faf8f3] flex items-center justify-between">
                              <div>
                                <h4 className="text-xs font-bold">{stream.title}</h4>
                                <p className="text-[10px] text-gray-400 truncate max-w-xs mt-0.5">{stream.streamUrl}</p>
                              </div>
                              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                                stream.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-500 border-gray-200"
                              }`}>
                                {stream.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 border-t border-[#f0ece2] bg-[#faf8f3]">
                          <button onClick={() => setActiveNav("Radio & Streams")} className="text-xs font-bold text-[#9b762f] hover:text-[#7f6027] transition w-full text-center">
                            Edit Streaming settings
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 2. PROFILE MANAGEMENT */}
                {activeNav === "Profile Management" && (
                  <div className="space-y-6">
                    {/* Add Representative Banner */}
                    <div className="flex justify-between items-center bg-white p-4 border border-[#e8e3da] rounded-2xl shadow-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#191714]">Register a Chieftaincy Representative</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Submit verified deeds, achievements, biography and login credentials for a new chief.</p>
                      </div>
                      <button
                        onClick={() => setIsAddingChief(!isAddingChief)}
                        className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 border border-[#d6b15b]/20"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {isAddingChief ? "Cancel Registration" : "Register New Chief"}
                      </button>
                    </div>

                    {isAddingChief ? (
                      <form onSubmit={handleRegisterChief} className="bg-white rounded-2xl border border-[#e8e3da] p-6 shadow-sm space-y-6">
                        <h3 className={`${playfair.className} text-xl font-bold border-b border-[#f0ece2] pb-3 text-[#191714]`}>New Chieftaincy Representative Registration</h3>
                        
                        {/* 0. Profile Picture (AT THE TOP) */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">Profile Portrait</p>
                          <div className="max-w-md">
                            <input type="hidden" id="adminChiefProfilePictureUrl" name="profilePictureUrl" />
                            <FileUploadWidget
                              label="Profile Picture (Formal Royal Attire)"
                              accept="image/*"
                              buttonText="Upload Photo"
                              onUploadComplete={(url) => {
                                const input = document.getElementById("adminChiefProfilePictureUrl") as HTMLInputElement;
                                if (input) input.value = url;
                              }}
                            />
                          </div>
                        </div>

                        <hr className="border-[#f0ece2]" />

                        {/* Account Access Credentials */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">Login Access Credentials</p>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Email (Access Login) *
                              <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. chief.kola@olubadan.org" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Access Password (Temporary) *
                              <input name="password" type="password" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Defaults to 'change-this-password'" />
                            </label>
                          </div>
                        </div>

                        <hr className="border-[#f0ece2]" />

                        {/* 1. Personal Information */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">1. Personal Information</p>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Representative Legal Name *
                              <input name="fullName" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Kola Kazeem" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Date of Birth (DD/MM/YYYY)
                              <input name="dateOfBirth" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. 15/03/1965" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Family Compound
                              <input name="familyCompound" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Aleshinloye Compound" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Family Village
                              <input name="familyVillage" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Oja-Oba" />
                            </label>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2 mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Local Government Area
                              <input name="localGovernment" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Ibadan North" />
                            </label>
                          </div>
                        </div>

                        <hr className="border-[#f0ece2]" />

                        {/* 2. Contact Details */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">2. Contact Details</p>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Phone Number
                              <input name="phone" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. +2348033333333" />
                            </label>
                          </div>
                        </div>

                        <hr className="border-[#f0ece2]" />

                        {/* 3. Qualifications */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">3. Qualifications</p>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Highest Qualification
                              <input name="highestQualification" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. B.Sc. Economics" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Field / Specialization
                              <input name="fieldSpecialization" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Public Administration" />
                            </label>
                          </div>
                          <div className="mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Other Qualifications
                              <input name="otherQualifications" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. PMP, Member NIM" />
                            </label>
                          </div>
                        </div>

                        <hr className="border-[#f0ece2]" />

                        {/* 4. Occupation & Leadership */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">4. Occupation &amp; Leadership</p>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Current Occupation / Profession
                              <input name="currentOccupation" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Civil Engineer" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Representative Position Title *
                              <input name="positionTitle" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Osi Olubadan Secretariat" />
                            </label>
                          </div>
                          <div className="grid gap-4 md:grid-cols-3 mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Line Type *
                              <select
                                name="line"
                                value={registerLine}
                                onChange={(e) => setRegisterLine(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                              >
                                <option value="ADVISORY_COUNCIL">Olubadan Advisory Council members</option>
                                <option value="OTUN">Otun Olubadan Chieftaincy line</option>
                                <option value="BALOGUN">Balogun chieftaincy line</option>
                                <option value="IYALODE">Iyalode Chieftaincy line</option>
                                <option value="MOGAJI">Mogajis in Ibadanland</option>
                                <option value="BAALE">Baales in Ibadanland</option>
                                <option value="HONORARY">Honorary Chieftaincy</option>
                              </select>
                            </label>
                            
                            {/* Conditional Title Display - ONLY for BAALE */}
                            {registerLine === "BAALE" ? (
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                                Chieftaincy Title *
                                <select name="title" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                                  <option value="His Royal Highness">His Royal Highness</option>
                                  <option value="Part Two (Baale)">Part Two (Baale)</option>
                                  <option value="Part Three (Baale)">Part Three (Baale)</option>
                                </select>
                              </label>
                            ) : null}

                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Full Traditional Title Name *
                              <input name="fullTraditionalName" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Oba Abiodun Kola-Daisi" />
                            </label>
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2 mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Current Position (Clan Head / Representative) *
                              <input name="currentPosition" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Osi Olubadan of Ibadanland" />
                            </label>
                          </div>

                          {/* Conditional Installation & Promotion Years */}
                          <div className="grid gap-4 md:grid-cols-2 mt-4">
                            {/* Years Installed as Magaji - Show for ADVISORY_COUNCIL, OTUN, BALOGUN, MOGAJI */}
                            {["ADVISORY_COUNCIL", "OTUN", "BALOGUN", "MOGAJI"].includes(registerLine) ? (
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                                Year Installed as Mogaji *
                                <input name="yearInstalledAsMagaji" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. 2015" />
                              </label>
                            ) : null}

                            {/* Years Installed as Baale - Show for BAALE */}
                            {registerLine === "BAALE" ? (
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                                Year Installed as Baale *
                                <input name="yearInstalled" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. 2018" />
                              </label>
                            ) : null}

                            {/* Year Installed - Show for IYALODE, HONORARY */}
                            {["IYALODE", "HONORARY"].includes(registerLine) ? (
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                                Year Installed *
                                <input name="yearInstalled" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. 2020" />
                              </label>
                            ) : null}

                            {/* Year Promoted to Chieftaincy Line - Show for ADVISORY_COUNCIL, OTUN, BALOGUN */}
                            {["ADVISORY_COUNCIL", "OTUN", "BALOGUN"].includes(registerLine) ? (
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                                Year Promoted in to Chieftaincy Line *
                                <input name="yearPromotedLine" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. 2022" />
                              </label>
                            ) : null}
                          </div>
                        </div>

                        <hr className="border-[#f0ece2]" />

                        {/* Certificate Upload section */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">
                            Support Documentation {["MOGAJI", "BAALE"].includes(registerLine) ? " * (Required)" : " (Optional)"}
                          </p>
                          <div className="max-w-md">
                            <FileUploadWidget
                              label="Installation Certificate (PDF, Image)"
                              accept="application/pdf,image/*"
                              buttonText="Upload Certificate"
                              onUploadComplete={(url) => setAdminChiefCertificateUrl(url)}
                            />
                          </div>
                        </div>

                        <hr className="border-[#f0ece2]" />

                        {/* 5. Additional Information & History */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">5. History &amp; Biography Dossier</p>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Languages Spoken
                              <input name="languagesSpoken" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Yoruba, English" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Key Areas of Expertise / Interest
                              <input name="expertiseInterest" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="e.g. Agriculture, Heritage" />
                            </label>
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2 mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Notable Achievements (newline separated) *
                              <textarea name="achievements" required className="mt-2 min-h-20 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none" placeholder="Council representation&#10;Community mediation" />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Palace Responsibilities (newline separated) *
                              <textarea name="palaceResponsibilities" required className="mt-2 min-h-20 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none" placeholder="Palace advisory duties&#10;Line representation" />
                            </label>
                          </div>

                          <div className="mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Biography *
                              <textarea name="biography" required className="mt-2 min-h-20 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none" placeholder="Enter short bio details..." />
                            </label>
                          </div>
                          <div className="mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                              Family History &amp; Ancestral Deeds *
                              <textarea name="familyHistory" required className="mt-2 min-h-20 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none" placeholder="Enter compound deeds, lineages background..." />
                            </label>
                          </div>
                        </div>

                        <button
                          disabled={actionLoading}
                          className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-[#d6b15b]/20"
                        >
                          {actionLoading ? "Registering..." : "Submit Record & Account"}
                        </button>
                      </form>
                    ) : null}

                    {/* Pending review list */}
                    <div className="rounded-2xl border border-[#e8e3da] bg-white shadow-sm overflow-hidden">
                      <div className="bg-[#faf8f3] border-b border-[#f0ece2] px-6 py-4 flex items-center justify-between">
                        <h3 className={`${playfair.className} text-xl font-bold`}>Pedigree Records Approval Queue</h3>
                        <span className="text-xs bg-[#d6b15b]/20 text-[#9b762f] px-2.5 py-1 rounded-full border border-[#d6b15b]/30 font-bold">{pendingProfiles.length} Pending</span>
                      </div>
                      <div className="divide-y divide-[#f4f1ea]">
                        {pendingProfiles.length > 0 ? (
                          pendingProfiles.map((p) => (
                            <div key={p.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-[#faf8f3] transition">
                              <div>
                                <h4 className="font-bold text-base">{p.fullTraditionalName}</h4>
                                <p className="text-xs text-[#9b762f] font-semibold mt-0.5">{p.currentPosition} · {lineLabels[p.line.toLowerCase() as LineKey] || p.line}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Submitted by: {p.user?.name || p.user?.email}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => { setSelectedProfile(p); setReviewNote(p.reviewNote || ""); }}
                                  className="rounded-lg border border-[#e8e3da] bg-[#f4f1ea] px-3.5 py-2 text-xs font-bold hover:border-[#d6b15b] hover:text-[#9b762f] transition"
                                >
                                  Review Dossier
                                </button>
                                <button
                                  onClick={() => handleDeleteProfile(p.id)}
                                  className="rounded-lg border border-red-200 bg-red-50 text-red-600 px-3.5 py-2 text-xs font-bold hover:bg-red-100 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500 font-medium">No chieftaincy profiles pending review. All ancestral records verified!</div>
                        )}
                      </div>
                    </div>

                    {/* Approved list */}
                    <div className="rounded-2xl border border-[#e8e3da] bg-white shadow-sm overflow-hidden">
                      <div className="bg-[#faf8f3] border-b border-[#f0ece2] px-6 py-4">
                        <h3 className={`${playfair.className} text-xl font-bold`}>Verified & Published Traditional Representatives</h3>
                      </div>
                      <div className="divide-y divide-[#f4f1ea]">
                        {verifiedProfiles.length > 0 ? (
                          verifiedProfiles.map((p) => (
                            <div key={p.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-[#faf8f3] transition">
                              <div>
                                <h4 className="font-bold text-base">{p.fullTraditionalName}</h4>
                                <p className="text-xs text-green-700 font-bold mt-0.5">{p.currentPosition} · {lineLabels[p.line.toLowerCase() as LineKey] || p.line}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Account email: {p.user?.email}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => { setSelectedProfile(p); setReviewNote(p.reviewNote || ""); }}
                                  className="rounded-lg border border-[#e8e3da] bg-[#f4f1ea] px-3.5 py-2 text-xs font-bold hover:border-[#d6b15b] hover:text-[#9b762f] transition"
                                >
                                  Update Dossier
                                </button>
                                <button
                                  onClick={() => handleDeleteProfile(p.id)}
                                  className="rounded-lg border border-red-200 bg-red-50 text-red-650 px-3.5 py-2 text-xs font-bold hover:bg-red-100 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500 font-medium">No verified profiles in database.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. NEWS MANAGEMENT */}
                {activeNav === "News Management" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 border border-[#e8e3da] rounded-2xl shadow-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#191714]">Palace Chronicles Grid</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Publish bulletins, cultural chronicles, and administrative releases direct to home page.</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsAddingNews(!isAddingNews);
                          setEditingNews(null);
                        }}
                        className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 border border-[#d6b15b]/20"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {isAddingNews ? "Cancel Bulletin" : "Publish News"}
                      </button>
                    </div>

                    {(isAddingNews || editingNews) && (
                      <form onSubmit={handleSaveNews} className="bg-white rounded-2xl border border-[#e8e3da] p-6 shadow-sm space-y-4">
                        <h3 className={`${playfair.className} text-xl font-bold border-b border-[#f0ece2] pb-3 text-[#191714]`}>
                          {editingNews ? "Edit News Bulletin" : "Publish Official News Bulletin"}
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Headline Title
                            <input name="headline" required defaultValue={editingNews?.headline || ""} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Olubadan signs memorandum of development..." />
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Subtitle / Summary
                            <input name="subtitle" required defaultValue={editingNews?.subtitle || ""} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="New digital resource center slated for Ibadan central library." />
                          </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Category
                            <select name="category" defaultValue={editingNews?.category || "PALACE_NEWS"} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="PALACE_NEWS">Palace News</option>
                              <option value="TRADITIONAL_COUNCIL">Traditional Council</option>
                              <option value="CULTURAL_EVENTS">Cultural Events</option>
                              <option value="GOVERNMENT_RELATIONS">Government Relations</option>
                            </select>
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Publish Status
                            <select name="status" defaultValue={editingNews?.status || "PUBLISHED"} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="PUBLISHED">Published (Live)</option>
                              <option value="DRAFT">Draft</option>
                              <option value="ARCHIVED">Archived</option>
                            </select>
                          </label>
                          <div className="space-y-1">
                            <input type="hidden" id="newsFeaturedImageUrl" name="featuredImageUrl" defaultValue={editingNews?.featuredImageUrl || "/royal_palace.jpeg"} />
                            <FileUploadWidget
                              label="Featured Image"
                              accept="image/*"
                              defaultValue={editingNews?.featuredImageUrl || "/royal_palace.jpeg"}
                              onUploadComplete={(url) => {
                                const input = document.getElementById("newsFeaturedImageUrl") as HTMLInputElement;
                                if (input) input.value = url;
                              }}
                            />
                          </div>
                        </div>

                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Bulletin Body Content
                          <textarea name="content" required defaultValue={editingNews?.content || ""} className="mt-2 min-h-32 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none" placeholder="Type verified news details here..." />
                        </label>

                        <button
                          disabled={actionLoading}
                          className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-[#d6b15b]/20"
                        >
                          {actionLoading ? "Saving..." : "Save News Bulletin"}
                        </button>
                      </form>
                    )}

                    {/* News List */}
                    <div className="rounded-2xl border border-[#e8e3da] bg-white shadow-sm overflow-hidden">
                      <div className="bg-[#faf8f3] border-b border-[#f0ece2] px-6 py-4">
                        <h3 className={`${playfair.className} text-xl font-bold`}>Palace Bulletins Database</h3>
                      </div>
                      <div className="divide-y divide-[#f4f1ea]">
                        {newsList.length > 0 ? (
                          newsList.map((item) => (
                            <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#faf8f3] transition">
                              <div className="max-w-2xl">
                                <span className="inline-block rounded-md bg-gray-100 border border-gray-200 px-2 py-0.5 text-[10px] font-bold text-gray-500 uppercase">{item.category}</span>
                                <h4 className="font-bold text-base mt-2">{item.headline}</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Status: <strong className={item.status === "PUBLISHED" ? "text-green-600" : "text-amber-600"}>{item.status}</strong> · {new Date(item.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div className="flex gap-2 shrink-0">
                                <button
                                  onClick={() => { setEditingNews(item); setIsAddingNews(false); }}
                                  className="p-2 rounded-lg border border-[#e8e3da] bg-[#f4f1ea] hover:border-[#d6b15b] text-[#191714] hover:text-[#9b762f] transition"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteNews(item.id)}
                                  className="p-2 rounded-lg border border-red-200 bg-red-50 text-red-650 hover:bg-red-100 transition"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400 font-semibold">No news bulletins found in the database.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. ANNOUNCEMENTS */}
                {activeNav === "Announcements" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 border border-[#e8e3da] rounded-2xl shadow-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#191714]">Official Palace Alerts</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Post schedules, invitations, and notices for Mogajis, representatives, and assemblies.</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsAddingAnn(!isAddingAnn);
                          setEditingAnn(null);
                        }}
                        className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 border border-[#d6b15b]/20"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {isAddingAnn ? "Cancel Alert" : "Add Announcement"}
                      </button>
                    </div>

                    {(isAddingAnn || editingAnn) && (
                      <form onSubmit={handleSaveAnn} className="bg-white rounded-2xl border border-[#e8e3da] p-6 shadow-sm space-y-4">
                        <h3 className={`${playfair.className} text-xl font-bold border-b border-[#f0ece2] pb-3 text-[#191714]`}>
                          {editingAnn ? "Edit Announcement" : "Create Central Announcement"}
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Announcement Title
                            <input name="title" required defaultValue={editingAnn?.title || ""} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Coronation Banquet Schedule" />
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Alert Status
                            <select name="status" defaultValue={editingAnn?.status || "PUBLISHED"} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="PUBLISHED">Published (Live)</option>
                              <option value="DRAFT">Draft</option>
                              <option value="ARCHIVED">Archived</option>
                            </select>
                          </label>
                        </div>

                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Alert Body Details
                          <textarea name="content" required defaultValue={editingAnn?.content || ""} className="mt-2 min-h-24 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none" placeholder="Enter complete alert contents..." />
                        </label>

                        <button
                          disabled={actionLoading}
                          className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-[#d6b15b]/20"
                        >
                          {actionLoading ? "Saving..." : "Save Announcement"}
                        </button>
                      </form>
                    )}

                    {/* List Announcements */}
                    <div className="rounded-2xl border border-[#e8e3da] bg-white shadow-sm overflow-hidden">
                      <div className="bg-[#faf8f3] border-b border-[#f0ece2] px-6 py-4">
                        <h3 className={`${playfair.className} text-xl font-bold`}>Palace Alerts Database</h3>
                      </div>
                      <div className="divide-y divide-[#f4f1ea]">
                        {announcementsList.length > 0 ? (
                          announcementsList.map((ann) => (
                            <div key={ann.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#faf8f3] transition">
                              <div className="max-w-2xl">
                                <h4 className="font-bold text-base">{ann.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ann.content}</p>
                                <p className="text-[10px] text-gray-400 mt-2">Status: <strong className={ann.status === "PUBLISHED" ? "text-green-600" : "text-amber-600"}>{ann.status}</strong> · {new Date(ann.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div className="flex gap-2 shrink-0">
                                <button
                                  onClick={() => { setEditingAnn(ann); setIsAddingAnn(false); }}
                                  className="p-2 rounded-lg border border-[#e8e3da] bg-[#f4f1ea] hover:border-[#d6b15b] text-[#191714] hover:text-[#9b762f] transition"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAnn(ann.id)}
                                  className="p-2 rounded-lg border border-red-200 bg-red-50 text-red-650 hover:bg-red-100 transition"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400 font-semibold">No announcements found.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. GALLERY MANAGEMENT */}
                {activeNav === "Gallery Management" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 border border-[#e8e3da] rounded-2xl shadow-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#191714]">Digital Chieftaincy Archive</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Preserve coronation, assemblies, historical documents, and cultural festival pictures.</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsAddingGallery(!isAddingGallery);
                          setEditingGallery(null);
                        }}
                        className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 border border-[#d6b15b]/20"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {isAddingGallery ? "Cancel Archive" : "Upload File"}
                      </button>
                    </div>

                    {(isAddingGallery || editingGallery) && (
                      <form onSubmit={handleSaveGallery} className="bg-white rounded-2xl border border-[#e8e3da] p-6 shadow-sm space-y-4">
                        <h3 className={`${playfair.className} text-xl font-bold border-b border-[#f0ece2] pb-3 text-[#191714]`}>
                          {editingGallery ? "Edit Archive File" : "Upload Archive File to Gallery"}
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Archive Item Title
                            <input name="title" required defaultValue={editingGallery?.title || ""} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Oba Coronation Banquets Ceremony" />
                          </label>
                          <div className="space-y-1">
                            <input type="hidden" id="galleryAssetUrl" name="url" defaultValue={editingGallery?.url || "/royal_palace.jpeg"} required />
                            <FileUploadWidget
                              label="Asset File (Image/Video)"
                              accept="image/*,video/*"
                              defaultValue={editingGallery?.url || "/royal_palace.jpeg"}
                              onUploadComplete={(url) => {
                                const input = document.getElementById("galleryAssetUrl") as HTMLInputElement;
                                if (input) input.value = url;
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Archive Category
                            <select name="category" defaultValue={editingGallery?.category || "PALACE_EVENTS"} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="CORONATION">Coronation</option>
                              <option value="FESTIVALS">Festivals</option>
                              <option value="PALACE_EVENTS">Palace Events</option>
                              <option value="HISTORICAL_ARCHIVES">Historical Archives</option>
                            </select>
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Publishing Status
                            <select name="status" defaultValue={editingGallery?.status || "PUBLISHED"} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="PUBLISHED">Published (Live)</option>
                              <option value="DRAFT">Draft</option>
                              <option value="ARCHIVED">Archived</option>
                            </select>
                          </label>
                        </div>

                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Description
                          <input name="description" defaultValue={editingGallery?.description || ""} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Brief description of the historic event..." />
                        </label>

                        <button
                          disabled={actionLoading}
                          className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-[#d6b15b]/20"
                        >
                          {actionLoading ? "Saving..." : "Save Archive Item"}
                        </button>
                      </form>
                    )}

                    {/* Gallery Grid */}
                    <div className="bg-white border border-[#e8e3da] rounded-2xl shadow-sm overflow-hidden p-6">
                      <h3 className={`${playfair.className} text-xl font-bold mb-4 border-b border-[#f0ece2] pb-3`}>Digital Archives Database</h3>
                      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {galleryList.length > 0 ? (
                          galleryList.map((item) => (
                            <div key={item.id} className="group relative rounded-xl border border-[#e8e3da] bg-[#faf8f3] overflow-hidden flex flex-col justify-between">
                              <div className="relative h-44 bg-gray-200">
                                <Image src={item.url} alt={item.title} fill className="object-cover" />
                                <div className="absolute top-2 left-2 z-10 bg-black/60 text-[#d6b15b] border border-white/10 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                                  {item.category}
                                </div>
                              </div>
                              <div className="p-3.5 flex-1 flex flex-col justify-between">
                                <div>
                                  <h4 className="font-bold text-sm text-[#191714] leading-snug">{item.title}</h4>
                                  <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{item.description || "No description provided."}</p>
                                </div>
                                <div className="mt-3 pt-2.5 border-t border-[#f0ece2] flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                                  <span>{item.status}</span>
                                  <div className="flex gap-1">
                                    <button onClick={() => { setEditingGallery(item); setIsAddingGallery(false); }} className="text-gray-600 hover:text-[#9b762f] p-1 transition"><Edit className="h-3.5 w-3.5" /></button>
                                    <button onClick={() => handleDeleteGallery(item.id)} className="text-red-500 hover:text-red-700 p-1 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400 font-semibold col-span-full">No archive items found.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. RADIO & STREAMS */}
                {activeNav === "Radio & Streams" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {streamsList.map((stream) => (
                      <div key={stream.id} className="bg-white border border-[#e8e3da] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                        <div className="bg-[#191714] px-5 py-4 flex items-center justify-between border-b border-white/8 text-white">
                          <div className="flex items-center gap-2">
                            {stream.type === "RADIO" ? <Radio className="h-5 w-5 text-[#d6b15b]" /> : <Video className="h-5 w-5 text-[#d6b15b]" />}
                            <h3 className={`${playfair.className} font-bold text-base`}>{stream.type} FEED</h3>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                            stream.isActive ? "bg-green-400/10 text-green-400 border-green-400/20" : "bg-white/5 text-white/40 border-white/8"
                          }`}>
                            {stream.isActive ? "Active" : "Disabled"}
                          </span>
                        </div>
                        <form onSubmit={(e) => handleSaveStream(e, stream.type)} className="p-6 space-y-4 flex-1">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Feed Title
                            <input name="title" required defaultValue={stream.title} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" />
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Stream / Zeno URL
                            <input name="streamUrl" required defaultValue={stream.streamUrl} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" />
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Embed description
                            <input name="description" defaultValue={stream.description || ""} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" />
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Toggle Status
                            <select name="isActive" defaultValue={stream.isActive ? "true" : "false"} className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="true">Enable stream live</option>
                              <option value="false">Disable stream</option>
                            </select>
                          </label>
                          <button
                            disabled={actionLoading}
                            className="w-full rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-[#d6b15b]/20"
                          >
                            {actionLoading ? "Updating..." : "Update Feed settings"}
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. USER MANAGEMENT */}
                {activeNav === "User Management" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 border border-[#e8e3da] rounded-2xl shadow-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#191714]">Console Credentials Center</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Control login accounts for palace secretariat workers, advisors, and admin roles.</p>
                      </div>
                      <button
                        onClick={() => setIsAddingUser(!isAddingUser)}
                        className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 border border-[#d6b15b]/20"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {isAddingUser ? "Close Form" : "Create User"}
                      </button>
                    </div>

                    {isAddingUser && (
                      <form onSubmit={handleCreateUser} className="bg-white rounded-2xl border border-[#e8e3da] p-6 shadow-sm space-y-4">
                        <h3 className={`${playfair.className} text-xl font-bold border-b border-[#f0ece2] pb-3 text-[#191714]`}>Create Representative Console Account</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Full Name
                            <input name="name" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Abiodun Kola-Daisi" />
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Email (Sign in username)
                            <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="chief@olubadan-palace.local" />
                          </label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Phone
                            <input name="phone" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="+2348000000000" />
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Sign in Password
                            <input name="password" type="password" required className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Password (min 8 chars)" />
                          </label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Access Role
                            <select name="role" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="LINE_REPRESENTATIVE">Line Representative</option>
                              <option value="SUPER_ADMIN">Palace Super Admin</option>
                            </select>
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Designated Line (Optional)
                            <select name="line" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition">
                              <option value="">None / Not Applicable</option>
                              <option value="ADVISORY_COUNCIL">Olubadan Advisory Council members</option>
                              <option value="OTUN">Otun Olubadan Chieftaincy line</option>
                              <option value="BALOGUN">Balogun chieftaincy line</option>
                              <option value="IYALODE">Iyalode Chieftaincy line</option>
                              <option value="MOGAJI">Mogajis in Ibadanland</option>
                              <option value="BAALE">Baales in Ibadanland</option>
                              <option value="HONORARY">Honorary Chieftaincy</option>
                            </select>
                          </label>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Palace Position Title (Optional)
                            <input name="positionTitle" className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition" placeholder="Representative, Secretary" />
                          </label>
                        </div>
                        <button
                          disabled={actionLoading}
                          className="rounded-xl bg-[#191714] text-[#d6b15b] hover:bg-[#2a2520] px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-[#d6b15b]/20"
                        >
                          {actionLoading ? "Creating..." : "Save Account"}
                        </button>
                      </form>
                    )}

                    {/* Users list */}
                    <div className="bg-white border border-[#e8e3da] rounded-2xl shadow-sm overflow-hidden">
                      <div className="bg-[#faf8f3] border-b border-[#f0ece2] px-6 py-4">
                        <h3 className={`${playfair.className} text-xl font-bold`}>Authorized Console Accounts</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-[#e8e3da] font-bold text-gray-500 uppercase text-[10px] tracking-wider">
                              <th className="p-4">Full Name</th>
                              <th className="p-4">Email</th>
                              <th className="p-4">Phone</th>
                              <th className="p-4">Access Role</th>
                              <th className="p-4">Designated Line</th>
                              <th className="p-4">Title</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#f4f1ea] font-medium text-gray-700">
                            {usersList.map((user) => (
                              <tr key={user.id} className="hover:bg-[#faf8f3] transition">
                                <td className="p-4 text-gray-950 font-bold">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 text-xs font-mono">{user.phone || "—"}</td>
                                <td className="p-4 text-xs">
                                  <span className={`px-2 py-0.5 rounded font-bold ${
                                    user.role === "SUPER_ADMIN" ? "bg-red-50 text-red-700 border border-red-200" : "bg-[#faf8f3] text-gray-600 border border-gray-250"
                                  }`}>
                                    {user.role}
                                  </span>
                                </td>
                                <td className="p-4 text-xs">{user.line || "—"}</td>
                                <td className="p-4 text-xs">{user.positionTitle || "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. AUDIT LOGS */}
                {activeNav === "Audit Logs" && (
                  <div className="rounded-2xl border border-[#e8e3da] bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-[#f0ece2] px-6 py-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#191714]">
                        <Archive className="h-4 w-4 text-[#d6b15b]" />
                      </div>
                      <h3 className={`${playfair.className} text-xl font-bold`}>Palace Administrative Audit Logs</h3>
                    </div>
                    <div className="p-6 space-y-2.5 font-mono text-[11px] max-h-[60vh] overflow-y-auto">
                      {auditLogs.length > 0 ? (
                        auditLogs.map((log) => (
                          <div key={log.id} className="rounded-xl bg-[#191714]/3 border border-[#e8e3da] p-3 flex flex-col md:flex-row justify-between gap-3">
                            <div>
                              <span className="text-[#9b762f] font-bold">[{log.action}]</span>
                              <span className="text-[#191714] font-bold ml-1"> Entity: {log.entity}</span>
                              {log.entityId && <span className="text-gray-400 text-[10px]"> (ID: {log.entityId})</span>}
                              <span className="text-gray-500 ml-1">
                                {log.actor ? ` — Done by: ${log.actor.name} (${log.actor.email})` : " — System operation"}
                              </span>
                            </div>
                            <span className="text-gray-400 shrink-0 font-semibold">{new Date(log.createdAt).toLocaleString()}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-400 font-semibold">No audit logs found.</div>
                      )}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </div>

      {/* Review & Update Modal for Chieftaincy Applicant */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative max-h-[88vh] overflow-y-auto border border-[#e8e3da]"
          >
            {/* Modal header */}
            <div className="bg-[#191714] rounded-t-2xl px-6 py-5 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(214,177,91,0.08),transparent_60%)] rounded-t-2xl" />
              <button
                onClick={() => { setSelectedProfile(null); setReviewNote(""); }}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d6b15b]">Profile Review</p>
              <h2 className={`${playfair.className} text-2xl font-bold text-white mt-1 pr-8`}>
                Review Chieftaincy Representative
              </h2>
            </div>

            <div className="p-6 space-y-5 text-sm text-gray-700">
              {/* 1. Personal Information */}
              <div className="border-b border-[#f0ece2] pb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">1. Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Representative Legal Name</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.user?.name || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Date of Birth</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.dateOfBirth || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Family Compound</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.familyCompound || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Family Village</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.familyVillage || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Local Government Area</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.localGovernment || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 2. Contact Details */}
              <div className="border-b border-[#f0ece2] pb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">2. Contact Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Phone Number</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.user?.phone || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Email Address</span>
                    <p className="text-gray-700 break-all text-sm mt-1">{selectedProfile.user?.email || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 3. Qualifications */}
              <div className="border-b border-[#f0ece2] pb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">3. Qualifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Highest Qualification</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.highestQualification || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Field / Specialization</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.fieldSpecialization || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Other Qualifications</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.otherQualifications || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 4. Occupation & Leadership */}
              <div className="border-b border-[#f0ece2] pb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">4. Occupation &amp; Leadership</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Current Occupation</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.currentOccupation || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Year Installed as Baale</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.yearInstalled || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Chieftaincy Line</span>
                    <span className="inline-flex rounded-lg bg-[#f4f1ea] border border-[#e8e3da] px-2 py-0.5 text-xs font-bold text-[#191714] mt-1">
                      {lineLabels[selectedProfile.line.toLowerCase() as LineKey] || selectedProfile.line}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Chieftaincy Title</span>
                    <p className="mt-1 text-[#191714] font-semibold">{selectedProfile.title || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Palace Position Title</span>
                    <p className="mt-1 text-[#191714] font-semibold">{selectedProfile.currentPosition || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Full Traditional Title Name</span>
                    <p className="mt-1 text-[#191714] font-semibold">{selectedProfile.fullTraditionalName || "—"}</p>
                  </div>
                </div>
              </div>

              {/* 5. Additional Information */}
              <div className="pb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">5. Additional Information</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Languages Spoken</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.languagesSpoken || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Key Areas of Expertise / Interest</span>
                    <p className="font-bold text-[#191714] text-sm mt-1">{selectedProfile.expertiseInterest || "—"}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Notable Achievements</span>
                    <p className="text-xs text-gray-650 bg-[#faf8f3] p-3 rounded-xl border border-[#e8e3da] font-medium leading-relaxed mt-1 whitespace-pre-line">{selectedProfile.achievements || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Palace Responsibilities</span>
                    <p className="text-xs text-gray-650 bg-[#faf8f3] p-3 rounded-xl border border-[#e8e3da] font-medium leading-relaxed mt-1 whitespace-pre-line">{selectedProfile.palaceResponsibilities || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Biography Background</span>
                    <p className="text-xs text-gray-650 bg-[#faf8f3] p-3 rounded-xl border border-[#e8e3da] font-medium leading-relaxed mt-1">{selectedProfile.biography || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Family Compound / Village History</span>
                    <p className="text-xs text-gray-650 bg-[#fdf9f0] p-3 rounded-xl border border-[#d6b15b]/20 font-medium leading-relaxed mt-1">{selectedProfile.familyHistory || "—"}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0ece2]">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Palace Admin Feedback Review Comments
                  <textarea
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-3 font-normal text-xs min-h-20 focus:border-[#d6b15b] focus:outline-none focus:ring-1 focus:ring-[#d6b15b]/20 transition"
                    placeholder="Provide lineage verification notes, requested corrections, or approval remarks here..."
                  />
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 pt-2">
                <button onClick={() => handleUpdateProfileStatus(selectedProfile.id, "PUBLISHED")} className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 transition">
                  <CheckCircle2 className="h-4 w-4" /> Approve & Publish
                </button>
                <button onClick={() => handleUpdateProfileStatus(selectedProfile.id, "REQUEST_CHANGES")} className="bg-[#191714] hover:bg-[#2a2520] text-[#d6b15b] rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 transition border border-[#d6b15b]/20">
                  <AlertCircle className="h-4 w-4" /> Request Changes
                </button>
                <button onClick={() => handleUpdateProfileStatus(selectedProfile.id, "REJECTED")} className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 transition">
                  <X className="h-4 w-4" /> Reject Profile
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
