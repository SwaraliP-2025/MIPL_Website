import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollFloat } from "@/components/ScrollFloat";
import { projectShowcaseImages } from "@/data/experienceTimeline";

export const EditorialProjectStrip = ({
  eyebrow = "Client Work",
  title = "Sites we have advised on.",
  ctaHref = "/projects",
  ctaLabel = "Explore Projects",
  images = projectShowcaseImages,
}) => {
  return (
    <section className="bg-[#f8fafc] px-6 py-16 md:px-10 lg:px-14">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-black text-[#0f172a] md:text-5xl">{title}</h2>
        </div>
        <Link
          to={ctaHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#244884] hover:text-[#E9863C]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item, index) => (
          <ScrollFloat key={item.label} strength={32 + index * 2}>
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden bg-white"
            >
              <img
                src={item.image}
                alt={item.label}
                className="h-full w-full object-contain object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-lg font-black text-white">{item.label}</p>
              </figcaption>
            </motion.figure>
          </ScrollFloat>
        ))}
      </div>
    </section>
  );
};
