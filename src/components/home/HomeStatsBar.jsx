import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 25, suffix: "+", label: "Years experience" },
  { value: 50, suffix: "+", label: "Cities secured" },
  { value: 100, suffix: "+", label: "Projects supported" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-4xl font-black text-[#f0a500] md:text-5xl lg:text-6xl">
        {display}
        {suffix}
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/80 md:text-sm">
        {label}
      </p>
    </div>
  );
}

export const HomeStatsBar = () => (
  <section className="relative z-10 border-y border-white/10 bg-[#0d1b3e] py-12 md:py-14">
    <div className="container mx-auto grid grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:gap-4">
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} {...stat} />
      ))}
    </div>
  </section>
);
