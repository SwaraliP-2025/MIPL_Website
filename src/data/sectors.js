import {
  BrainCircuit,
  Building2,
  HeartPulse,
  Network,
  Scale,
  ShieldCheck,
  Factory,
} from "lucide-react";
import { projectImages } from "./projectImages";

export const sectorThemes = {
  "information-technology": {
    bar: "bg-[#1565c0]",
    overlay: "from-[#0d1b3e]/92 via-[#1565c0]/35 to-transparent",
    chip: "bg-[#1565c0]/15 text-[#1565c0]",
  },
  cybersecurity: {
    bar: "bg-[#0d1b3e]",
    overlay: "from-[#020617]/95 via-[#0d1b3e]/45 to-transparent",
    chip: "bg-[#0d1b3e]/10 text-[#0d1b3e]",
  },
  "smart-city-safe-city": {
    bar: "bg-[#E9863C]",
    overlay: "from-[#0d1b3e]/92 via-[#E9863C]/25 to-transparent",
    chip: "bg-[#E9863C]/15 text-[#c76a28]",
  },
  ai: {
    bar: "bg-[#244884]",
    overlay: "from-[#0f172a]/95 via-[#244884]/40 to-transparent",
    chip: "bg-[#244884]/15 text-[#244884]",
  },
  "oil-and-gas": {
    bar: "bg-[#c76a28]",
    overlay: "from-[#1a1208]/95 via-[#E9863C]/30 to-transparent",
    chip: "bg-[#E9863C]/15 text-[#c76a28]",
  },
  judiciary: {
    bar: "bg-[#5c4a2a]",
    overlay: "from-[#0f172a]/95 via-[#5c4a2a]/35 to-transparent",
    chip: "bg-[#5c4a2a]/15 text-[#5c4a2a]",
  },
  healthcare: {
    bar: "bg-[#0d9488]",
    overlay: "from-[#0d1b3e]/90 via-[#0d9488]/30 to-transparent",
    chip: "bg-[#0d9488]/15 text-[#0f766e]",
  },
};

