import { projectImages } from "./projectImages";

export const caseStudies = [
  {
    slug: "ivss-mp-courts",
    title: "IVSS for District & Subordinate Courts of Madhya Pradesh",
    shortTitle: "IVSS — MP Courts",
    tagline: "Government · Judiciary",
    client: "Hon. High Court of Madhya Pradesh, Jabalpur",
    year: "2022",
    image: projectImages.mpHighCourt,
    pdfUrl: "/publications/CASE%20STUDY1_MIPL.pdf",
    challenge:
      "The Supreme Court mandated improved security across district and subordinate courts. Madhya Pradesh needed a scalable video surveillance approach across hundreds of court premises with central monitoring capability.",
    solution:
      "MIPL led risk analysis and design of an Integrated Video Surveillance System (IVSS) — covering site assessment, system architecture, distributed monitoring, and implementation guidance aligned with judicial requirements.",
    outcome:
      "A structured IVSS framework for court premises statewide, supporting compliance with national security directives and consistent monitoring across locations.",
    summary:
      "Risk analysis and design of an integrated video surveillance system with distributed monitoring across court premises to meet Supreme Court security mandates.",
  },
  {
    slug: "isms-mrpl",
    title: "ISMS for Mangalore Refineries & Petrochemicals Ltd.",
    shortTitle: "ISMS — MRPL",
    tagline: "Industrial · Energy",
    client: "Mangalore Refineries & Petrochemicals Ltd.",
    year: "2020",
    image: projectImages.mrplFeatured,
    pdfUrl: "/publications/CASE%20STUDY%202_MIPL.pdf",
    challenge:
      "MRPL required an integrated security management approach across refinery operations with central visibility and coordinated response.",
    solution:
      "MIPL provided ISMS consultancy — surveillance planning, access control, perimeter security, and command-centre integration for refinery-scale operations.",
    outcome:
      "A coordinated security management framework supporting MRPL's operational and compliance requirements.",
    summary:
      "Integrated Security Management System consultancy for MRPL — surveillance, access control, and central monitoring at refinery scale.",
  },
];

export const getCaseStudyBySlug = (slug) => caseStudies.find((s) => s.slug === slug);
