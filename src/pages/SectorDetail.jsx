import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";
import { getSectorBySlug, sectors } from "@/data/sectors";
import { getImageLayoutForSrc } from "@/data/projectImages";
import { SectorProjectImage } from "@/components/sectors/SectorProjectImage";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const SectorDetail = () => {
  const { slug } = useParams();
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return <NotFound />;
  }

  const relatedSectors = sectors
    .filter((item) => item.slug !== sector.slug)
    .slice(0, 3);

  return (
    <Layout>
      <Helmet>
        <title>{sector.name} | MIPL Sector Expertise</title>
        <meta
          name="description"
          content={`${sector.name} solutions by MIPL. ${sector.summary}`}
        />
        <meta
          name="keywords"
          content={`MIPL, ${sector.name}, ${sector.label}, sector expertise, consulting, critical infrastructure`}
        />
      </Helmet>

      <PageHero
        eyebrow={sector.label}
        title={sector.name}
        description={sector.overview}
        image={sector.image}
        imageFit={getImageLayoutForSrc(sector.image, sector.imageLayout)}
        imagePosition="center center"
        topChildren={
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        }
      >
        <div className="flex flex-wrap gap-4">
          <Button asChild className="bg-[#E9863C] text-white hover:bg-[#d67734]">
            <Link to="/contact">Talk To MIPL</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white hover:text-[#0f172a]"
          >
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>
      </PageHero>

      <section className="bg-white px-6 py-20 md:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <ScrollFloat strength={34} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
                Sector Overview
              </p>
              <h2 className="text-4xl font-black leading-tight text-[#0f172a] md:text-5xl">
                Advice for important, high-pressure sites.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
                {sector.summary}
              </p>
            </motion.div>
          </ScrollFloat>

          <ScrollFloat strength={38} className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="h-full border border-slate-200 bg-[#f8fafc] p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#244884]">
                Why It Matters
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                MIPL brings sector know-how and practical planning to places where safety, uptime, and clear visibility matter every day.
              </p>
            </motion.div>
          </ScrollFloat>
        </div>
      </section>

      {sector.projectImages?.length > 0 && (
        <section className="bg-[#f8fafc] px-6 py-20 md:px-10 lg:px-14">
          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
              Client Work
            </p>
            <h2 className="text-4xl font-black leading-tight text-[#0f172a] md:text-5xl">
              Real sites we have advised on.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sector.projectImages.map((item, index) => (
              <ScrollFloat key={`${item.label}-${index}`} strength={32 + index * 2}>
                <motion.figure
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden border border-slate-200"
                >
                  <SectorProjectImage
                    src={item.image}
                    alt={item.alt}
                    layout={item.layout}
                    className="absolute inset-0 h-full w-full"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
                      sector.theme?.overlay ||
                      "from-[#020617]/90 via-[#020617]/20 to-transparent"
                    }`}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-lg font-black text-white">{item.label}</p>
                  </figcaption>
                </motion.figure>
              </ScrollFloat>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white px-6 py-20 md:px-10 lg:px-14">
        <div className="mb-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
              Focus Areas
            </p>
            <h2 className="text-4xl font-black leading-tight text-[#0f172a] md:text-5xl">
              Core priorities in this sector.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-sm leading-7 text-slate-600">
              We keep it practical: understand the need, plan the right systems, and guide safe day-to-day use.
            </p>
          </div>
        </div>

        <div className="card-grid-equal grid gap-5 md:grid-cols-2">
          {sector.focusAreas.map((item, index) => (
            <ScrollFloat key={item} strength={30 + index * 2} className="h-full min-h-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card-fill min-h-[140px] border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 inline-flex rounded-full bg-[#E9863C]/10 p-3 text-[#E9863C]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-lg font-semibold leading-7 text-[#0f172a]">{item}</p>
              </motion.div>
            </ScrollFloat>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] px-6 py-20 md:px-10 lg:px-14">
        <div className="mb-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
              Expected Outcomes
            </p>
            <h2 className="text-4xl font-black leading-tight text-[#0f172a] md:text-5xl">
              What good planning can achieve.
            </h2>
          </div>
        </div>

        <div className="card-grid-equal grid gap-5 md:grid-cols-3">
          {sector.outcomes.map((item, index) => (
            <ScrollFloat key={item} strength={32 + index * 2} className="h-full min-h-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card-fill min-h-[160px] border border-slate-200 bg-[#0f172a] p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E9863C]">
                  Outcome {index + 1}
                </p>
                <p className="mt-4 text-lg font-semibold leading-7 text-white">{item}</p>
              </motion.div>
            </ScrollFloat>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 lg:px-14">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
              Explore More
            </p>
            <h2 className="text-4xl font-black leading-tight text-[#0f172a] md:text-5xl">
              Related sectors.
            </h2>
          </div>
        </div>

        <div className="card-grid-equal grid gap-5 md:grid-cols-3">
          {relatedSectors.map((item, index) => {
            const RelatedIcon = item.icon;

            return (
              <ScrollFloat key={item.slug} strength={34 + index * 2} className="h-full min-h-0">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="card-fill overflow-hidden border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 inline-flex rounded-full bg-[#244884]/10 p-3 text-[#244884]">
                    <RelatedIcon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E9863C]">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-[#0f172a]">{item.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 line-clamp-4">{item.summary}</p>
                  <Link
                    to={`/sectors/${item.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#244884] transition-colors hover:text-[#E9863C]"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  </div>
                </motion.article>
              </ScrollFloat>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default SectorDetail;
