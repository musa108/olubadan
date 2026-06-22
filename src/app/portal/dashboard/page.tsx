"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FileUploadWidget from "@/components/FileUploadWidget";
import { signOut, useSession } from "next-auth/react";
import {
  ShieldAlert,
  CheckCircle2,
  Clock3,
  FileText,
  User,
  Mail,
  Phone,
  BookOpen,
  Award,
  Eye,
  Radio,
  Video,
  Bell,
  Home,
  Crown,
  LogOut,
  PenLine,
  X,
  MapPin,
  GraduationCap,
  Briefcase,
  Languages,
  Star,
} from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { LineKey, lineLabels } from "@/lib/palace-data";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type ProfileStatus =
  | "PENDING_REVIEW"
  | "PUBLISHED"
  | "REQUEST_CHANGES"
  | "REJECTED"
  | "Pending Review"
  | "Published"
  | "Request Changes"
  | "Rejected";

type DashboardProfile = {
  fullName: string;
  email: string;
  phone: string;
  line: LineKey;
  title: string;
  positionTitle?: string;
  biography: string;
  familyHistory: string;
  achievements: string[];
  status: ProfileStatus;
  reviewNotes?: string;
  profilePictureUrl?: string;
  // Compact Bio Data Fields
  dateOfBirth?: string;
  familyCompound?: string;
  familyVillage?: string;
  localGovernment?: string;
  highestQualification?: string;
  fieldSpecialization?: string;
  otherQualifications?: string;
  currentOccupation?: string;
  yearInstalled?: string;
  yearInstalledAsMagaji?: string;
  yearPromotedLine?: string;
  languagesSpoken?: string;
  expertiseInterest?: string;
  media?: { id: string; url: string; type: string }[];
  documents?: { id: string; title: string; url: string }[];
};

