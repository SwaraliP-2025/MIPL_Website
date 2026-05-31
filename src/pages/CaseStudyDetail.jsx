import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import NotFound from "./NotFound";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <NotFound />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{study.title} | MIPL Case Study</title>
        <meta name="description" content={study.summary} />
      </Helmet>

      <PageHero
        eyebrow="Case Study"
        title={study.shortTitle || study.title}
        description={study.summary}
        image={study.image}
        imageFit="contain"
        topChildren={
          <Link
            to="/publications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Publications
          </Link>
        }
      />

      <section className="bg-white px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-[#0f172a]">Client:</span> {study.client}
            {study.year ? ` · ${study.year}` : ""}
          </p>
          <div>
            <h2 className="text-lg font-bold text-[#0f172a]">Challenge</h2>
            <p className="mt-2 leading-7 text-slate-600">{study.challenge}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f172a]">Solution</h2>
            <p className="mt-2 leading-7 text-slate-600">{study.solution}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f172a]">Outcome</h2>
            <p className="mt-2 leading-7 text-slate-600">{study.outcome}</p>
          </div>
          {study.pdfUrl && (
            <a
              href={study.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E9863C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d67734]"
            >
              View full PDF
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDetail;
