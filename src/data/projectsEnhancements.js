import { caseStudies } from "./caseStudies";

export const featuredCaseStudies = caseStudies.map((study) => ({
  slug: study.slug,
  title: study.title,
  tagline: study.tagline,
  challenge: study.challenge,
  solution: study.solution,
  outcome: study.outcome,
  image: study.image,
  pdfUrl: study.pdfUrl,
}));

export const clientTestimonials = [
  {
    quote: "MIPL brought clarity to a complex city-wide security programme — practical advice we could act on.",
    author: "Municipal client",
    org: "Safe city programme",
  },
  {
    quote: "Their team understood refinery operations and security together — rare in this industry.",
    author: "Energy sector client",
    org: "Pan-India rollout",
  },
];
