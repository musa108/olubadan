"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FileUploadWidget from "@/components/FileUploadWidget";
import {
  Crown,
  User,
  Mail,
  Phone,
  Lock,
  GraduationCap,
  Briefcase,
  Languages,
  Star,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function RegisterRepresentative() {
  const router = useRouter();

  // Form states
  const [line, setLine] = useState<string>("ADVISORY_COUNCIL");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [certificateUrl, setCertificateUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const getVal = (name: string) => String(formData.get(name) || "").trim();

    // 1. Password confirmation validation
    const password = getVal("password");
    const confirmPassword = getVal("confirmPassword");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    // 2. Certificate validation for MOGAJI and BAALE
    if ((line === "MOGAJI" || line === "BAALE") && !certificateUrl) {
      setError("Certificate / Supporting Document upload is required for Mogaji and Baale lines.");
      setIsSubmitting(false);
      return;
    }

    // 3. Determine dynamic title
    let title = "";
    if (line === "BAALE") {
      title = getVal("title") || "Part Two (Baale)";
    } else if (line === "MOGAJI") {
      title = "Mogaji";
    } else if (line === "IYALODE") {
      title = "Iyalode";
    } else {
      title = "Chief";
    }

    // Prepare documents array if uploaded
    const documentUrls = certificateUrl
      ? [{ title: "Certificate of Installation", url: certificateUrl }]
      : [];

    const payload = {
      fullName: getVal("fullName"),
      email: getVal("email"),
      password,
      phone: getVal("phone"),
      positionTitle: getVal("positionTitle"),
      line,
      title,
      fullTraditionalName: getVal("fullTraditionalName"),
      currentPosition: getVal("currentPosition") || "Community Head",
      biography: getVal("biography"),
      familyHistory: getVal("familyHistory"),
      achievements: getVal("achievements"),
      palaceResponsibilities: getVal("palaceResponsibilities"),
      profilePictureUrl,
      documentUrls,
      // Compact Bio fields
      dateOfBirth: getVal("dateOfBirth"),
      familyCompound: getVal("familyCompound"),
      familyVillage: getVal("familyVillage"),
      localGovernment: getVal("localGovernment"),
      highestQualification: getVal("highestQualification"),
      fieldSpecialization: getVal("fieldSpecialization"),
      otherQualifications: getVal("otherQualifications"),
      currentOccupation: getVal("currentOccupation"),
      yearInstalled: line === "BAALE" || line === "IYALODE" || line === "HONORARY" ? getVal("yearInstalled") : "",
      yearInstalledAsMagaji: line === "ADVISORY_COUNCIL" || line === "OTUN" || line === "BALOGUN" || line === "MOGAJI" ? getVal("yearInstalledAsMagaji") : "",
      yearPromotedLine: line === "ADVISORY_COUNCIL" || line === "OTUN" || line === "BALOGUN" ? getVal("yearPromotedLine") : "",
      languagesSpoken: getVal("languagesSpoken"),
      expertiseInterest: getVal("expertiseInterest"),
    };

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Registration failed. Email might already be in use.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/portal");
      }, 5000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className={`${poppins.className} min-h-screen bg-[#f4f1ea] flex items-center justify-center px-6 py-12`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-[#e8e3da] bg-white p-10 shadow-2xl text-center max-w-xl w-full"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#d6b15b]/10 border border-[#d6b15b]/30">
            <CheckCircle2 className="h-10 w-10 text-[#9b762f]" />
          </div>
          <h1 className={`${playfair.className} text-3xl font-bold text-[#191714]`}>Registration Submitted</h1>
          <p className="mt-4 text-sm leading-7 text-gray-600">
            Your chieftaincy representative profile has been successfully registered. The Palace Administration team will review your details and documents. 
          </p>
          <div className="mt-6 rounded-2xl bg-[#faf8f3] border border-[#e8e3da] p-4 text-xs text-gray-500 text-left">
            <p className="font-semibold text-[#191714] mb-1">What happens next?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Once verified, your profile status will change to <strong>Published</strong>.</li>
              <li>You can log in to the portal using your email and password to track updates.</li>
              <li>You will receive an email notice when review notes or updates are made.</li>
            </ul>
          </div>
          <p className="mt-8 text-xs text-gray-400 font-semibold animate-pulse">
            Redirecting to Secure Portal sign-in...
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={`${poppins.className} min-h-screen bg-[#f4f1ea] text-[#191714] pb-20`}>
      {/* Top Header */}
      <section className="relative bg-[#191714] overflow-hidden py-10 border-b border-[#d6b15b]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(214,177,91,0.08),transparent_55%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6b15b]/10 border border-[#d6b15b]/20 shrink-0">
              <Crown className="h-6 w-6 text-[#d6b15b]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d6b15b]">Olubadan Palace</p>
              <h1 className={`${playfair.className} text-2xl font-bold text-white mt-0.5`}>Chieftaincy Self-Registration</h1>
            </div>
          </div>
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portal
          </Link>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-3xl mx-auto px-4 mt-8">
        <form onSubmit={handleRegister} className="bg-white rounded-3xl border border-[#e8e3da] shadow-lg p-6 sm:p-10 space-y-8">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* 0. Profile Picture (AT THE TOP) */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">Profile Portrait</p>
            <div className="max-w-md">
              <FileUploadWidget
                label="Profile Picture (Formal Royal Attire Preferred)"
                accept="image/*"
                buttonText="Upload Photo"
                onUploadComplete={(url) => setProfilePictureUrl(url)}
              />
            </div>
          </div>

          <hr className="border-[#f0ece2]" />

          {/* 1. Login Credentials */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">Account Security</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Email Address (Login Username) *
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. chief.kola@olubadan.org"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Choose Access Password *
                <input
                  name="password"
                  type="password"
                  required
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="Minimum 8 characters"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Confirm Access Password *
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="Repeat chosen password"
                />
              </label>
            </div>
          </div>

          <hr className="border-[#f0ece2]" />

          {/* 2. Personal Information */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">1. Personal Information</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Representative Legal Name *
                <input
                  name="fullName"
                  required
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Kola Kazeem"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Date of Birth (DD/MM/YYYY)
                <input
                  name="dateOfBirth"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. 15/03/1965"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Family Compound
                <input
                  name="familyCompound"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Aleshinloye Compound"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Family Village
                <input
                  name="familyVillage"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Oja-Oba"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 sm:col-span-2">
                Local Government Area
                <input
                  name="localGovernment"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Ibadan North"
                />
              </label>
            </div>
          </div>

          <hr className="border-[#f0ece2]" />

          {/* 3. Contact Details */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">2. Contact Details</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Phone Number
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. +2348033333333"
                />
              </label>
            </div>
          </div>

          <hr className="border-[#f0ece2]" />

          {/* 4. Qualifications */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">3. Academic &amp; Professional Qualifications</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Highest Qualification
                <input
                  name="highestQualification"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. B.Sc. Economics"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Field / Specialization
                <input
                  name="fieldSpecialization"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Public Administration"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 sm:col-span-2">
                Other Qualifications
                <input
                  name="otherQualifications"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. PMP, Member NIM"
                />
              </label>
            </div>
          </div>

          <hr className="border-[#f0ece2]" />

          {/* 5. Occupation & Leadership */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">4. Traditional Line &amp; Leadership Details</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Traditional Line Type *
                <select
                  name="line"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-semibold text-sm focus:border-[#d6b15b] focus:outline-none transition"
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
              {line === "BAALE" ? (
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Chieftaincy Title *
                  <select
                    name="title"
                    className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  >
                    <option value="His Royal Highness">His Royal Highness</option>
                    <option value="Part Two (Baale)">Part Two (Baale)</option>
                    <option value="Part Three (Baale)">Part Three (Baale)</option>
                  </select>
                </label>
              ) : null}

              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Representative Position Title *
                <input
                  name="positionTitle"
                  required
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Mogaji Aleshinloye Representative"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Current Occupation / Profession
                <input
                  name="currentOccupation"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Civil Engineer"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 sm:col-span-2">
                Full Traditional Title Name *
                <input
                  name="fullTraditionalName"
                  required
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Mogaji Kola Kola-Daisi"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 sm:col-span-2">
                Current Position (e.g. Clan Head, Council Advisor) *
                <input
                  name="currentPosition"
                  required
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Head of the Aleshinloye Lineage"
                />
              </label>
            </div>

            {/* Conditional installation / promotion years */}
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              {/* Year Installed as Magaji - Show for ADVISORY_COUNCIL, OTUN, BALOGUN, MOGAJI */}
              {["ADVISORY_COUNCIL", "OTUN", "BALOGUN", "MOGAJI"].includes(line) ? (
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Year Installed as Mogaji *
                  <input
                    name="yearInstalledAsMagaji"
                    required
                    className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                    placeholder="e.g. 2015"
                  />
                </label>
              ) : null}

              {/* Year Installed as Baale - Show for BAALE */}
              {line === "BAALE" ? (
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Year Installed as Baale *
                  <input
                    name="yearInstalled"
                    required
                    className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                    placeholder="e.g. 2018"
                  />
                </label>
              ) : null}

              {/* Year Installed - Show for IYALODE, HONORARY */}
              {["IYALODE", "HONORARY"].includes(line) ? (
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Year Installed *
                  <input
                    name="yearInstalled"
                    required
                    className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                    placeholder="e.g. 2020"
                  />
                </label>
              ) : null}

              {/* Year Promoted to Chieftaincy Line - Show for ADVISORY_COUNCIL, OTUN, BALOGUN */}
              {["ADVISORY_COUNCIL", "OTUN", "BALOGUN"].includes(line) ? (
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Year Promoted in to Chieftaincy Line *
                  <input
                    name="yearPromotedLine"
                    required
                    className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                    placeholder="e.g. 2022"
                  />
                </label>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Languages Spoken
                <input
                  name="languagesSpoken"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Yoruba, English"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Key Areas of Expertise / Interest
                <input
                  name="expertiseInterest"
                  className="mt-2 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition"
                  placeholder="e.g. Agriculture, Heritage"
                />
              </label>
            </div>
          </div>

          <hr className="border-[#f0ece2]" />

          {/* 6. Document / Certificate Upload */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">
              5. Support Documentation {["MOGAJI", "BAALE"].includes(line) ? " * (Required)" : " (Optional)"}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Upload certificate of installation or other verified documents issued by the Palace Registry.
            </p>
            <div className="max-w-md">
              <FileUploadWidget
                label="Installation Certificate (PDF, JPG, PNG)"
                accept="application/pdf,image/*"
                buttonText="Upload Certificate"
                onUploadComplete={(url) => setCertificateUrl(url)}
              />
            </div>
          </div>

          <hr className="border-[#f0ece2]" />

          {/* 7. History & Biography */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b762f] mb-3">6. History &amp; Narrative Dossier</p>
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Family Compound History &amp; Ancestral Deeds *
                <textarea
                  name="familyHistory"
                  required
                  className="mt-2 min-h-24 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none"
                  placeholder="Enter details of your family compound, historical lineage, ancestral deeds..."
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Biography (Traditional &amp; Civic Activities) *
                <textarea
                  name="biography"
                  required
                  className="mt-2 min-h-24 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none"
                  placeholder="Enter brief details of your traditional activities, contributions, civic background..."
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Notable Achievements (one per line) *
                <textarea
                  name="achievements"
                  required
                  className="mt-2 min-h-24 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none"
                  placeholder="e.g. Lineage unification&#10;Community library development"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Palace Responsibilities (one per line) *
                <textarea
                  name="palaceResponsibilities"
                  required
                  className="mt-2 min-h-24 w-full rounded-xl border border-[#e8e3da] bg-[#faf8f3] px-4 py-2.5 font-normal text-sm focus:border-[#d6b15b] focus:outline-none transition resize-none"
                  placeholder="e.g. Clan representation&#10;Council meeting participation"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#f0ece2]">
            <Link
              href="/portal"
              className="rounded-xl border border-[#e8e3da] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#191714] hover:bg-[#faf8f3] transition text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#191714] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#d6b15b] border border-[#d6b15b]/20 hover:bg-[#2a2520] transition disabled:opacity-60 text-center"
            >
              {isSubmitting ? "Submitting Profile..." : "Submit Chieftaincy Record"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
