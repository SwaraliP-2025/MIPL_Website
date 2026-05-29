import { motion } from "framer-motion";
import { Shield, Building2, Zap, Lock, Eye, Radio, Cpu } from "lucide-react";
import { useState } from "react";

const capabilities = [
  {
    id: 1,
    title: "Security Consultancy",
    description: "Strategic security assessments and infrastructure hardening",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    subcapabilities: [
      "Risk Assessment & Mitigation",
      "Security Architecture Design",
      "Compliance & Governance",
      "Incident Response Planning"
    ]
  },
  {
    id: 2,
    title: "Safe & Smart Cities",
    description: "Integrated urban governance and public safety systems",
    icon: Building2,
    color: "from-orange-500 to-orange-600",
    subcapabilities: [
      "ICCC Command & Control",
      "Traffic Management Systems",
      "Public Safety Networks",
      "Emergency Response Coordination"
    ]
  },
  {
    id: 3,
    title: "E-Governance Solutions",
    description: "Digital transformation for government institutions",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    subcapabilities: [
      "Digital Service Platforms",
      "Citizen Engagement Systems",
      "Data Management Infrastructure",
      "Interoperability Frameworks"
    ]
  },
  {
    id: 4,
    title: "Enterprise Infrastructure Security",
    description: "Critical infrastructure protection for ports, refineries, and large premises",
    icon: Lock,
    color: "from-red-500 to-red-600",
    subcapabilities: [
      "Perimeter Security Systems",
      "Access Control & Biometrics",
      "CCTV & Video Analytics",
      "Intrusion Detection Systems"
    ]
  },
  {
    id: 5,
    title: "CCTV & Video Analytics",
    description: "Advanced surveillance and intelligent video analysis",
    icon: Eye,
    color: "from-cyan-500 to-cyan-600",
    subcapabilities: [
      "AI-Powered Video Analytics",
      "Real-time Threat Detection",
      "Forensic Investigation Tools",
      "Multi-site Monitoring"
    ]
  },
  {
    id: 6,
    title: "IoT & AI Systems",
    description: "Connected intelligence for urban and enterprise environments",
    icon: Cpu,
    color: "from-green-500 to-green-600",
    subcapabilities: [
      "Sensor Networks & Integration",
      "Machine Learning Models",
      "Predictive Analytics",
      "Autonomous Response Systems"
    ]
  }
];

export const CapabilityMatrix = () => {
  const [expandedId, setExpandedId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="matrix-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix-grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600" />
            <span className="text-sm font-semibold text-orange-600 tracking-widest uppercase">
              Our Capabilities
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comprehensive Security & Governance Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A complete suite of integrated services designed to secure critical infrastructure and enable smart governance across India.
          </p>
        </motion.div>

        {/* Capability grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            const isExpanded = expandedId === capability.id;

            return (
              <motion.div
                key={capability.id}
                variants={itemVariants}
                onClick={() => setExpandedId(isExpanded ? null : capability.id)}
                className="group cursor-pointer"
              >
                <motion.div
                  layout
                  className={`relative h-full p-8 rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-orange-200 hover:shadow-xl overflow-hidden`}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${capability.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${capability.color} text-white mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {capability.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4">
                      {capability.description}
                    </p>

                    {/* Expanded content */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Key Services
                        </p>
                        {capability.subcapabilities.map((sub, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${capability.color} mt-1.5 flex-shrink-0`} />
                            <span className="text-sm text-gray-700">{sub}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Expand indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-4 right-4 text-gray-400 group-hover:text-orange-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Border animation on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{
                      boxShadow: isExpanded
                        ? "0 0 20px rgba(249, 115, 22, 0.3)"
                        : "0 0 0px rgba(249, 115, 22, 0)",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
          >
            Schedule a Consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
