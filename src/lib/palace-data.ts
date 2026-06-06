export type ProfileStatus = "Pending Review" | "Request Changes" | "Published" | "Rejected";

export type LineKey = "otun" | "balogun" | "mogaji" | "baale" | "iyalode" | "advisory-council" | "honorary";

export type PalaceProfile = {
  id: string;
  line: LineKey;
  title: string;
  name: string;
  position: string;
  biography: string;
  familyHistory: string;
  achievements: string[];
  responsibilities: string[];
  image: string;
  status: ProfileStatus;
  submittedBy: string;
  updatedAt: string;
};

export type PalaceNews = {
  id: string;
  headline: string;
  subtitle: string;
  content: string[];
  image: string;
  author: string;
  publishDate: string;
  category: "Palace News" | "Traditional Council" | "Cultural Events" | "Government Relations";
  status: "Draft" | "Published" | "Archived";
};

export const lineLabels: Record<LineKey, string> = {
  otun: "Otun Olubadan Chieftaincy line",
  balogun: "Balogun chieftaincy line",
  mogaji: "Mogajis in Ibadanland",
  baale: "Baales in Ibadanland",
  iyalode: "Iyalode Chieftaincy line",
  "advisory-council": "Olubadan Advisory Council members",
  honorary: "Honorary Chieftaincy",
};

export const lineDescriptions: Record<LineKey, string> = {
  otun: "The Otun Olubadan Chieftaincy Line represents one of the senior civil chieftaincy pathways in Ibadanland, with chiefs ascending through a defined hierarchy towards the Olubadan stool.",
  balogun: "The Balogun Chieftaincy Line reflects Ibadanland's historic warrior tradition, with chiefs known for discipline, security, public service, and civic leadership.",
  mogaji: "Mogajis represent family compound heads across Ibadanland, connecting ancestral lineages to the wider civic and traditional life of the community.",
  baale: "Baales serve as community heads and local palace representatives, carrying the Olubadan's authority into the many districts and quarters of Ibadanland.",
  iyalode: "The Iyalode is the paramount title holder representing women in the Ibadan traditional council, recognized as a voice of feminine leadership and commerce.",
  "advisory-council": "The Olubadan Advisory Council comprises distinguished individuals appointed by His Imperial Majesty to provide counsel on governance, culture, and development matters.",
  honorary: "Honorary Chieftaincy titles are conferred by the Olubadan upon distinguished individuals whose exceptional contributions to Ibadanland and humanity merit royal recognition.",
};


export const palaceProfiles: PalaceProfile[] = [
  {
    id: "otun-olubadan",
    line: "otun",
    title: "His Royal Majesty",
    name: "Oba Abiodun Kola-Daisi",
    position: "Osi Olubadan of Ibadanland",
    biography:
      "A respected member of the Olubadan traditional council, known for steady counsel, civic leadership, and service to Ibadanland.",
    familyHistory:
      "The Otun line preserves one of the senior civil chieftaincy pathways of Ibadanland, linking generations of palace service and community responsibility.",
    achievements: ["Council representation", "Community mediation", "Cultural preservation"],
    responsibilities: ["Palace advisory duties", "Line representation", "Public ceremonial leadership"],
    image: "/oba/otun2.jpeg",
    status: "Published",
    submittedBy: "Otun Line Secretariat",
    updatedAt: "2026-04-14",
  },
  {
    id: "ashipa-olubadan",
    line: "otun",
    title: "His Royal Majesty",
    name: "Oba Hamidu Ajibade",
    position: "Ashipa Olubadan of Ibadanland",
    biography:
      "A traditional leader serving within the Otun line with commitment to heritage, palace order, and inter-family coordination.",
    familyHistory:
      "The family record reflects longstanding participation in Ibadan civic affairs and support for the palace institution.",
    achievements: ["Traditional council service", "Youth mentorship", "Line documentation"],
    responsibilities: ["Cultural representation", "Family liaison", "Council participation"],
    image: "/oba/otun3.jpeg",
    status: "Published",
    submittedBy: "Otun Line Representative",
    updatedAt: "2026-04-14",
  },
  {
    id: "balogun-ibadanland",
    line: "balogun",
    title: "His Royal Majesty",
    name: "Oba Tajudeen Abimbola Ajibola",
    position: "Balogun of Ibadanland",
    biography:
      "A senior figure of the Balogun line, representing the historic warrior chieftaincy tradition of Ibadanland.",
    familyHistory:
      "The Balogun line is associated with courage, discipline, protection, and public leadership across Ibadan history.",
    achievements: ["Security advocacy", "Council leadership", "Traditional dispute resolution"],
    responsibilities: ["Balogun line leadership", "Palace counsel", "Public ceremonies"],
    image: "/oba/balogun1.jpeg",
    status: "Published",
    submittedBy: "Balogun Line Secretariat",
    updatedAt: "2026-01-05",
  },
  {
    id: "mogaji-profile",
    line: "mogaji",
    title: "Mogaji",
    name: "Representative Profile Pending",
    position: "Family Compound Representative",
    biography:
      "Approved Mogaji profiles will appear here after palace review, including biographies, family histories, achievements, and responsibilities.",
    familyHistory:
      "Mogaji submissions document family compound histories and their relationship to Ibadanland's civic structure.",
    achievements: ["Pending palace verification"],
    responsibilities: ["Family representation", "Community communication", "Submission updates"],
    image: "/palace1.jpg",
    status: "Pending Review",
    submittedBy: "Mogaji Representative",
    updatedAt: "2026-05-28",
  },
  {
    id: "baale-profile",
    line: "baale",
    title: "Baale",
    name: "Representative Profile Pending",
    position: "Community Head",
    biography:
      "Approved Baale profiles will be published after administrative review and verification of supporting documents.",
    familyHistory:
      "Baale records preserve local community leadership histories and their connections to the palace.",
    achievements: ["Pending palace verification"],
    responsibilities: ["Community leadership", "Local announcements", "Palace communication"],
    image: "/palace2.jpg",
    status: "Pending Review",
    submittedBy: "Baale Representative",
    updatedAt: "2026-05-27",
  },
];

