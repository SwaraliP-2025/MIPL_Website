import { editorialServiceImages } from "./serviceImages";

/** High-level consulting services for Services page */
export const editorialServices = [
  {
    id: "consultancy",
    title: "Security Consultancy",
    layman: "Integrated security planning for cities, campuses, and industrial sites — surveillance, access control, and emergency response.",
    steps: ["Understand your site", "Plan the right mix of technology", "Guide rollout & operations"],
    audiences: ["Municipal Corporation", "Industrial plant", "Airport", "Court complex"],
    example: "Nanded Safe City · MP High Court",
    image: editorialServiceImages.consultancy,
  },
  {
    id: "audits",
    title: "Security Audits",
    layman: "Structured review of existing systems, risk gaps, and recommended corrective measures.",
    steps: ["Threat & risk review", "Site walk-through", "Clear action report"],
    audiences: ["Bank", "Refinery", "Government office", "Large campus"],
    example: "IIM Bangalore · Enterprise campuses",
    image: editorialServiceImages.audits,
  },
  {
    id: "safecity",
    title: "Safe City",
    layman: "City-wide surveillance, command centres, and coordinated response planning for urban safety.",
    steps: ["City-wide assessment", "Control room design", "Ongoing consulting support"],
    audiences: ["Police", "Municipal corporation", "Smart city SPV"],
    example: "Nanded · Kolhapur · Aurangabad",
    image: editorialServiceImages.safecity,
  },
  {
    id: "smartcity",
    title: "Smart City",
    layman: "Unified planning for urban surveillance, traffic, utilities, and connected civic systems.",
    steps: ["Master planning", "Systems integration", "Operations support"],
    audiences: ["Smart City SPV", "Urban local body", "State urban dept"],
    example: "Aurangabad Smart City",
    image: editorialServiceImages.smartcity,
  },
  {
    id: "egov",
    title: "eGovernance",
    layman: "Secure design of citizen-facing digital services — portals, identity management, and data protection.",
    steps: ["Process review", "Security architecture", "Rollout guidance"],
    audiences: ["State government", "Municipal corporation", "PSU"],
    example: "Udaan iMEGA · Civic portals",
    image: editorialServiceImages.egov,
  },
  {
    id: "training",
    title: "Security Training",
    layman: "Training programmes for security personnel, control room operators, and IT teams.",
    steps: ["Needs assessment", "Hands-on sessions", "Refresher programmes"],
    audiences: ["Security staff", "Control room operators", "IT teams"],
    example: "Industry & government workshops",
    image: editorialServiceImages.training,
  },
];

/** Align with homepage sectors (sectors.js) */
export const serviceDomains = [
  "Information Technology",
  "Cybersecurity",
  "Smart City Safe City",
  "AI",
  "Oil and Gas",
  "Judiciary",
  "Healthcare",
];
