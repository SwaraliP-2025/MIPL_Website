import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { aboutAwards } from "@/data/aboutTimeline";
import { ScrollFloat } from "@/components/ScrollFloat";

export const AboutAwardsGrid = () => (
  <section className="bg-white px-6 py-20 md:px-10 lg:px-14">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#E9863C]">
          Recognition
        </p>
        <h2 className="text-3xl font-black text-[#0d1b3e]">Awards & achievements</h2>
      </motion.div>
      <div className="card-grid-equal grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {aboutAwards.map((award, index) => (
          <ScrollFloat key={award.title} strength={24 + index * 2} className="h-full min-h-0">
            <div className="card-fill flex flex-col border border-slate-200 bg-slate-50 p-6">
              <Award className="mb-3 h-8 w-8 text-[#1565c0]" />
              <h3 className="font-bold text-[#0d1b3e]">{award.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{award.place}</p>
              <p className="mt-2 text-xs font-semibold text-[#1565c0]">{award.years}</p>
            </div>
          </ScrollFloat>
        ))}
      </div>
    </div>
  </section>
);