export const palaceNews: PalaceNews[] = [
  {
    id: "sun-award",
    headline: "Olubadan shines at The Sun Award night",
    subtitle: "His Imperial Majesty receives Lifetime Service recognition in Lagos.",
    content: [
      "His Imperial Majesty, Oba Rashidi Adewolu Ladoja, the 44th Olubadan of Ibadanland and former governor of Oyo State, was named among the winners of The Sun Lifetime Achievement Award for 2025.",
      "The ceremony brought together public officials, royal fathers, industry leaders, and guests from across Nigeria in honour of distinguished national service.",
    ],
    image: "/news4.jpeg",
    author: "Adeola Oloko",
    publishDate: "2026-01-31",
    category: "Palace News",
    status: "Published",
  },
  {
    id: "ibadan-state",
    headline: "Akpabio raises hope on the creation of Ibadan State",
    subtitle: "The Olubadan restates the case for Ibadan State during a courtesy visit.",
    content: [
      "The Olubadan of Ibadanland enlisted support from the National Assembly for the creation of Ibadan State during a meeting with Senate President Godswill Akpabio and principal officers.",
      "The monarch described Ibadan as economically viable and urged stronger legal respect for the traditional institution in Nigeria.",
    ],
    image: "/akpabio and oba.jpeg",
    author: "Adeola Oloko",
    publishDate: "2026-01-20",
    category: "Government Relations",
    status: "Published",
  },
  {
    id: "traditional-council",
    headline: "Olubadan is new Chairman, Oyo State Traditional Council",
    subtitle: "The rotational chairmanship begins with Oba Rashidi Adewolu Ladoja.",
    content: [
      "The Oyo State Government announced that the rotational chairmanship of the State Council of Obas and Chiefs will begin with the Olubadan.",
      "Oba Ladoja thanked the governor and fellow monarchs, stating that peace, security, safety, and progress remain central priorities.",
    ],
    image: "/news2.jpeg",
    author: "Adeola Oloko",
    publishDate: "2026-01-12",
    category: "Traditional Council",
    status: "Published",
  },
  {
    id: "coronation-anniversary",
    headline: "Palace announces grand schedule for Coronation Anniversary",
    subtitle: "A week of cultural exhibitions, historical symposiums, and community outreach planned.",
    content: [
      "The Central Planning Committee has released the official line-up of events for the upcoming coronation anniversary of His Imperial Majesty, Oba Rashidi Adewolu Ladoja.",
      "The celebration will highlight Ibadan's rich history, starting with a royal exhibition at the palace, followed by educational events, grassroots development commissions, and a grand banquet.",
    ],
    image: "/royal_palace.jpeg",
    author: "Palace Secretariat",
    publishDate: "2026-01-10",
    category: "Cultural Events",
    status: "Published",
  },
  {
    id: "community-guard",
    headline: "Olubadan inaugurates Ibadan Community Guard",
    subtitle: "The palace unveils a grassroots security initiative and Gaari Ibadan programme.",
    content: [
      "Oba Rashidi Adewolu Ladoja formally inaugurated the Ibadan Community Guard to support surveillance and community policing across the eleven local government areas of Ibadanland.",
      "The event also featured the unveiling of Gaari Ibadan, an economic and food security initiative supporting local production and sustainability.",
    ],
    image: "/oluband-with-garri.jpeg",
    author: "Palace of the Olubadan of Ibadanland",
    publishDate: "2026-01-08",
    category: "Cultural Events",
    status: "Published",
  },
  {
    id: "youth-empowerment",
    headline: "Olubadan launches Royal Youth Empowerment Scheme",
    subtitle: "New initiative to provide tech training scholarships and agricultural grants.",
    content: [
      "In a bid to drive modern development, the Olubadan of Ibadanland has launched a new foundation targeting youth capacity building and sustainable employment.",
      "Partnering with leading tech academies and agricultural cooperatives, the scheme aims to empower over 5,000 youths in digital skills and modern farming techniques within its first year.",
    ],
    image: "/oba-and-fg.jpeg",
    author: "Office of the Olubadan",
    publishDate: "2026-01-05",
    category: "Government Relations",
    status: "Published",
  },
];


export const galleryItems = [
  { title: "Royal Palace", category: "Palace Events", image: "/royal_palace.jpeg" },
  { title: "Cultural Festival", category: "Festivals", image: "/royal_festival.jpeg" },
  { title: "Historical Palace View", category: "Historical Archives", image: "/palace3.jpeg" },
  { title: "Coronation Memory", category: "Coronation", image: "/olubadan1.jpeg" },
];

export const streamSettings = {
  radioUrl: "https://stream-ssl.arenastreaming.com:8000/freshfmibadan",
  youtubeLiveUrl: "https://www.youtube.com/@olubadanpalace/live",
  radioStatus: "Ready",
  videoStatus: "Scheduled",
};
