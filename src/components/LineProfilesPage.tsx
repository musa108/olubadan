"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  FileText,
  Shield,
  X,
  BookOpen,
  Users,
  ChevronRight,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import { useSession } from "next-auth/react";
import { LineKey, lineLabels, lineDescriptions } from "@/lib/palace-data";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Map UI line keys to Prisma enum values
const lineToEnum: Record<LineKey, string> = {
  otun: "OTUN",
  balogun: "BALOGUN",
  mogaji: "MOGAJI",
  baale: "BAALE",
  iyalode: "IYALODE",
  "advisory-council": "ADVISORY_COUNCIL",
  honorary: "HONORARY",
};

interface ProfileData {
  id: string;
  title: string;
  name: string;
  position: string;
  biography: string;
  image?: string;
  achievements: string[];
  familyHistory?: string;
  // If backend ever returns these fields on admin view
  status?: string;
}

type ApiProfile = {
  id?: string;
  title?: string;
  achievements?: string[] | string;
  familyHistory?: string;
  biography?: string;
  profilePictureUrl?: string;
  user?: { name?: string; positionTitle?: string } | null;
};

function parseList(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string") return v.split("\n").map((s) => s.trim()).filter(Boolean);
  return [];
}

// Compute traditional ranking rank for sorting (lower means higher traditional standing)
function getHierarchyRank(profile: ProfileData, line: LineKey): number {
  const position = profile.position.toLowerCase();
  const name = profile.name.toLowerCase();
  const title = profile.title.toLowerCase();

  if (line === "baale") {
    // 1st Order: His Majesty
    if (title.includes("majesty") || title.includes("imperial") || position.includes("majesty")) return 1;
    // 2nd Order: 2nd Baale
    if (position.includes("2nd") || name.includes("2nd") || position.includes("second")) return 2;
    // 3rd Order: 3rd Baale
    if (position.includes("3rd") || name.includes("3rd") || position.includes("third")) return 3;
    return 4; // default rank for other Baales
  }

  if (line === "otun") {
    if (position.includes("otun olubadan")) return 1;
    if (position.includes("osi olubadan")) return 2;
    if (position.includes("asipa olubadan") || position.includes("ashipa olubadan")) return 3;
    if (position.includes("ekerin olubadan")) return 4;
    if (position.includes("ekarun olubadan")) return 5;
    if (position.includes("abese olubadan")) return 6;
    if (position.includes("maye olubadan")) return 7;
    if (position.includes("ekefa olubadan")) return 8;
    if (position.includes("agbaakin olubadan")) return 9;
    if (position.includes("aare alasa olubadan")) return 10;
    if (position.includes("ikolaba olubadan")) return 11;
    if (position.includes("asaju olubadan")) return 12;
    if (position.includes("jagun olubadan")) return 13;
    return 14;
  }

  if (line === "balogun") {
    if (position.includes("balogun of ibadanland") || (position.includes("balogun") && !position.includes("otun") && !position.includes("osi") && !position.includes("asipa") && !position.includes("ashipa") && !position.includes("ekerin") && !position.includes("ekarun"))) return 1;
    if (position.includes("otun balogun")) return 2;
    if (position.includes("osi balogun")) return 3;
    if (position.includes("asipa balogun") || position.includes("ashipa balogun")) return 4;
    if (position.includes("ekerin balogun")) return 5;
    if (position.includes("ekarun balogun")) return 6;
    if (position.includes("abese balogun")) return 7;
    if (position.includes("maye balogun")) return 8;
    if (position.includes("ekefa balogun")) return 9;
    if (position.includes("agbaakin balogun")) return 10;
    if (position.includes("aare alasa balogun")) return 11;
    if (position.includes("ikolaba balogun")) return 12;
    if (position.includes("asaju balogun")) return 13;
    if (position.includes("jagun balogun")) return 14;
    return 15;
  }

  if (line === "iyalode") {
    if (position.includes("iyalode of ibadanland") || (position.includes("iyalode") && !position.includes("otun") && !position.includes("osi") && !position.includes("asipa") && !position.includes("ashipa") && !position.includes("ekerin") && !position.includes("ekarun"))) return 1;
    if (position.includes("otun iyalode")) return 2;
    if (position.includes("osi iyalode")) return 3;
    if (position.includes("asipa iyalode") || position.includes("ashipa iyalode")) return 4;
    if (position.includes("ekerin iyalode")) return 5;
    if (position.includes("ekarun iyalode")) return 6;
    return 7;
  }

  if (line === "advisory-council") {
    if (position.includes("chairman")) return 1;
    if (position.includes("secretary")) return 2;
    return 3;
  }

  return 100; // default low rank
}

