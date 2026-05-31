import { motion } from "framer-motion";
import { aboutTimeline } from "@/data/aboutTimeline";
import { ScrollFloat } from "@/components/ScrollFloat";

export const AboutTimeline = () => (
  <section className="bg-[#f8fafc] px-6 py-20 md:px-10 lg:px-14">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="mb-2 border-l-4 border-[#f0a500] pl-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#1565c0]">
          Our journey
        </p>
        <h2 className="text-3xl font-black text-[#0d1b3e] md:text-4xl">Founded in 2000. Built on trust.</h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          When Indian cities needed security expertise, Prasad Patil and Sudhir Deshpande built
          India&apos;s most trusted independent consultancy — one milestone at a time.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-[#1565c0]/20 md:left-1/2 md:block md:-translate-x-px" />
        <div className="space-y-8">
          {aboutTimeline.map((item, index) => (
            <ScrollFloat key={item.year} strength={28 + index * 2}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:absolute md:left-1/2 md:z-10 md:h-4 md:w-4 md:-translate-x-1/2 md:rounded-full md:bg-[#f0a500] md:ring-4 md:ring-[#f8fafc]" />
                <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-2xl font-black text-[#1565c0]">{item.year}</span>
                  <h3 className="mt-1 text-lg font-bold text-[#0d1b3e]">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </div>
                <div className="md:w-[calc(50%-2rem)]" />
              </motion.div>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </div>
  </section>
);
