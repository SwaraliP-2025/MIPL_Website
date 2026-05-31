import { motion } from "framer-motion";
import { useState } from "react";
import { Building2, Zap, Lock, Eye, Cpu, Shield, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    id: 1,
    title: "Safe & Smart Cities",
    description: "Comprehensive city-wide security solutions including surveillance, command & control, and emergency management",
    icon: Building2,
    span: "md:col-span-2",
    metrics: [
      { label: "Cities Deployed", value: "15+" },
      { label: "Citizens Served", value: "5M+" },
      { label: "Uptime", value: "99.95%" },
    ],
  },
  {
    id: 2,
    title: "Risk Analysis & Audits",
    description: "Threat and risk assessment plus vulnerability reviews for critical infrastructure",
    icon: Shield,
    span: "md:col-span-1",
  },
  {
    id: 3,
    title: "Video Surveillance",
    description: "Advanced CCTV systems with AI-powered video analytics",
    icon: Eye,
    span: "md:col-span-1",
  },
  {
    id: 4,
    title: "Command & Control Centers",
    description: "ICCC systems for real-time emergency response and city management",
    icon: Zap,
    span: "md:col-span-2",
    metrics: [
      { label: "Command Centers", value: "20+" },
      { label: "Response Time", value: "<2 mins" },
      { label: "Integrated Systems", value: "50+" },
    ],
  },
  {
    id: 5,
    title: "Data Centres",
    description: "Secure data centre design and implementation",
    icon: Cpu,
    span: "md:col-span-1",
  },
  {
    id: 6,
    title: "Biometrics & Access Control",
    description: "Biometric identification and access control systems for large premises",
    icon: Lock,
    span: "md:col-span-1",
  },
  {
    id: 7,
    title: "Cyber Security",
    description: "Comprehensive cybersecurity solutions including threat protection, vulnerability assessments, and incident response",
    icon: ShieldCheck,
    span: "md:col-span-1",
  },
  {
    id: 8,
    title: "eGovernance & mGovernance",
    description: "Digital governance solutions for government departments",
    icon: Building2,
    span: "md:col-span-1",
  },
  {
    id: 9,
    title: "AI/ML & Analytics",
    description: "Machine learning and AI-powered analytics for security and governance",
    icon: Cpu,
    span: "md:col-span-2",
  },
  {
    id: 10,
    title: "Emergency Management",
    description: "SOPs and emergency response systems for critical situations",
    icon: Zap,
    span: "md:col-span-1",
  },
  {
    id: 11,
    title: "Traffic Management",
    description: "ITMS and intelligent traffic management systems",
    icon: Building2,
    span: "md:col-span-1",
  },
];

export const BentoCapabilityMatrix = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  };

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-slate-900" />
            <span className="text-xs uppercase tracking-widest font-light text-slate-600">
              Capability Matrix
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light tracking-tighter text-slate-900 leading-[1.1]">
            Enterprise Solutions for National Scale
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl">
            Integrated security and governance platforms designed for India's most critical infrastructure.
          </p>
        </motion.div>
      </div>

      {/* Bento grid */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            const isHovered = hoveredId === capability.id;

            return (
              <motion.div
                key={capability.id}
                variants={itemVariants}
                className={`${capability.span} group relative`}
                onMouseEnter={() => setHoveredId(capability.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div
                  className="relative h-full p-8 border border-slate-200/80 bg-white overflow-hidden cursor-pointer"
                  animate={{
                    scale: isHovered ? 1.01 : 1,
                    boxShadow: isHovered
                      ? "0 20px 40px rgba(0, 0, 0, 0.08)"
                      : "0 0px 0px rgba(0, 0, 0, 0)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  {/* Background shift on hover */}
                  <motion.div
                    className="absolute inset-0 bg-slate-50"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 flex items-center justify-center border border-slate-200 bg-white"
                    >
                      <Icon className="w-6 h-6 text-slate-900" strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-light tracking-tight text-slate-900 leading-tight">
                      {capability.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      {capability.description}
                    </p>

                    {/* Metrics (if available) */}
                    {capability.metrics && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          height: isHovered ? "auto" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 border-t border-slate-200"
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {capability.metrics.map((metric, idx) => (
                            <div key={idx}>
                              <p className="text-xl font-light text-slate-900">
                                {metric.value}
                              </p>
                              <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">
                                {metric.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Border highlight on hover */}
                  <motion.div
                    className="absolute inset-0 border border-slate-900 pointer-events-none"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
