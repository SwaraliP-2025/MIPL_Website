import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { useCmsSheet } from "@/hooks/useCmsConfig";
import { 
  Users, 
  Globe, 
  Shield, 
  Award, 
  Target, 
  Zap, 
  CheckCircle2, 
  BarChart3,
  Search,
  CheckCircle
} from "lucide-react";

const iconMap = {
  Users,
  Globe,
  Shield,
  Award,
  Target,
  Zap,
  CheckCircle2,
  BarChart3,
  Search,
  CheckCircle
};

const StatItem = ({ value, suffix = "", label, delay }) => {
  // Parse numeric value from string (e.g. "25+" -> 25)
  const numericValue = parseInt(value) || 0;
  const displaySuffix = suffix || (typeof value === 'string' ? value.replace(/[0-9]/g, '') : "");
  
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

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
          {displaySuffix}
        </span>
        <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10" />
      </div>
      <p className="mt-4 text-muted-foreground text-lg">{label}</p>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { data: cmsStats, loading } = useCmsSheet('Stats', [
    { value: "25+", label: "Years Experience", page: "home" },
    { value: "50+", label: "Major Projects", page: "home" },
    { value: "500+", label: "Security Audits", page: "home" },
    { value: "100%", label: "Client Satisfaction", page: "home" },
  ]);

  // Handle case where cmsStats might not have 'page' property correctly set or is empty
  const homeStats = cmsStats.filter(s => (s.page || '').toLowerCase().trim() === 'home');
  const stats = homeStats.length > 0 ? homeStats : [
    { value: "25+", label: "Years Experience", page: "home" },
    { value: "50+", label: "Major Projects", page: "home" },
    { value: "500+", label: "Security Audits", page: "home" },
    { value: "100%", label: "Client Satisfaction", page: "home" },
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
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
