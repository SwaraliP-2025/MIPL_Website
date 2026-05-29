import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Zap } from "lucide-react";
import { useState } from "react";

const caseStudies = [
  {
    id: 1,
    title: "HPCL Refinery Security",
    category: "Enterprise Infrastructure",
    description: "Comprehensive security infrastructure for critical petroleum refinery operations",
    metrics: [
      { label: "Security Coverage", value: "99.8%" },
      { label: "Response Time", value: "<2 min" },
      { label: "Incidents Prevented", value: "150+" }
    ],
    highlights: [
      "Advanced perimeter security with AI-powered threat detection",
      "Real-time CCTV monitoring across 50+ critical zones",
      "Integrated access control with biometric authentication",
      "24/7 command center operations"
    ],
    year: 2022,
    award: "National Infrastructure Security Award",
    image: "/projects/hpclmum.jpg"
  },
  {
    id: 2,
    title: "Surat Diamond Bourse",
    category: "Smart City Infrastructure",
    description: "Integrated security and governance system for India's premier diamond trading hub",
    metrics: [
      { label: "Daily Users", value: "5000+" },
      { label: "Security Zones", value: "120+" },
      { label: "Uptime", value: "99.95%" }
    ],
    highlights: [
      "Multi-layer security architecture",
      "Advanced visitor management system",
      "Real-time threat intelligence",
      "Integrated emergency response"
    ],
    year: 2021,
    award: "Excellence in Smart Infrastructure",
    image: "/projects/suratdiam.jpg"
  },
  {
    id: 3,
    title: "Aurangabad Safe City",
    category: "Smart City Initiative",
    description: "Municipal-wide integrated command and control center for public safety",
    metrics: [
      { label: "Coverage Area", value: "500+ sq km" },
      { label: "Response Units", value: "200+" },
      { label: "Crime Reduction", value: "35%" }
    ],
    highlights: [
      "ICCC command center with real-time analytics",
      "Traffic management and incident response",
      "Citizen alert and emergency systems",
      "Data-driven policing capabilities"
    ],
    year: 2020,
    award: "Smart City Excellence Award",
    image: "/projects/amravti corp.jpg"
  },
  {
    id: 4,
    title: "Nanded Municipal Corporation",
    category: "E-Governance",
    description: "Digital transformation and smart governance platform for municipal services",
    metrics: [
      { label: "Services Digitized", value: "45+" },
      { label: "Citizens Served", value: "500K+" },
      { label: "Processing Time", value: "-60%" }
    ],
    highlights: [
      "Citizen-centric digital services platform",
      "Real-time service delivery tracking",
      "Integrated complaint management",
      "Data analytics for urban planning"
    ],
    year: 2019,
    award: "Digital Governance Innovation",
    image: "/projects/nanded corp.jpg"
  },
  {
    id: 5,
    title: "Kolhapur Smart City",
    category: "Smart City Initiative",
    description: "Comprehensive smart city infrastructure with integrated IoT and AI systems",
    metrics: [
      { label: "IoT Devices", value: "2000+" },
      { label: "Data Points", value: "1M+/day" },
      { label: "Efficiency Gain", value: "40%" }
    ],
    highlights: [
      "IoT sensor network for environmental monitoring",
      "AI-powered traffic optimization",
      "Smart street lighting and utilities",
      "Predictive maintenance systems"
    ],
    year: 2023,
    award: "IoT Innovation Excellence",
    image: "/projects/kolh corp.jpg"
  },
  {
    id: 6,
    title: "National Judiciary Portal",
    category: "E-Governance",
    description: "Secure digital infrastructure for national judicial system operations",
    metrics: [
      { label: "Courts Connected", value: "5000+" },
      { label: "Daily Transactions", value: "100K+" },
      { label: "Security Level", value: "Top Secret" }
    ],
    highlights: [
      "End-to-end encrypted communications",
      "Secure case management system",
      "Multi-factor authentication",
      "Compliance with judicial standards"
    ],
    year: 2022,
    award: "National Security Excellence",
    image: "/projects/MP_HIGH_COURT_JABALPUR_-_panoramio.jpg"
  }
];

export const CaseStudiesSection = () => {
  const [selectedStudy, setSelectedStudy] = useState(0);
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Smart City Initiative", "Enterprise Infrastructure", "E-Governance"];
  
  const filteredStudies = filter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === filter);

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
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600" />
            <span className="text-sm font-semibold text-orange-600 tracking-widest uppercase">
              Track Record
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Enterprise Case Studies & Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proven expertise securing India's most critical infrastructure and enabling digital transformation at national scale.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-orange-200"
              }`}
            >
              {category === "all" ? "All Projects" : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Case studies grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              onClick={() => setSelectedStudy(idx)}
              className="group cursor-pointer"
            >
              <motion.div
                layout
                className="relative h-full rounded-xl border border-gray-200 bg-white hover:border-orange-200 transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image */}
                <div className="h-44 w-full overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  {/* Category badge */}
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                      {study.category}
                    </span>
                    <span className="text-xs text-gray-500">{study.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {study.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {study.description}
                  </p>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
                    {study.metrics.slice(0, 3).map((metric, i) => (
                      <div key={i} className="text-center">
                        <p className="text-lg font-bold text-orange-600">{metric.value}</p>
                        <p className="text-xs text-gray-500">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Award */}
                  {study.award && (
                    <div className="flex items-start gap-2 text-sm">
                      <Award className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{study.award}</span>
                    </div>
                  )}

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute top-4 right-4 text-gray-400 group-hover:text-orange-500 transition-colors"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed view of selected study */}
        {filteredStudies.length > 0 && (
          <motion.div
            key={filteredStudies[selectedStudy]?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Image */}
              <div className="lg:col-span-1">
                <div className="rounded-xl overflow-hidden border border-orange-200">
                  <img 
                    src={filteredStudies[selectedStudy]?.image} 
                    alt={filteredStudies[selectedStudy]?.title} 
                    className="w-full h-72 object-cover"
                  />
                </div>
                
                {/* Right: Metrics (moved to left column below image) */}
                <div className="space-y-4 mt-6">
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
                    Key Metrics
                  </p>
                  {filteredStudies[selectedStudy]?.metrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-lg bg-white border border-orange-100"
                    >
                      <p className="text-2xl font-bold text-orange-600 mb-1">
                        {metric.value}
                      </p>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Right: Details */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {filteredStudies[selectedStudy]?.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {filteredStudies[selectedStudy]?.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
                    Key Highlights
                  </p>
                  {filteredStudies[selectedStudy]?.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Zap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Interested in learning how we can secure your critical infrastructure?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
