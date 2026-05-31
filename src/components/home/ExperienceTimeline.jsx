import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { experienceMilestones, experienceStats } from "@/data/experienceTimeline";

const CARD_HEIGHT = "h-[148px]";

const MilestoneCard = ({ item, className = "" }) => {
  const showFullImage = item.imageFit === "contain";

  return (
  <article
    className={`group flex ${CARD_HEIGHT} overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] shadow-lg shadow-black/25 transition-colors hover:border-[#E9863C]/40 ${className}`}
  >
    <div
      className={`relative h-full shrink-0 self-stretch overflow-hidden bg-[#0f172a] ${
        showFullImage ? "w-36 sm:w-40" : "w-32 sm:w-36"
      }`}
    >
      {showFullImage ? (
        <>
          <img
            src={item.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-lg"
          />
          <img
            src={item.image}
            alt={item.alt}
            className="relative z-10 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        </>
      ) : (
        <img
          src={item.image}
          alt={item.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
        />
      )}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#020617]/50 to-transparent" />
    </div>
    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
      <span className="mb-1 w-fit rounded-sm bg-[#E9863C]/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
        {item.tag}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black text-[#E9863C]">{item.year}</span>
        <h3 className="truncate text-sm font-bold text-white">{item.title}</h3>
      </div>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/70">{item.caption}</p>
    </div>
  </article>
  );
};

const MilestoneRow = ({ item, index }) => {
  const isLeft = item.timelineSide === "left" || (item.timelineSide !== "right" && index % 2 === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.55 }}
      className="relative grid grid-cols-[20px_1fr] items-center gap-4 md:grid-cols-[1fr_32px_1fr] md:gap-0"
    >
      <div
        className={`hidden md:flex md:col-start-1 md:items-center ${
          isLeft ? "md:justify-end md:pr-6" : "md:justify-end md:pr-6 md:invisible"
        }`}
      >
        {isLeft && <MilestoneCard item={item} className="w-full max-w-md" />}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center md:col-start-2 md:row-start-1">
        <span
          className={`pointer-events-none absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-[#E9863C]/60 md:block ${
            isLeft ? "right-full mr-1" : "left-full ml-1"
          }`}
          aria-hidden
        />
        <div
          className="h-3 w-3 shrink-0 rounded-full border-2 border-[#E9863C] bg-[#E9863C] shadow-[0_0_14px_rgba(233,134,60,0.55)] ring-4 ring-[#020617]"
          aria-hidden
        />
      </div>

      <div className="col-start-2 md:hidden">
        <MilestoneCard item={item} />
      </div>

      <div
        className={`hidden md:flex md:col-start-3 md:items-center ${
          isLeft ? "md:justify-start md:pl-6 md:invisible" : "md:justify-start md:pl-6"
        }`}
      >
        {!isLeft && <MilestoneCard item={item} className="w-full max-w-md" />}
      </div>
    </motion.div>
  );
};

export const ExperienceTimeline = () => {
  return (
    <section id="our-journey" className="relative overflow-hidden bg-[#020617]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #64DFDF 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative border-b border-white/10 px-6 py-10 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#E9863C]">
            Our Journey · 2000 — 2026
          </p>
          <p className="mx-auto mb-3 max-w-xl text-sm leading-6 text-white/60">
            Key milestones with government, municipal, energy, and judiciary clients across India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {experienceStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-center"
            >
              <div className="text-xl font-black text-[#E9863C] sm:text-2xl">{stat.value}</div>
              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-white/55 sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative px-6 py-12 md:px-10 lg:px-14">
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-6 left-[9px] top-6 w-px bg-gradient-to-b from-[#E9863C] via-[#64DFDF]/50 to-[#E9863C]/20 md:left-1/2 md:-translate-x-px" />
          <div
            className="pointer-events-none absolute bottom-6 left-[5px] top-6 w-[9px] -translate-x-1/2 bg-[#E9863C]/20 blur-md md:left-1/2"
            aria-hidden
          />

          <div className="relative space-y-8 md:space-y-10">
            {experienceMilestones.map((item, index) => (
              <MilestoneRow key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-8 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-white/65 sm:text-left md:text-base">
            Government, public sector, and critical infrastructure engagements — year by year.
          </p>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 sm:justify-end">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#E9863C] hover:text-[#E9863C]"
            >
              About MIPL
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#E9863C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d67734]"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