export const sectors = [
  {
    slug: "information-technology",
    name: "Information Technology",
    label: "Office & IT Systems",
    icon: Network,
    theme: sectorThemes["information-technology"],
    image: projectImages.iimBangalore,
    imageAlt: "IIM Bangalore — IT and campus systems advisory",
    summary:
      "We help plan computer networks, software links, and systems that keep day-to-day work running smoothly.",
    overview:
      "MIPL advises organisations on IT planning — from basic setup to smarter systems — so teams can work safely and without interruption.",
    focusAreas: [
      "Planning office and site IT systems",
      "Linking control rooms, cameras, and monitoring tools",
      "Bringing different vendor systems together",
      "Planning data storage, internet links, and uptime",
    ],
    outcomes: [
      "Clear view of what is happening across sites",
      "Reliable IT backbone for safety and daily operations",
      "Room to grow as needs change",
    ],
    projectImages: [
      { image: projectImages.iimBangalore, label: "IIM Bangalore", alt: "IIM Bangalore campus IT and security advisory" },
      { image: projectImages.naviMumbai, label: "Navi Mumbai Corporation", alt: "Navi Mumbai municipal IT advisory" },
      { image: projectImages.kolhapurCorp, label: "Kolhapur Corporation", alt: "Kolhapur municipal systems advisory" },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    label: "Online Safety",
    icon: ShieldCheck,
    theme: sectorThemes.cybersecurity,
    image: projectImages.thanePolice,
    imageAlt: "Thane Police Office — security advisory work",
    imagePosition: "center center",
    summary:
      "We help you understand online risks and plan simple, practical ways to stay protected.",
    overview:
      "From basic checks to stronger safeguards, MIPL helps protect your data, apps, staff accounts, and connected equipment.",
    focusAreas: [
      "Checking how safe your systems are today",
      "Planning how to spot and respond to online threats",
      "Setting rules and controls staff can follow",
      "Protecting both office IT and factory-floor systems",
    ],
    outcomes: [
      "Less risk across computers and connected devices",
      "Better readiness for audits and compliance checks",
      "Clearer steps when something goes wrong",
    ],
    projectImages: [
      { image: projectImages.thanePolice, label: "Thane Police Office", alt: "Thane Police security project" },
      { image: projectImages.suratDiamond, label: "Surat Diamond Bourse", alt: "High-security facility advisory" },
      { image: projectImages.bnpParibas, label: "BNP Paribas", alt: "Banking and enterprise security advisory", layout: "contain" },
      { image: projectImages.jnpt, label: "JNPT", alt: "Port security and systems advisory" },
    ],
  },
  {
    slug: "smart-city-safe-city",
    name: "Smart City Safe City",
    label: "Safer Cities",
    icon: Building2,
    theme: sectorThemes["smart-city-safe-city"],
    image: projectImages.aurangabadSmartCity,
    imageAlt: "Aurangabad Smart City ASCDCL ICCC control room",
    summary:
      "We advise cities on cameras, control rooms, traffic tools, and public safety planning.",
    overview:
      "MIPL has long experience helping city bodies connect surveillance, traffic, emergency response, and admin work in one practical plan.",
    focusAreas: [
      "City control room and monitoring centre planning",
      "Cameras, public safety, and emergency coordination",
      "Traffic and road management systems",
      "Connecting field equipment to central dashboards",
    ],
    outcomes: [
      "Faster awareness when something happens in the city",
      "Better monitoring of public spaces and civic work",
      "Easier coordination between departments",
    ],
    projectImages: [
      { image: projectImages.aurangabadSmartCity, label: "Aurangabad Smart City ICCC", alt: "ASCDCL Aurangabad Smart City control room" },
      { image: projectImages.nandedSafeCity, label: "Nanded Safe City", alt: "Nanded Safe City project" },
      { image: projectImages.kolhapurSafeCity, label: "Kolhapur Safe City", alt: "Kolhapur Safe City project" },
      { image: projectImages.naviMumbai, label: "Navi Mumbai Surveillance", alt: "Navi Mumbai city surveillance project" },
      { image: projectImages.amravatiSafeCity, label: "Amravati Safe City", alt: "Amravati Safe City project" },
      { image: projectImages.gurgaon, label: "Gurgaon CCTV Project", alt: "Gurgaon city surveillance project" },
    ],
  },
  {
    slug: "ai",
    name: "AI",
    label: "Smart Tools",
    icon: BrainCircuit,
    theme: sectorThemes.ai,
    image: projectImages.aurangabadSmartCity,
    imageAlt: "Smart city control room with analytics advisory",
    summary:
      "We help use smart software to spot patterns, reduce manual work, and support better decisions.",
    overview:
      "MIPL applies AI in practical ways — in cameras, control rooms, and data-heavy work — where faster answers really matter.",
    focusAreas: [
      "Smart camera and operations analysis",
      "Reducing repetitive monitoring work",
      "Spotting unusual activity early",
      "Decision support for control-room teams",
    ],
    outcomes: [
      "Quicker answers from large amounts of data",
      "Less manual checking of routine tasks",
      "More consistent monitoring results",
    ],
    projectImages: [
      { image: projectImages.aurangabadSmartCity, label: "Aurangabad Smart City ICCC", alt: "Control room analytics and monitoring project" },
      { image: projectImages.nandedSafeCity, label: "Nanded Safe City", alt: "City monitoring and analytics project" },
      { image: projectImages.naviMumbai, label: "Navi Mumbai", alt: "Urban monitoring systems project" },
      { image: projectImages.kolhapurSafeCity, label: "Kolhapur Safe City", alt: "Safe city monitoring project" },
    ],
  },
  {
    slug: "oil-and-gas",
    name: "Oil and Gas",
    label: "Refineries & Energy",
    icon: Factory,
    theme: sectorThemes["oil-and-gas"],
    image: projectImages.mrplFeatured,
    imageAlt: "MRPL Mangalore refinery security advisory",
    summary:
      "Security and monitoring advice for refineries, terminals, pipelines, and energy sites.",
    overview:
      "MIPL helps oil and gas clients plan perimeter safety, control-room visibility, emergency readiness, and day-to-day continuity.",
    focusAreas: [
      "Security planning for refineries and plants",
      "Perimeter protection and central monitoring",
      "Linking cameras, access gates, and incident response",
      "Technology planning for high-risk industrial sites",
    ],
    outcomes: [
      "Better control over sensitive areas and assets",
      "Faster detection across large facilities",
      "Stronger continuity for critical operations",
    ],
    projectImages: [
      { image: projectImages.mrplFeatured, label: "MRPL Mangalore", alt: "MRPL refinery security project" },
      { image: projectImages.hpclMumbai, label: "HPCL Mumbai Refinery", alt: "HPCL Mumbai refinery project" },
      { image: projectImages.nayara, label: "Nayara Energy", alt: "Nayara Energy refinery project" },
      { image: projectImages.iocl, label: "IOCL Bio-refinery", alt: "IOCL bio-refinery project" },
      { image: projectImages.adani, label: "Adani Power", alt: "Adani Power project" },
    ],
  },
  {
    slug: "judiciary",
    name: "Judiciary",
    label: "Courts & Legal Sites",
    icon: Scale,
    theme: sectorThemes.judiciary,
    image: projectImages.mpHighCourt,
    imageLayout: "contain",
    imageAlt: "Madhya Pradesh High Court Jabalpur — court security advisory",
    summary:
      "Safety and technology advice for courts, legal campuses, and sensitive public buildings.",
    overview:
      "MIPL helps courts improve physical safety, visitor flow, monitoring, and reliable day-to-day operations.",
    focusAreas: [
      "Court campus cameras and entry control",
      "Safe movement plans inside sensitive buildings",
      "Monitoring across multi-building court complexes",
      "Technology support for efficient court operations",
    ],
    outcomes: [
      "Safer, better-managed court environments",
      "Clearer view of activity across court premises",
      "More confidence for staff and visitors",
    ],
    projectImages: [
      { image: projectImages.mpHighCourt, label: "MP High Court Jabalpur", alt: "Madhya Pradesh High Court project", layout: "contain" },
      { image: projectImages.vidhanBhavan, label: "Vidhan Bhavan Maharashtra", alt: "Maharashtra legislative building project" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    label: "Hospitals & Clinics",
    icon: HeartPulse,
    theme: sectorThemes.healthcare,
    image: projectImages.hiranandani2,
    imageLayout: "contain",
    imageAlt: "Hiranandani Group — large campus security advisory",
    summary:
      "Safety and technology advice for hospitals and healthcare campuses.",
    overview:
      "MIPL helps healthcare sites plan for patient safety, privacy, restricted areas, and reliable daily operations.",
    focusAreas: [
      "Hospital safety, monitoring, and entry control",
      "Protecting sensitive clinical and admin areas",
      "Planning connected systems for hospital operations",
      "Technology advice that supports uninterrupted care",
    ],
    outcomes: [
      "Safer spaces for patients, staff, and visitors",
      "Better control over restricted areas",
      "Reliable support for hospital operations",
    ],
    projectImages: [
      { image: projectImages.hiranandani2, label: "Hiranandani Group", alt: "Hiranandani campus advisory", layout: "contain" },
      { image: projectImages.hiranandani3, label: "Hiranandani Group", alt: "Hiranandani facility planning", layout: "contain" },
      { image: projectImages.iimBangalore, label: "IIM Bangalore", alt: "Institutional campus safety project" },
    ],
  },
];

export const getSectorBySlug = (slug) =>
  sectors.find((sector) => sector.slug === slug);

export const SECTOR_COUNT = sectors.length;

export const sectorNamesList = sectors.map((s) => s.name);

export const sectorsIntroPhrase = (() => {
  const names = sectorNamesList;
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
})();