export default function LineProfilesPage({ line }: { line: LineKey }) {
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "SUPER_ADMIN";

  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"hierarchy" | "alphabetical">("hierarchy");

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const enumLine = lineToEnum[line] || line.toUpperCase();
        const response = await fetch(`/api/profiles?line=${enumLine}`);
        const data: unknown = await response.json();

        const payload = data as { profiles?: ApiProfile[] };
        const mapped: ProfileData[] = (payload.profiles || []).map((p) => {
          const id = String(p.id ?? "");
          return {
            id,
            title: String(p.title ?? ""),
            name: p.user?.name || "Title Holder",
            position: p.user?.positionTitle || "Chieftaincy Representative",
            biography: String(p.biography ?? ""),
            image: p.profilePictureUrl || undefined,
            familyHistory: p.familyHistory,
            achievements: parseList(p.achievements),
          };
        });

        setProfiles(mapped.filter((p) => p.id));
      } catch (e) {
        console.error("Failed to load profiles:", e);
        setProfiles([]);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, [line]);

  const label = lineLabels[line];
  const description = lineDescriptions[line];

  // Perform search and traditional/alphabetical sorting
  const filteredProfiles = profiles
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        p.biography.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "hierarchy") {
        const rankA = getHierarchyRank(a, line);
        const rankB = getHierarchyRank(b, line);
        if (rankA !== rankB) {
          return rankA - rankB;
        }
        return a.name.localeCompare(b.name);
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  return (
    <main className={`${poppins.className} min-h-screen bg-[#f7f4ee] pb-20`}>
      {/* Admin-only notice strip */}
      {isAdmin && (
        <div className="bg-[#191714] border-b border-[#d6b15b]/20 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-start gap-2 text-[11px] font-bold text-[#d6b15b] uppercase tracking-[0.18em]">
            <ShieldCheck className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>Admin View — Full profile details are visible. Public users see a simplified view only.</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <section className="bg-white px-4 sm:px-6 py-10 sm:py-16 shadow-sm border-b border-[#eae6db]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl"
        >
          <h1 className={`${playfair.className} mt-2 text-3xl font-bold text-gray-950 sm:text-4xl md:text-5xl`}>
            {label}
          </h1>
          {!isAdmin && (
            <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base font-medium">
              Title-holder directory (public preview). Full verified dossiers are available to Palace Super Admin only.
            </p>
          )}
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-7 sm:leading-8 text-gray-600 md:text-lg font-medium">
            {description}
          </p>
        </motion.div>
      </section>

      {/* Search and Sort Toolbar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-2">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white border border-[#eae6db] rounded-2xl p-5 shadow-xs">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder={`Search ${label} by name, title, or position...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#faf8f4] border border-[#e8ddc8] rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#d6b15b]/40 focus:border-[#d6b15b]"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Sort By:</span>
            <div className="flex rounded-xl border border-[#e8ddc8] bg-[#faf8f4] p-1">
              <button
                onClick={() => setSortBy("hierarchy")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  sortBy === "hierarchy"
                    ? "bg-[#191714] text-[#d6b15b] shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Traditional Rank
              </button>
              <button
                onClick={() => setSortBy("alphabetical")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  sortBy === "alphabetical"
                    ? "bg-[#191714] text-[#d6b15b] shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Alphabetical (A-Z)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-12 sm:p-20 text-center">
            <div className="h-8 w-8 rounded-full border-2 border-[#d6b15b] border-t-transparent animate-spin mb-4" />
            <p className="text-sm font-medium text-gray-500">Loading chieftaincy records...</p>
          </div>
        ) : profiles.length > 0 ? (
          filteredProfiles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((profile, index) => (
                <motion.article
                  key={profile.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white border border-[#eae6db] shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                <div className="relative h-56 sm:h-64 md:h-72 w-full bg-gray-100 overflow-hidden shrink-0">
                  <Image
                    src={profile.image || "/the king.jpeg"}
                    alt={profile.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="inline-block rounded-lg bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#e1bd62] border border-white/10">
                      {profile.title}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b762f]">
                    {profile.position}
                  </p>
                  <h2 className={`${playfair.className} mt-2 text-xl font-bold text-gray-950 leading-snug`}>
                    {profile.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 font-medium line-clamp-3">
                    {profile.biography}
                  </p>

                  {/* Admin-only: Extended details */}
                  {isAdmin && (
                    <div className="mt-5 pt-4 border-t border-[#f0ece2] space-y-4">
                      {profile.familyHistory && profile.familyHistory !== "[REDACTED]" && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-[#9b762f]" />
                            Family & Ancestral History
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium bg-[#fdf9f0] border border-[#e8ddc8] rounded-lg p-3">
                            {profile.familyHistory}
                          </p>
                        </div>
                      )}

                      {profile.achievements.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
                            <Award className="h-3.5 w-3.5 text-[#9b762f]" />
                            Achievements
                          </p>
                          <ul className="space-y-1 text-xs text-gray-600 font-semibold">
                            {profile.achievements.map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <ChevronRight className="h-3 w-3 text-[#9b762f] mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Public CTA */}
                  {!isAdmin && (
                    <div className="mt-auto pt-5">
                      <button
                        onClick={() => setSelectedProfile(profile)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e8ddc8] bg-[#fffaf0] hover:bg-[#fff5e0] hover:border-[#d6b15b]/40 px-4 py-2.5 text-xs font-bold text-[#9b762f] transition cursor-pointer"
                      >
                        <Shield className="h-3.5 w-3.5" />
                        Learn More About This Title
                      </button>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#e8ddc8] bg-white p-10 sm:p-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fffaf0] border border-[#e8ddc8]">
                <Users className="h-8 w-8 text-[#c4a45e]" />
              </div>
              <h2 className={`${playfair.className} text-xl sm:text-2xl font-bold text-gray-950`}>No Profiles Found</h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-500 font-medium text-sm leading-relaxed">
                No title-holder records matched your query. Try searching for a different name, title, or position.
              </p>
            </div>
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e8ddc8] bg-white p-10 sm:p-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fffaf0] border border-[#e8ddc8]">
              <Users className="h-8 w-8 text-[#c4a45e]" />
            </div>
            <h2 className={`${playfair.className} text-xl sm:text-2xl font-bold text-gray-950`}>Records Coming Soon</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500 font-medium text-sm leading-relaxed">
              Verified representative records for the <strong>{label}</strong> will be published here following palace review and formal documentation.
            </p>
          </div>
        )}
      </section>

      {/* Public information modal */}
      <AnimatePresence>
        {selectedProfile && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-white border border-[#eae6db] rounded-t-2xl sm:rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden max-h-[90dvh] flex flex-col"
            >
              <div className="bg-[#191714] px-6 py-5 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(214,177,91,0.06),transparent_60%)]" />
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer transition"
                >
                  <X className="h-5 w-5" />
                </button>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6b15b]">{selectedProfile.title}</p>
                <h3 className={`${playfair.className} text-xl font-bold text-white mt-1 pr-8`}>{selectedProfile.name}</h3>
                <p className="text-xs text-white/50 mt-0.5 font-medium">{selectedProfile.position}</p>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto flex-1">
                <p className="text-sm leading-relaxed text-gray-600 font-medium">{selectedProfile.biography}</p>

                <div className="mt-5 p-4 bg-[#faf8f3] border border-[#e8ddc8] rounded-xl text-xs text-gray-600 leading-relaxed font-medium">
                  <p className="font-bold text-gray-900 mb-1">About this record</p>
                  This chieftaincy representative profile is maintained by the Palace of the Olubadan of Ibadanland.
                  For full traditional dossiers, credentials, and ancestral documentation, please contact the Palace Administrative Secretary through official channels.
                </div>

                <button
                  onClick={() => setSelectedProfile(null)}
                  className="mt-5 w-full rounded-xl bg-[#191714] hover:bg-[#2a2520] text-[#d6b15b] py-3 text-xs font-bold uppercase tracking-wider cursor-pointer transition border border-[#d6b15b]/20"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

