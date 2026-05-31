import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollFloat } from "@/components/ScrollFloat";

const leaders = [
  {
    name: "Prasad Patil",
    title: "Director, MIPL",
    image: "/ps_img-removebg-preview.png",
    badges: ["IIM Bangalore MBA", "Founder Chairman, SECONA"],
    points: [
      "25+ years in security & IT consulting",
      "Advisor to municipal corporations & PSUs",
      "Founder of SECONA — India's security consultants' platform",
    ],
  },
  {
    name: "Sudhir Deshpande",
    title: "Director, MIPL",
    image: "/ss_img-removebg-preview.png",
    badges: ["Electronics Engineer, JNEC"],
    points: [
      "20+ years in CCTV, access control & command centres",
      "Lead consultant — Nanded Safe City & Maharashtra cities",
      "Pan-India HPCL biometric rollout — among the world's largest",
    ],
  },
];

export const HomeLeadershipStrip = () => (
  <section className="bg-white px-6 py-20 md:px-10 lg:px-14">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-3xl"
      >
        <p className="mb-3 border-l-4 border-[#f0a500] pl-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#1565c0]">
          Leadership
        </p>
        <h2 className="text-3xl font-black leading-tight text-[#0d1b3e] md:text-4xl lg:text-5xl">
          Founded by engineers who became India&apos;s top security consultants
        </h2>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {leaders.map((leader, index) => (
          <ScrollFloat key={leader.name} strength={40 + index * 4}>
            <article className="flex h-full flex-col overflow-hidden border border-slate-200 bg-[#f8fafc] md:flex-row">
              <div className="flex shrink-0 items-center justify-center bg-white p-6 md:w-[220px]">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="max-h-52 w-full max-w-[180px] object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="text-2xl font-black text-[#0d1b3e]">{leader.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[#1565c0]">{leader.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {leader.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-[#f0a500]/40 bg-[#f0a500]/10 px-3 py-1 text-xs font-semibold text-[#0d1b3e]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 flex-1 space-y-2 text-sm leading-7 text-slate-600">
                  {leader.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E9863C]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </ScrollFloat>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 bg-[#0d1b3e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1565c0]"
        >
          Our story since 2000
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);
