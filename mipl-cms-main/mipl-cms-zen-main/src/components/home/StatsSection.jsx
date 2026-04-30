import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";

const StatItem = ({ value, suffix, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="relative inline-block">
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text notranslate">
          {count}
          {suffix}
        </span>
        <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10" />
      </div>
      <p className="mt-4 text-muted-foreground text-lg">{label}</p>
    </motion.div>
  );
};

export const StatsSection = () => {
  const stats = [
    { value: 25, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Major Projects" },
    { value: 500, suffix: "+", label: "Security Audits" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <SubtleNetworkBackground />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Delivering excellence across industries with proven results
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