export default function RepresentativeDashboard() {
  const { data: session, status: sessionStatus } = useSession();

  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [dashboardCertificateUrl, setDashboardCertificateUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [liveAnnouncements, setLiveAnnouncements] = useState<{ id: string; title: string; createdAt: string; content: string }[]>([]);
  const [liveStreams, setLiveStreams] = useState<{ id: string; type: string; title: string; isActive: boolean; description?: string | null }[]>([]);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/profile");
        const result = await response.json();

        if (!response.ok) {
          setError(result?.message || "Unable to load profile.");
          setProfile(null);
          // No profile yet — open modal for first submission
          setIsModalOpen(true);
        } else {
          const p = result.profile;
          const mapped: DashboardProfile = {
            fullName: p.user?.name ?? "",
            email: p.user?.email ?? "",
            phone: p.user?.phone ?? "",
            line: (p.line ?? "").toLowerCase() as LineKey,
            title: p.title,
            positionTitle: p.user?.positionTitle ?? "Chieftaincy Representative",
            biography: p.biography,
            familyHistory: p.familyHistory,
            achievements: p.achievements ? p.achievements.split("\n") : [],
            status: p.status,
            reviewNotes: p.reviewNote,
            profilePictureUrl: p.profilePictureUrl ?? "",
            dateOfBirth: p.dateOfBirth ?? "",
            familyCompound: p.familyCompound ?? "",
            familyVillage: p.familyVillage ?? "",
            localGovernment: p.localGovernment ?? "",
            highestQualification: p.highestQualification ?? "",
            fieldSpecialization: p.fieldSpecialization ?? "",
            otherQualifications: p.otherQualifications ?? "",
            currentOccupation: p.currentOccupation ?? "",
            yearInstalled: p.yearInstalled ?? "",
            yearInstalledAsMagaji: p.yearInstalledAsMagaji ?? "",
            yearPromotedLine: p.yearPromotedLine ?? "",
            languagesSpoken: p.languagesSpoken ?? "",
            expertiseInterest: p.expertiseInterest ?? "",
            media: p.media ?? [],
            documents: p.documents ?? [],
          };
          setProfile(mapped);
          setDashboardCertificateUrl(p.documents?.[0]?.url || "");
          // Auto-open modal only for Request Changes or Rejected statuses
          if (p.status === "REQUEST_CHANGES" || p.status === "REJECTED") {
            setIsModalOpen(true);
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Unable to load profile.");
        setProfile(null);
        setIsModalOpen(true);
      }
      setLoading(false);
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements");
        if (response.ok) {
          const result = await response.json();
          setLiveAnnouncements(result.announcements || []);
        }
      } catch (err) {
        console.error("Failed to load announcements:", err);
      }
    };

    const fetchStreams = async () => {
      try {
        const response = await fetch("/api/streams");
        if (response.ok) {
          const result = await response.json();
          setLiveStreams(result.streams || []);
        }
      } catch (err) {
        console.error("Failed to load streams:", err);
      }
    };

    fetchProfile();
    fetchAnnouncements();
    fetchStreams();
  }, [sessionStatus]);

  const getStatusConfig = (s: string) => {
    switch (s) {
      case "Published":
      case "PUBLISHED":
        return { bg: "bg-green-50 border-green-200", text: "text-green-700", icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> };
      case "Pending Review":
      case "PENDING_REVIEW":
        return { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", icon: <Clock3 className="h-5 w-5 text-amber-600" /> };
      case "Request Changes":
      case "REQUEST_CHANGES":
        return { bg: "bg-blue-50 border-blue-200", text: "text-blue-700", icon: <ShieldAlert className="h-5 w-5 text-blue-600" /> };
      case "Rejected":
      case "REJECTED":
        return { bg: "bg-red-50 border-red-200", text: "text-red-700", icon: <ShieldAlert className="h-5 w-5 text-red-600" /> };
      default:
        return { bg: "bg-gray-50 border-gray-200", text: "text-gray-700", icon: <User className="h-5 w-5 text-gray-600" /> };
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const fd = new FormData(e.currentTarget);
    const getString = (key: string) => String(fd.get(key) || "").trim();

    const currentLine = (profile?.line || "baale").toUpperCase();

    // Certificate validation for MOGAJI and BAALE
    if ((currentLine === "MOGAJI" || currentLine === "BAALE") && !dashboardCertificateUrl) {
      setSubmitError("Certificate / Supporting Document upload is required for Mogaji and Baale lines.");
      setIsSubmitting(false);
      return;
    }

    // Determine dynamic title
    let titleVal = "";
    if (currentLine === "BAALE") {
      titleVal = getString("title") || "Part Two (Baale)";
    } else if (currentLine === "MOGAJI") {
      titleVal = "Mogaji";
    } else if (currentLine === "IYALODE") {
      titleVal = "Iyalode";
    } else {
      titleVal = "Chief";
    }

    const documentUrls = dashboardCertificateUrl
      ? [{ title: "Certificate of Installation", url: dashboardCertificateUrl }]
      : [];

    // Determine whether this is a first-time POST or an update PUT
    const isUpdate = !!profile && profile.status !== undefined;

    const payload = {
      fullName: getString("fullName"),
      phone: getString("phone"),
      email: session?.user?.email || "",
      line: currentLine,
      title: titleVal,
      biography: getString("biography"),
      familyHistory: getString("familyHistory"),
      achievements: getString("achievements"),
      profilePictureUrl: getString("profilePictureUrl") || undefined,
      documentUrls,
      // Compact Bio Data
      dateOfBirth: getString("dateOfBirth"),
      familyCompound: getString("familyCompound"),
      familyVillage: getString("familyVillage"),
      localGovernment: getString("localGovernment"),
      highestQualification: getString("highestQualification"),
      fieldSpecialization: getString("fieldSpecialization"),
      otherQualifications: getString("otherQualifications"),
      currentOccupation: getString("currentOccupation"),
      yearInstalled: ["BAALE", "IYALODE", "HONORARY"].includes(currentLine) ? getString("yearInstalled") : "",
      yearInstalledAsMagaji: ["ADVISORY_COUNCIL", "OTUN", "BALOGUN", "MOGAJI"].includes(currentLine) ? getString("yearInstalledAsMagaji") : "",
      yearPromotedLine: ["ADVISORY_COUNCIL", "OTUN", "BALOGUN"].includes(currentLine) ? getString("yearPromotedLine") : "",
      languagesSpoken: getString("languagesSpoken"),
      expertiseInterest: getString("expertiseInterest"),
    };

    const res = await fetch(isUpdate ? "/api/profile" : "/api/profiles", {
      method: isUpdate ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      setSubmitError(errData?.message || "Submission failed. Please check your inputs and try again.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    window.location.reload();
  };

  const statusConfig = profile ? getStatusConfig(profile.status) : null;
  const showEditButton = profile && (
    profile.status === "Published" ||
    profile.status === "PUBLISHED" ||
    profile.status === "Pending Review" ||
    profile.status === "PENDING_REVIEW"
  );

  if (!profile && !loading && !isModalOpen) {
    return (
      <main className={`${poppins.className} min-h-screen bg-[#f4f1ea] flex items-center justify-center px-6`}>
        <div className="rounded-2xl border border-[#e8e3da] bg-white p-10 text-center shadow-sm max-w-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f1ea] border border-[#e8e3da]">
            <Crown className="h-7 w-7 text-[#d6b15b]" />
          </div>
          <p className={`${playfair.className} text-xl font-bold text-[#191714]`}>Representative profile not available</p>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            {error || "Your Palace Admin-managed profile data could not be loaded. Contact Palace Admin for assistance."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/portal" className="rounded-xl bg-[#191714] px-5 py-2.5 text-sm font-bold text-[#d6b15b] hover:bg-[#2a2520] transition border border-[#d6b15b]/20">
              Return to Portal
            </Link>
            <Link href="/" className="rounded-xl border border-[#e8e3da] bg-[#f4f1ea] px-5 py-2.5 text-sm font-semibold text-[#191714] hover:bg-[#ede9e0] transition">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${poppins.className} min-h-screen bg-[#f4f1ea] text-[#191714] pb-20`}>

      {/* Top Welcome Panel */}
      <section className="relative bg-[#191714] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(214,177,91,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-5 px-6 md:px-12 py-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6b15b]/10 border border-[#d6b15b]/20 shrink-0">
              <Crown className="h-6 w-6 text-[#d6b15b]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d6b15b]">
                Title Holder Administration
              </p>
              <h1 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mt-0.5`}>
                Representative Portal Dashboard
              </h1>
              <p className="mt-1 text-xs text-white/40 max-w-2xl">
                Manage your ancestral compound record, view administrative review notes, and monitor palace announcements.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs text-white/60 font-medium">
              <span className="text-white/40">Signed in as </span>
              <strong className="text-white/80">{session?.user?.name ?? session?.user?.email}</strong>
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d6b15b]/10 border border-[#d6b15b]/20 px-4 py-2 text-xs font-semibold text-[#d6b15b] hover:bg-[#d6b15b]/20 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              <Home className="h-3.5 w-3.5" />
              Palace Home
            </Link>
          </div>
        </div>
      </section>

      {/* Bio Data Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-start justify-center px-4 pt-14 pb-6 overflow-y-auto"
          >
            <motion.div
              key="modal-box"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#e8e3da] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-[#191714] text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <h2 className={`${playfair.className} text-2xl font-bold`}>
                    {profile ? "Update Your Bio Data" : "Compact Bio Data Form"}
                  </h2>
                  <p className="text-xs text-white/60 mt-1">
                    {profile
                      ? "Edit your details below. Your record will be re-submitted for Palace Admin review."
                      : "Submit your details. Palace Admin will review before publishing."}
                  </p>
                </div>
                {/* Allow close only if profile already exists and status is not force-required */}
                {profile && (
                  <button
                    type="button"
                    aria-label="Close form"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl p-2 text-white/50 hover:text-white hover:bg-white/10 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[78vh] overflow-y-auto">
                {submitError && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Hidden field for Line to submit correct value */}
                  <input type="hidden" name="line" value={profile?.line ? profile.line.toUpperCase() : "BAALE"} />

                  {/* ── 0. Profile Picture (AT THE TOP) ── */}
                  <div className="space-y-1">
                    <input type="hidden" id="portalProfilePictureUrl" name="profilePictureUrl" defaultValue={profile?.profilePictureUrl || ""} />
                    <FileUploadWidget
                      label="Profile Picture (Formal Royal Attire)"
                      accept="image/*"
                      defaultValue={profile?.profilePictureUrl || ""}
                      onUploadComplete={(url) => {
                        const input = document.getElementById("portalProfilePictureUrl") as HTMLInputElement;
                        if (input) input.value = url;
                      }}
                    />
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Personal Information ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Personal Information
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Full Name *
                        <input name="fullName" required defaultValue={profile?.fullName || session?.user?.name || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Date of Birth (DD/MM/YYYY)
                        <input name="dateOfBirth" placeholder="e.g. 15/03/1965" defaultValue={profile?.dateOfBirth || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Family Compound
                        <input name="familyCompound" placeholder="e.g. Aleshinloye Compound" defaultValue={profile?.familyCompound || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Family Village
                        <input name="familyVillage" placeholder="e.g. Oja-Oba" defaultValue={profile?.familyVillage || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 md:col-span-2">
                        Local Government Area
                        <input name="localGovernment" placeholder="e.g. Ibadan North" defaultValue={profile?.localGovernment || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                    </div>
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Contact Details ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">
                      <Phone className="h-3 w-3" /> Contact Details
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Phone Number
                        <input name="phone" type="tel" placeholder="e.g. 08012345678" defaultValue={profile?.phone || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Email Address
                        <input name="email" type="email" readOnly defaultValue={profile?.email || session?.user?.email || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#f0ece2]/60 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed outline-none" />
                        <span className="text-[10px] text-gray-400 mt-1 block">Managed by palace administration</span>
                      </label>
                    </div>
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Qualifications ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">
                      <GraduationCap className="h-3 w-3" /> Qualifications
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Highest Qualification
                        <input name="highestQualification" placeholder="e.g. B.Sc. Economics" defaultValue={profile?.highestQualification || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Field / Specialization
                        <input name="fieldSpecialization" placeholder="e.g. Public Administration" defaultValue={profile?.fieldSpecialization || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 md:col-span-2">
                        Other Qualifications
                        <input name="otherQualifications" placeholder="e.g. PMP, NIM Member" defaultValue={profile?.otherQualifications || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                    </div>
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Occupation & Leadership ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">
                      <Briefcase className="h-3 w-3" /> Occupation &amp; Leadership
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Current Occupation / Profession
                        <input name="currentOccupation" placeholder="e.g. Civil Engineer" defaultValue={profile?.currentOccupation || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>

                      {/* Chieftaincy Title * (Conditional displaying for baale) */}
                      {profile?.line === "baale" ? (
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Chieftaincy Title *
                          <select name="title" defaultValue={profile?.title || "Part Two (Baale)"}
                            className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none">
                            <option value="His Royal Highness">His Royal Highness</option>
                            <option value="Part Two (Baale)">Part Two (Baale)</option>
                            <option value="Part Three (Baale)">Part Three (Baale)</option>
                          </select>
                        </label>
                      ) : null}


                    </div>

                    {/* Conditional installation / promotion years */}
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      {/* Year Installed as Magaji - Show for advisory-council, otun, balogun, mogaji */}
                      {profile?.line && ["advisory-council", "otun", "balogun", "mogaji"].includes(profile.line) ? (
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Year Installed as Mogaji *
                          <input name="yearInstalledAsMagaji" required defaultValue={profile?.yearInstalledAsMagaji || ""}
                            className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                        </label>
                      ) : null}

                      {/* Year Installed as Baale - Show for baale */}
                      {profile?.line === "baale" ? (
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Year Installed as Baale *
                          <input name="yearInstalled" required defaultValue={profile?.yearInstalled || ""}
                            className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                        </label>
                      ) : null}

                      {/* Year Installed - Show for iyalode, honorary */}
                      {profile?.line && ["iyalode", "honorary"].includes(profile.line) ? (
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Year Installed *
                          <input name="yearInstalled" required defaultValue={profile?.yearInstalled || ""}
                            className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                        </label>
                      ) : null}

                      {/* Year Promoted to Chieftaincy Line - Show for advisory-council, otun, balogun */}
                      {profile?.line && ["advisory-council", "otun", "balogun"].includes(profile.line) ? (
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Year Promoted in to Chieftaincy Line *
                          <input name="yearPromotedLine" required defaultValue={profile?.yearPromotedLine || ""}
                            className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                        </label>
                      ) : null}
                    </div>
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Certificate Upload Section ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">
                      Support Documentation {profile?.line && ["mogaji", "baale"].includes(profile.line) ? " * (Required)" : " (Optional)"}
                    </p>
                    <div className="max-w-md">
                      <FileUploadWidget
                        label="Installation Certificate (PDF, Image)"
                        accept="application/pdf,image/*"
                        defaultValue={dashboardCertificateUrl}
                        onUploadComplete={(url) => setDashboardCertificateUrl(url)}
                      />
                    </div>
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Additional Information ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">
                      <Languages className="h-3 w-3" /> Additional Information
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Languages Spoken
                        <input name="languagesSpoken" placeholder="e.g. Yoruba, English, Hausa" defaultValue={profile?.languagesSpoken || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Expertise / Interests
                        <input name="expertiseInterest" placeholder="e.g. Agriculture, Education" defaultValue={profile?.expertiseInterest || ""}
                          className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                    </div>
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Narrative Fields ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> History &amp; Biography
                    </p>
                    <div className="space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Family Village / Compound History *
                        <textarea name="familyHistory" required defaultValue={profile?.familyHistory || ""}
                          className="mt-2 min-h-24 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Biography (Leadership, activities, years installed, etc.) *
                        <textarea name="biography" required defaultValue={profile?.biography || ""}
                          className="mt-2 min-h-24 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                      </label>
                    </div>
                  </div>

                  <hr className="border-[#f0ece2]" />

                  {/* ── Achievements ── */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3 flex items-center gap-1.5">
                      <Star className="h-3 w-3" /> Achievements
                    </p>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Notable Achievements (one per line)
                      <textarea name="achievements" defaultValue={profile?.achievements?.join("\n") || ""}
                        className="mt-2 min-h-20 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 text-sm focus:border-[#d6b15b] outline-none" />
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#f0ece2]">
                    {profile && (
                      <button type="button" onClick={() => setIsModalOpen(false)}
                        className="rounded-xl border border-[#e8e3da] px-5 py-2.5 text-xs font-bold text-[#191714] hover:bg-[#faf8f3] transition">
                        Cancel
                      </button>
                    )}
                    <button type="submit" disabled={isSubmitting}
                      className="ml-auto rounded-xl bg-[#191714] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#d6b15b] border border-[#d6b15b]/20 hover:bg-[#2a2520] disabled:opacity-60 transition">
                      {isSubmitting
                        ? "Submitting…"
                        : profile
                        ? "Save & Resubmit for Review"
                        : "Submit for Admin Approval"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 bg-white rounded-2xl border border-[#e8e3da] shadow-sm">
            <div className="h-10 w-10 rounded-full border-2 border-[#d6b15b] border-t-transparent animate-spin mb-4" />
            <p className="text-gray-500 font-medium text-sm">Fetching Representative Dossier…</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">

              {/* Status Banner */}
              {profile && statusConfig && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${statusConfig.bg}`}
                >
                  <div className="flex gap-3.5 items-center">
                    <div className="rounded-xl bg-white/80 p-2.5 shadow-sm border border-inherit">
                      {statusConfig.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Submission Status</span>
                      <h3 className={`text-lg font-bold mt-0.5 leading-none ${statusConfig.text}`}>{profile.status}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {profile.reviewNotes && (
                      <div className="md:border-l md:border-inherit md:pl-5 max-w-xl text-sm leading-relaxed font-medium">
                        <span className="text-[10px] font-bold text-gray-400 block mb-0.5 uppercase tracking-wider">Palace Admin Notes:</span>
                        {profile.reviewNotes}
                      </div>
                    )}
                    {showEditButton && (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#191714] px-4 py-2 text-xs font-bold text-[#d6b15b] border border-[#d6b15b]/20 hover:bg-[#2a2520] transition shrink-0"
                      >
                        <PenLine className="h-3.5 w-3.5" />
                        Edit Dossier
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Dossier Grid */}
              {profile && (
                <div className="grid gap-6 md:grid-cols-2">

                  {/* Full Dossier (Private) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-[#e8e3da] rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="bg-[#191714] px-5 py-4 flex items-center gap-3">
                      <FileText className="h-4 w-4 text-[#d6b15b]" />
                      <div>
                        <h2 className="text-sm font-bold text-white">Full Portal Dossier</h2>
                        <span className="text-[10px] text-white/40">(Private View — Admin Managed)</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Full Representative Name</span>
                        <p className="text-sm font-semibold mt-1.5 flex items-center gap-2 text-[#191714]">
                          <User className="h-4 w-4 text-[#9b762f]" />
                          {profile.fullName}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Contact Email</span>
                          <p className="text-xs font-semibold mt-1.5 flex items-center gap-1.5 text-[#191714] break-all">
                            <Mail className="h-3.5 w-3.5 text-[#9b762f] shrink-0" />
                            {profile.email}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Contact Phone</span>
                          <p className="text-xs font-semibold mt-1.5 flex items-center gap-1.5 text-[#191714]">
                            <Phone className="h-3.5 w-3.5 text-[#9b762f] shrink-0" />
                            {profile.phone || "—"}
                          </p>
                        </div>
                      </div>

                      {/* New Bio Data Fields */}
                      {(profile.dateOfBirth || profile.familyCompound || profile.familyVillage || profile.localGovernment) && (
                        <div className="grid grid-cols-2 gap-3 border-t border-[#f0ece2] pt-4">
                          {profile.dateOfBirth && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Date of Birth</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.dateOfBirth}</p>
                            </div>
                          )}
                          {profile.familyCompound && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Family Compound</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.familyCompound}</p>
                            </div>
                          )}
                          {profile.familyVillage && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Family Village</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.familyVillage}</p>
                            </div>
                          )}
                          {profile.localGovernment && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">LGA</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.localGovernment}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {(profile.highestQualification || profile.currentOccupation || profile.yearInstalled) && (
                        <div className="grid grid-cols-2 gap-3 border-t border-[#f0ece2] pt-4">
                          {profile.highestQualification && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Qualification</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.highestQualification}</p>
                            </div>
                          )}
                          {profile.fieldSpecialization && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Field</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.fieldSpecialization}</p>
                            </div>
                          )}
                          {profile.currentOccupation && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Occupation</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.currentOccupation}</p>
                            </div>
                          )}
                          {profile.yearInstalled && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Year Installed</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.yearInstalled}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {(profile.languagesSpoken || profile.expertiseInterest) && (
                        <div className="grid grid-cols-2 gap-3 border-t border-[#f0ece2] pt-4">
                          {profile.languagesSpoken && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Languages</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.languagesSpoken}</p>
                            </div>
                          )}
                          {profile.expertiseInterest && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Expertise</span>
                              <p className="text-xs font-semibold mt-1 text-[#191714]">{profile.expertiseInterest}</p>
                            </div>
                          )}
                        </div>
                      )}



                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Family Compound History</span>
                        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed bg-[#fdf9f0] border border-[#d6b15b]/15 p-3.5 rounded-xl">
                          {profile.familyHistory}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Verified Achievements</span>
                        <ul className="mt-2 space-y-1.5 text-xs text-gray-600">
                          {profile.achievements.map((ach, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <Award className="h-3.5 w-3.5 text-[#9b762f] shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>



                      {profile.documents && profile.documents.length > 0 && (
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Certificates &amp; Attachments</span>
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {profile.documents.map((doc) => (
                              <a
                                key={doc.id}
                                href={doc.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 bg-[#f4f1ea] border border-[#e8e3da] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#191714] hover:bg-[#ede9e0] transition"
                              >
                                <BookOpen className="h-3 w-3 text-[#9b762f]" />
                                {doc.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[#f0ece2] px-5 py-3.5 text-[10px] text-gray-400 flex flex-col gap-1 sm:flex-row sm:justify-between">
                      <span>Last updated: {new Date().toLocaleDateString()}</span>
                      <span>Profile access is strictly managed by palace administration.</span>
                    </div>
                  </motion.div>

                  {/* Public Preview Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border border-[#e8e3da] rounded-2xl overflow-hidden shadow-sm flex flex-col"
                  >
                    <div className="bg-[#f4f1ea] border-b border-[#e8e3da] px-5 py-4 flex items-center gap-3">
                      <Eye className="h-4 w-4 text-[#9b762f]" />
                      <div>
                        <h2 className="text-sm font-bold text-[#191714]">End User View</h2>
                        <span className="text-[10px] text-[#9b762f] font-semibold">(Public Preview)</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1">
                      <p className="text-xs text-gray-500 mb-5 bg-[#fdf9f0] p-3.5 rounded-xl border border-[#d6b15b]/15 leading-relaxed">
                        To preserve privacy, the palace system displays <strong>just a few details</strong> of title holders to end users. Contact info, family deeds, and certificates are strictly hidden from public pages.
                      </p>

                      <div className="rounded-2xl border border-[#e8e3da] overflow-hidden shadow-md max-w-sm mx-auto">
                        <div className="relative h-52 w-full bg-[#191714] flex items-center justify-center">
                          {profile.profilePictureUrl ? (
                            <Image
                              src={profile.profilePictureUrl}
                              alt={profile.fullName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <User className="h-16 w-16 text-white/10" />
                          )}
                          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 z-10">
                            <div>
                              <span className="text-[10px] font-bold text-[#d6b15b] uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-sm">
                                {profile.title}
                              </span>
                              <h4 className={`${playfair.className} text-lg font-bold text-white mt-1 leading-tight`}>
                                {profile.fullName.split(" ").slice(0, 3).join(" ")}
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="text-[10px] font-bold text-[#9b762f] uppercase tracking-wider">{profile.positionTitle || "Chieftaincy Representative"}</p>
                          <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-4">{profile.biography}</p>
                          <div className="mt-4 border-t border-[#f0ece2] pt-3 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              {lineLabels[profile.line]}
                            </span>
                            <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 border border-green-200">
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#f0ece2] px-5 py-3.5 bg-[#191714] text-center">
                      <span className="text-[10px] font-semibold text-[#d6b15b]">Admin-Controlled Security: Active</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">

              {/* Palace Streams Status */}
              <div className="bg-white border border-[#e8e3da] rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#191714] px-5 py-4 flex items-center gap-2">
                  <Radio className="h-4 w-4 text-[#d6b15b]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Palace Streams Status</h3>
                </div>
                <div className="p-4 space-y-3">
                  {liveStreams.length > 0 ? (
                    liveStreams.map((stream) => {
                      const isRadio = stream.type === "RADIO";
                      const Icon = isRadio ? Radio : Video;
                      const label = stream.title;
                      const sub = stream.description || (isRadio ? "Fresh FM Radio Live Feed" : "YouTube Video Feed");
                      const status = stream.isActive ? "Active" : "Disabled";
                      const statusClass = stream.isActive
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-500 border-gray-200";
                      const iconClass = stream.isActive ? (isRadio ? "text-green-500" : "text-amber-500") : "text-gray-400";
                      return (
                        <div key={stream.id} className="p-3 bg-[#faf8f3] border border-[#e8e3da] rounded-xl flex items-center justify-between">
                          <div className="flex gap-2.5 items-center">
                            <Icon className={`h-4 w-4 ${iconClass} ${stream.isActive ? "animate-pulse" : ""}`} />
                            <div>
                              <p className="text-xs font-bold text-[#191714]">{label}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                            </div>
                          </div>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${statusClass}`}>{status}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-xs text-gray-405 font-semibold py-4">No stream feeds configured.</p>
                  )}
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-white border border-[#e8e3da] rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#191714] px-5 py-4 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-[#d6b15b]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Central Announcements</h3>
                </div>
                <div className="divide-y divide-[#f4f1ea]">
                  {liveAnnouncements.length > 0 ? (
                    liveAnnouncements.map((ann) => (
                      <div key={ann.id} className="px-5 py-4">
                        <div className="flex justify-between items-center gap-2 mb-1.5">
                          <h4 className="text-xs font-bold text-[#191714] line-clamp-1">{ann.title}</h4>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            {new Date(ann.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-gray-600">{ann.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-5 text-center text-xs text-gray-400 font-semibold">No recent announcements from the Palace.</p>
                  )}
                </div>
              </div>

            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
