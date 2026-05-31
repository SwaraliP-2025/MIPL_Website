import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredCaseStudies } from "@/data/projectsEnhancements";
import { projectImages } from "@/data/projectImages";
import { ScrollFloat } from "@/components/ScrollFloat";

export const ProjectsImpactBanner = () => (
  <section className="relative overflow-hidden bg-[#0d1b3e] py-20">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-30"
      style={{ backgroundImage: `url(${projectImages.aurangabadSmartCity})` }}
    />
    <div className="absolute inset-0 bg-[#0d1b3e]/85" />
    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
      <h2 className="text-3xl font-black text-white md:text-5xl">
        Projects that touch millions of lives every day
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-white/80">
        Cities, refineries, courts, and campuses — 25 years of consulting work across India.
      </p>
    </div>
  </section>
);

export const ProjectsFeaturedCases = () => (
  <section className="bg-white px-6 py-20 md:px-10 lg:px-14">
    <div className="mx-auto max-w-6xl">
      <p className="mb-2 border-l-4 border-[#f0a500] pl-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#1565c0]">
        Case studies
      </p>
      <h2 className="mb-10 text-3xl font-black text-[#0d1b3e]">Featured case studies</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {featuredCaseStudies.map((c, i) => (
          <ScrollFloat key={c.slug} strength={32 + i * 4}>
            <article className="flex h-full flex-col overflow-hidden border border-slate-200">
              <div className="flex h-48 items-center justify-center bg-[#f1f5f9] p-3">
                <img src={c.image} alt={c.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase text-[#f0a500]">{c.tagline}</p>
                <h3 className="mt-2 text-xl font-black text-[#0d1b3e]">{c.title}</h3>
                <p className="mt-4 font-semibold text-[#1565c0]">{c.outcome}</p>
                {c.pdfUrl && (
                  <a
                    href={c.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#E9863C] hover:text-[#d67734]"
                  >
                    View PDF
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          </ScrollFloat>
        ))}
      </div>
    </div>
  </section>
);
