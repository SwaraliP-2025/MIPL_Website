import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { sectors, SECTOR_COUNT, sectorsIntroPhrase } from "@/data/sectors";
import { projectImages } from "@/data/projectImages";
import { getImageLayoutForSrc } from "@/data/projectImages";
import { SectorProjectImage } from "@/components/sectors/SectorProjectImage";
import { HomePublicationsSection } from "@/components/home/HomePublicationsSection";
import { ScrollFloat } from "@/components/ScrollFloat";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { ClientTrustBand } from "@/components/home/ClientTrustBand";
import { HomeStatsBar } from "@/components/home/HomeStatsBar";
import { ChevronDown } from "lucide-react";

function SectionHeading({ eyebrow, title, titleClassName = "", ctaHref, ctaLabel }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">{eyebrow}</p>
        <h2 className={`max-w-4xl text-4xl font-black leading-tight text-[#0f172a] md:text-6xl ${titleClassName}`}>
          {title}
        </h2>
      </div>
      {ctaHref && ctaLabel && (
        <Link
          to={ctaHref}
          className="inline-flex shrink-0 items-center gap-2 bg-[#E9863C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d67734]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

const showcaseCards = [
  {
    title: "Safe & Smart Cities",
    description: "Cameras, control rooms, and city safety planning.",
    image: projectImages.aurangabadSmartCity,
    alt: "Aurangabad Smart City ASCDCL ICCC control room",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Oil & Gas Security",
    description: "Refinery and energy sector security consulting.",
    image: projectImages.mrplFeatured,
    alt: "MRPL Mangalore refinery — team at facility entrance",
    className: "md:col-span-5",
  },
  {
    title: "Large Premises",
    description: "Courts, campuses, and large office sites.",
    image: projectImages.mpHighCourt,
    alt: "Madhya Pradesh High Court security advisory",
    className: "md:col-span-5",
  },
];

const primaryProjects = [
  {
    title: "Aurangabad Smart City",
    description: "Integrated command centre and safe city consulting.",
    image: projectImages.aurangabadSmartCity,
    alt: "Aurangabad Smart City advisory work",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Nanded Safe City",
    description: "City-wide safe city planning and implementation support.",
    image: projectImages.nandedSafeCity,
    alt: "Nanded Safe City advisory work",
    className: "md:col-span-5",
  },
  {
    title: "MRPL Mangaluru",
    description: "Industrial refinery security consulting.",
    image: projectImages.mrplFeatured,
    alt: "MRPL Mangalore refinery — team at facility entrance",
    className: "md:col-span-5",
  },
  {
    title: "Surat Diamond Bourse",
    description: "Large commercial precinct security consulting.",
    image: projectImages.suratDiamond,
    alt: "Surat Diamond Bourse advisory work",
    className: "md:col-span-5",
  },
  {
    title: "Chhatrapati Sambhajinagar Smart Buses",
    eyebrow: "Urban Mobility",
    description:
      "Advisory support for urban mobility — smart bus fleet operations and digital ticketing for Chhatrapati Sambhajinagar.",
    images: [projectImages.chhatrapatiSmartBuses, projectImages.chhatrapatiSmartBusesTicketing],
    alt: "Chhatrapati Sambhajinagar smart bus fleet and digital ticketing",
    className: "md:col-span-12 min-h-[280px] md:min-h-[320px]",
  },
];

const secondaryProjects = [
  {
    title: "MP High Court",
    description: "Judiciary premises security consulting.",
    image: projectImages.mpHighCourt,
    alt: "Madhya Pradesh High Court security advisory",
  },
  {
    title: "Vidhan Bhavan MH",
    description: "Legislative complex security consulting.",
    image: projectImages.vidhanBhavan,
    alt: "Maharashtra Vidhan Bhavan security advisory",
  },
  {
    title: "JNPT",
    description: "Port and maritime security consulting.",
    image: projectImages.jnpt,
    alt: "JNPT port security advisory",
  },
  {
    title: "Kolhapur Corporation",
    description: "Municipal e-governance and urban security consulting.",
    image: projectImages.kolhapurCorp,
    alt: "Kolhapur municipal corporation advisory",
  },
];

const domains = [
  "CCTV & Cameras",
  "Entry & Access Control",
  "Control Rooms",
  "Data Centres",
  "Smart Analytics",
  "Traffic Systems",
  "Connected Devices",
  "Online Safety",
  "Online Government Services",
  "Maps & Location Tools",
  "Biometrics",
  "Safe Cities",
  "Smart Cities",
  "Traffic Management",
  "Emergency Planning",
];

const awards = [
  "GSN Award USA",
  "SECONA Shield (×4)",
  "ASME Global Innovation",
  "Skoch Order of Merit",
  "SEA Shortlist 2023",
  "Gold Medal GoM",
];

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home | MIPL - Security & IT Consultancy</title>
        <meta
          name="description"
          content="MIPL provides security and IT consultancy for cities, refineries, courts, and critical infrastructure across India — trusted since 2000."
        />
        <meta
          name="keywords"
          content="MIPL, home, safe cities, smart governance, command control, enterprise security, security solutions India"
        />
      </Helmet>

      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0d1b3e]">
        <ScrollFloat strength={90} className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${projectImages.aurangabadSmartCity}")` }}
          />
        </ScrollFloat>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b3e]/95 via-[#0d1b3e]/70 to-[#0d1b3e]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e] via-transparent to-[#0d1b3e]/30" />

        <div className="relative z-10 flex flex-1 items-end px-6 pb-24 pt-32 md:px-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#f0a500]">
              Maha Infotech Pvt. Ltd.
            </p>
            <h1 className="text-4xl font-black leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Securing India&apos;s Critical Infrastructure
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 md:text-lg">
              25+ years of expertise in Safe Cities, Smart Governance, ICCC Command &amp; Control,
              and Enterprise Infrastructure Security. Trusted by national institutions and critical
              infrastructure operators across India.
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="bg-[#f0a500] px-8 py-6 text-base font-semibold text-[#0d1b3e] hover:bg-[#e09500]"
              >
                <Link to="/projects">View Our Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <a
          href="#legacy-stats"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/60 transition-colors hover:text-white"
          aria-label="Scroll to stats"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </section>

      <div id="legacy-stats">
        <HomeStatsBar />
      </div>

      <ClientTrustBand />

      <section className="bg-[#f8fafc] px-6 py-20 md:px-10 lg:px-14">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {/* <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
              {SECTOR_COUNT} sectors we serve
            </p> */}
            <h2 className="font-serif text-4xl font-bold leading-[1.15] text-[#0f172a] md:text-5xl lg:text-[3.25rem]">
              Maha Infotech Private Limited     
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              As one of India&apos;s established security and IT consultancies, we provide consulting
              across {SECTOR_COUNT} sectors — {sectorsIntroPhrase}. Our assignments include integrated
              security planning, technology selection, and long-term programme support for government,
              industry, and institutional clients.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-2 bg-[#E9863C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d67734]"
          >
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="card-grid-equal grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            const theme = sector.theme;
            const heroLayout = getImageLayoutForSrc(sector.image, sector.imageLayout);
            const heroTall = heroLayout === "contain";

            return (
              <ScrollFloat key={sector.slug} strength={36} className="h-full min-h-0">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="card-fill group overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`h-1.5 shrink-0 ${theme?.bar || "bg-[#E9863C]"}`} />
                  <div
                    className={`relative overflow-hidden ${heroTall ? "h-60 sm:h-64" : "h-52 sm:h-56"}`}
                  >
                    <SectorProjectImage
                      src={sector.image}
                      alt={sector.imageAlt || sector.name}
                      layout={sector.imageLayout}
                      objectPosition={sector.imagePosition}
                      className="absolute inset-0 h-full w-full"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        theme?.overlay ||
                        "from-[#020617]/90 via-[#020617]/35 to-transparent"
                      }`}
                    />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0f172a]">
                      {sector.label}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div
                        className={`mb-3 inline-flex rounded-full p-3 ${
                          theme?.chip || "bg-[#E9863C]/15 text-[#E9863C]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-2xl font-black text-white">{sector.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-white/85">{sector.summary}</p>
                    </div>
                  </div>

                  <div className="mt-auto p-5">
                    <Link
                      to={`/sectors/${sector.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#244884] transition-colors hover:text-[#E9863C]"
                    >
                      Explore Sector
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              </ScrollFloat>
            );
          })}
        </div>
      </section>

      <section id="work" className="bg-white px-6 py-20 md:px-10 lg:px-14">
        <SectionHeading
          eyebrow="Our Services"
          title="Core service areas."
          titleClassName="max-w-3xl"
          ctaHref="/services"
          ctaLabel="View All Services"
        />

        <div className="grid auto-rows-[260px] gap-5 md:grid-cols-12">
          {showcaseCards.map((card, index) => (
            <ScrollFloat key={card.title} className={card.className} strength={48}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative h-full overflow-hidden"
              >
                <img src={card.image} alt={card.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#E9863C]">Our Services</p>
                  <h3 className="max-w-md text-2xl font-black text-white md:text-4xl">{card.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/75">{card.description}</p>
                </div>
              </motion.article>
            </ScrollFloat>
          ))}
        </div>
      </section>

      <section id="featured-projects" className="bg-[#f8fafc] px-6 py-20 md:px-10 lg:px-14">
        <SectionHeading
          eyebrow="Featured Projects"
          title="National portfolio across critical infrastructure."
          ctaHref="/projects"
          ctaLabel="View All Projects"
        />

        <div className="grid auto-rows-[230px] gap-5 md:grid-cols-12">
          {primaryProjects.map((project, index) => (
            <ScrollFloat key={project.title} className={project.className} strength={44}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group h-full overflow-hidden bg-white shadow-sm"
              >
                <div className="relative h-full">
                  {project.images ? (
                    <div className="grid h-full grid-cols-2">
                      {project.images.map((src, i) => (
                        <img
                          key={src}
                          src={src}
                          alt={i === 0 ? project.alt : `${project.alt} — ticketing`}
                          className="h-full w-full object-cover object-center"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    {project.eyebrow && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#E9863C]">
                        {project.eyebrow}
                      </p>
                    )}
                    <h3 className="text-xl font-black text-white md:text-2xl">{project.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">{project.description}</p>
                  </div>
                </div>
              </motion.article>
            </ScrollFloat>
          ))}
        </div>

        <div className="card-grid-equal mt-5 grid gap-5 md:grid-cols-4">
          {secondaryProjects.map((project, index) => (
            <ScrollFloat key={project.title} strength={32} className="h-full min-h-0">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="card-fill group relative h-72 overflow-hidden bg-white shadow-sm"
              >
                <img src={project.image} alt={project.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-black text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{project.description}</p>
                </div>
              </motion.article>
            </ScrollFloat>
          ))}
        </div>
      </section>

      <ExperienceTimeline />

      <section className="bg-white px-6 py-16 md:px-10 lg:px-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">Capabilities</p>
            <h2 className="text-3xl font-black leading-tight text-[#0f172a] md:text-4xl">
              End-to-end consulting support.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-2 bg-[#E9863C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d67734]"
          >
            View Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-12 md:items-stretch">
          <div className="overflow-hidden md:col-span-7">
            <ScrollFloat strength={40} className="h-full">
              <img
                src="/projects/0148.png"
                alt="Smart city command and control centre expertise"
                className="h-full min-h-[340px] w-full object-cover"
              />
            </ScrollFloat>
          </div>
          <div className="md:col-span-5">
            <ScrollFloat strength={36} className="h-full">
              <div className="flex h-full min-h-[340px] flex-col justify-between bg-[#0f172a] p-8 md:p-10">
                <div>
                  <p className="text-sm leading-7 text-white/70">
                    From risk assessment and system design to implementation guidance and operations support.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <span
                      key={domain}
                      className="border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollFloat>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-6 py-20 md:px-10 lg:px-14">
        <SectionHeading
          eyebrow="Recognition"
          title="Award-winning work."
          ctaHref="/achievements"
          ctaLabel="View Achievements"
        />

        <div className="grid gap-5 md:grid-cols-12 md:items-stretch">
          <ScrollFloat strength={48} className="order-1 md:col-span-5 md:col-start-1">
            <img
              src="/awards/trophy.png"
              alt="MIPL awards and industry recognition"
              className="h-72 w-full object-contain object-left"
            />
          </ScrollFloat>
          <div className="card-grid-equal order-2 grid gap-5 sm:grid-cols-2 md:col-span-7 md:col-start-6 md:grid-cols-3">
            {awards.map((award, index) => (
              <ScrollFloat key={award} strength={26 + index * 2} className="h-full min-h-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="card-fill flex min-h-[132px] items-end border border-slate-200 bg-white p-5"
                >
                  <p className="text-base font-black leading-6 text-[#0f172a]">{award}</p>
                </motion.div>
              </ScrollFloat>
            ))}
          </div>
        </div>
      </section>

      <HomePublicationsSection />

      <section className="bg-white px-6 py-20 md:px-10 lg:px-14">
        <div className="grid gap-5 md:grid-cols-12">
          <ScrollFloat strength={40} className="md:col-span-4">
            <div className="flex h-full flex-col justify-between border border-slate-200 bg-[#0f172a] p-8 md:p-10">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">CSR</p>
                <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">Inclusive education.</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
                  Founders of Aatman Academy since 2010.
                </p>
              </div>
              <Link
                to="/social-activities"
                className="mt-8 inline-flex w-fit items-center gap-2 bg-[#E9863C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d67734]"
              >
                Our Social Impact
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollFloat>
          <ScrollFloat strength={52} className="relative min-h-[420px] overflow-hidden md:col-span-8">
            <img
              src="/social-activities/aatman/gallery-students-01.jpg"
              alt="Aatman Academy social impact and inclusive education"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
          </ScrollFloat>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
