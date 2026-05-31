import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { publicationArticles } from "@/data/publicationArticles";
import { publicationSpotlights } from "@/data/publicationSpotlights";
import { ScrollFloat } from "@/components/ScrollFloat";

const articleCards =
  publicationArticles.length > 0 ? publicationArticles : publicationSpotlights;

export const HomePublicationsSection = () => (
  <section className="border-y border-slate-200 bg-white px-6 py-20 md:px-10 lg:px-14">
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
            Publications
          </p>
          <h2 className="text-3xl font-black text-[#0f172a] md:text-4xl">
            Case studies &amp; technical writing
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Documented assignments and research from MIPL&apos;s consulting work across
            government, judiciary, and critical infrastructure.
          </p>
        </div>
        <Link
          to="/publications"
          className="inline-flex shrink-0 items-center gap-2 bg-[#E9863C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d67734]"
        >
          View all publications
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#1565c0]">
        Case studies
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {caseStudies.map((study, index) => (
          <ScrollFloat key={study.slug} strength={32 + index * 4}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex h-full flex-col overflow-hidden border border-slate-200 bg-[#f8fafc] shadow-sm"
            >
              <div className="flex h-52 items-center justify-center bg-[#0f172a] p-4">
                <img
                  src={study.image}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-sm bg-[#E9863C]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#E9863C]">
                    Case study
                  </span>
                  <span className="text-xs text-slate-500">{study.year}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-[#0f172a]">{study.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {study.summary}
                </p>
                {study.pdfUrl && (
                  <a
                    href={study.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#244884] hover:text-[#E9863C]"
                  >
                    View PDF
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.article>
          </ScrollFloat>
        ))}
      </div>

      <p className="mb-4 mt-14 text-xs font-semibold uppercase tracking-[0.2em] text-[#1565c0]">
        Articles &amp; papers
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {articleCards.map((item, index) => {
          const key = item.slug || item.title;
          const isArticle = Boolean(item.slug && publicationArticles.length > 0);
          return (
            <ScrollFloat key={key} strength={24 + index * 4}>
              <motion.article className="flex h-full flex-col border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-block w-fit rounded-sm bg-[#1565c0]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1565c0]">
                  {item.type || "Article"}
                </span>
                <h3 className="mt-3 font-bold leading-snug text-[#0f172a]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
                {isArticle ? (
                  <Link
                    to={`/article/${item.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#244884] hover:text-[#E9863C]"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/publications"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#244884] hover:text-[#E9863C]"
                  >
                    View publications
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </motion.article>
            </ScrollFloat>
          );
        })}
      </div>
    </div>
  </section>
);
