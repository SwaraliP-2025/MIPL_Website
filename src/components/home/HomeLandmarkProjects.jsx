import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollFloat } from "@/components/ScrollFloat";

const landmarks = [
  {
    title: "Nanded Safe City",
    year: "Award-winning",
    impact: "Nationally recognised safe city programme",
    image: "/projects/nanded corp.jpg",
    alt: "Nanded Safe City project",
  },
  {
    title: "HPCL Pan-India Biometrics",
    year: "World-scale deployment",
    impact: "Among the largest biometric access programmes globally",
    image: "/projects/hpclmum.jpg",
    alt: "HPCL pan-India biometric security advisory",
  },
  {
    title: "Kolhapur Smart City",
    year: "Maharashtra",
    impact: "Integrated urban security for a growing civic region",
    image: "/projects/kolh corp.jpg",
    alt: "Kolhapur municipal smart city advisory",
  },
];

export const HomeLandmarkProjects = () => (
  <section className="overflow-hidden bg-[#0d1b3e] px-6 py-20 md:px-10 lg:px-14">
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#f0a500]">
            Landmark projects
          </p>
          <h2 className="text-3xl font-black text-white md:text-4xl">
            Projects of national significance
          </h2>
        </div>
        <Link
          to="/projects"
          className="inline-flex shrink-0 items-center gap-2 border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
        >
          All projects
        </Link>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {landmarks.map((project, index) => (
          <ScrollFloat key={project.title} strength={36 + index * 2} className="shrink-0 snap-start">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex w-[min(88vw,340px)] flex-col overflow-hidden border border-white/15 bg-white/5 md:w-[380px]"
            >
              <div className="flex h-52 items-center justify-center bg-[#0f172a] p-3">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#f0a500]">
                  {project.year}
                </p>
                <h3 className="mt-2 text-xl font-black text-white">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/75">{project.impact}</p>
              </div>
            </motion.article>
          </ScrollFloat>
        ))}
      </div>
    </div>
  </section>
);
