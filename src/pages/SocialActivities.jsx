import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";
import { EditorialProjectStrip } from "@/components/home/EditorialProjectStrip";
import {
  aatmanHero,
  aatmanHighlights,
  aatmanLeadStory,
  aatmanStories,
  aatmanPhotoGrid,
  aatmanGalleryMosaic,
} from "@/data/aatmanAcademy";
import {
  seconaHero,
  seconaLeadStory,
  seconaStories,
  seconaTrainingAudiences,
  seconaPhotoGrid,
} from "@/data/secona";
import { socialPageHero, socialDualPillars } from "@/data/socialContributions";
import { EditorialStory, EditorialPhotoGrid } from "@/components/social/EditorialStory";
import { ArrowDown, Award, ExternalLink, Users } from "lucide-react";

const SocialActivities = () => {
  return (
    <Layout>
      <PageHero
        eyebrow={socialPageHero.eyebrow}
        title={socialPageHero.title}
        description={socialPageHero.description}
        image={socialPageHero.image}
        imagePosition={socialPageHero.imagePosition}
      />

      {/* Two pillars — MIPL social work */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
              By MIPL leadership
            </p>
            <h2 className="text-3xl font-black text-[#0f172a] md:text-4xl">
              Two missions. One commitment to service.
            </h2>
          </motion.div>
          <div className="card-grid-equal mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {socialDualPillars.map((pillar, index) => (
              <ScrollFloat key={pillar.id} strength={36 + index * 4} className="h-full min-h-0">
                <a
                  href={`#${pillar.id}`}
                  className="card-fill group flex flex-col overflow-hidden border border-slate-200 bg-slate-50 transition-colors hover:border-[#E9863C]/50"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.name}
                      className="h-full w-full object-contain object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                    <p className="absolute bottom-4 left-4 text-xl font-black text-white">
                      {pillar.name}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm font-semibold text-[#E9863C]">{pillar.tagline}</p>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{pillar.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0f172a] group-hover:text-[#E9863C]">
                      {pillar.cta}
                      <ArrowDown className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </ScrollFloat>
            ))}
          </div>
        </div>
      </section>

      {/* ——— AATMAN ACADEMY ——— */}
      <div id="aatman" className="scroll-mt-28 border-b border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-[#0f172a] px-6 py-10 text-center md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
            {aatmanHero.title}
          </p>
          <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">{aatmanHero.headline}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/75">{aatmanHero.tagline}</p>
        </div>

        <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
          <EditorialStory featured {...aatmanLeadStory} strength={52} />
          <div className="mb-12 grid grid-cols-2 gap-6 border-y border-slate-200 py-8 lg:grid-cols-4">
            {aatmanHighlights.map((stat, index) => (
              <ScrollFloat key={stat.label} strength={18 + index * 2}>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#E9863C]">{stat.value}</div>
                  <p className="mt-1 text-xs font-medium text-slate-600">{stat.label}</p>
                </div>
              </ScrollFloat>
            ))}
          </div>
          {aatmanStories.map((story, index) => (
            <EditorialStory
              key={story.headline}
              {...story}
              reverse={index % 2 === 1}
              strength={38 + index * 2}
            />
          ))}
        </section>

        <EditorialPhotoGrid title="Life at Aatman — official gallery" photos={aatmanPhotoGrid} />

        <section className="bg-white px-4 py-12 md:px-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-8 text-center text-xl font-black text-[#0f172a] md:text-2xl">
              More from the academy
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {aatmanGalleryMosaic.map((item, index) => (
                <ScrollFloat
                  key={item.label}
                  strength={24 + index * 2}
                  className={`overflow-hidden border border-slate-200 bg-[#f1f5f9] ${item.span ?? ""}`}
                >
                  <div className="flex aspect-square items-center justify-center p-2 md:p-3">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="border-t border-slate-200 bg-white px-2 py-2 text-center text-xs font-semibold text-slate-700">
                    {item.label}
                  </p>
                </ScrollFloat>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ——— SECONA ——— */}
      <div id="secona" className="scroll-mt-28 border-t border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-[#0f172a] px-6 py-10 text-center md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
            {seconaHero.title}
          </p>
          <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">{seconaHero.subtitle}</h2>
        </div>

        <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
          <EditorialStory featured {...seconaLeadStory} strength={52} />

          <div className="mb-12 flex flex-wrap justify-center gap-3 border-y border-slate-200 py-8">
            {seconaTrainingAudiences.map((audience) => (
              <span
                key={audience}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              >
                <Users className="h-4 w-4 text-[#E9863C]" />
                {audience}
              </span>
            ))}
          </div>

          {seconaStories.map((story, index) => (
            <EditorialStory
              key={story.headline}
              {...story}
              reverse={index % 2 === 1}
              strength={38 + index * 2}
            />
          ))}
        </section>

        <EditorialPhotoGrid title="SECONA in the field" photos={seconaPhotoGrid} />

        <section className="border-t border-slate-200 bg-[#0f172a] px-6 py-14 text-center md:px-10">
          <a
            href={seconaHero.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E9863C] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#d67734]"
          >
            Visit secona.org
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={seconaHero.shieldAwardsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Shield Awards
            <Award className="h-4 w-4" />
          </a>
        </section>
      </div>

      <EditorialProjectStrip
        eyebrow="Community in action"
        title="Impact beyond the project site."
        ctaHref="/about"
        ctaLabel="About MIPL"
        images={[
          { image: "/social-activities/aatman/gallery-students-01.jpg", label: "Aatman students" },
          { image: "/social-activities/aatman/gallery-classroom-01.jpg", label: "Classroom" },
          { image: "/social-activities/secona/shield-awards-banner.jpg", label: "Shield Awards" },
          { image: "/social-activities/aatman/gallery-activities-01.jpg", label: "Activities" },
          { image: "/social-activities/secona/initiative-1.jpg", label: "SECONA training" },
          { image: "/social-activities/aatman/gallery-students-07.jpg", label: "Inclusive school" },
        ]}
      />
    </Layout>
  );
};

export default SocialActivities;
