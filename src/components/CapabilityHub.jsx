import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { capabilityHubData } from "@/data/capabilityHubData";

export const CapabilityHub = () => {
  const [activeId, setActiveId] = useState("ict");
  const activeSector = capabilityHubData.find((s) => s.id === activeId);

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
      transition: { duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  };

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hub-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hub-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-slate-900" />
            <span className="text-xs uppercase tracking-widest font-light text-slate-600">
              Enterprise Capabilities
            </span>
            <div className="w-12 h-[1px] bg-slate-900" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-light tracking-tighter text-slate-900 leading-[1.1] mb-4">
            Comprehensive Sector Expertise
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Deep-dive into our specialized capabilities across seven critical enterprise sectors
          </p>
        </motion.div>

        {/* Main grid container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-8"
        >
          {/* Left Panel: Vertical Tab Navigation */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-4 space-y-0"
          >
            {/* Mobile horizontal scroll indicator */}
            <div className="md:hidden mb-4 text-xs uppercase tracking-widest text-slate-500 font-light">
              Scroll to explore sectors
            </div>

            {/* Vertical navigation - Desktop */}
            <div className="hidden md:flex flex-col space-y-0">
              {capabilityHubData.map((sector, idx) => (
                <motion.button
                  key={sector.id}
                  onClick={() => setActiveId(sector.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-full text-left py-4 px-4 border-b border-slate-200/60 transition-all duration-300 group ${
                    activeId === sector.id ? "bg-slate-50" : "hover:bg-slate-50/50"
                  }`}
                >
                  {/* Left accent line for active state */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#64DFDF]"
                    animate={{ opacity: activeId === sector.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Category tag */}
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-light mb-1">
                    {sector.category}
                  </div>

                  {/* Title */}
                  <div
                    className={`text-sm transition-all duration-300 ${
                      activeId === sector.id
                        ? "font-medium text-slate-900"
                        : "font-normal text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {sector.title}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Mobile horizontal scroll */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6">
              <div className="flex gap-3 min-w-min">
                {capabilityHubData.map((sector) => (
                  <motion.button
                    key={sector.id}
                    onClick={() => setActiveId(sector.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 px-4 py-3 border border-slate-200/80 rounded-none transition-all duration-300 whitespace-nowrap ${
                      activeId === sector.id
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-900 hover:border-slate-900"
                    }`}
                  >
                    <span className="text-xs uppercase tracking-widest font-light">
                      {sector.title.split(" ")[0]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Deep-Data Showcase Canvas */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-8"
          >
            <AnimatePresence mode="wait">
              {activeSector && (
                <motion.div
                  key={activeSector.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.5,
                    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="space-y-8"
                >
                  {/* Tactical Vision Header */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-light tracking-tight text-slate-900">
                      {activeSector.title}
                    </h3>
                    <p className="text-slate-500 text-lg max-w-2xl leading-relaxed font-light">
                      {activeSector.tagline}
                    </p>
                  </div>

                  {/* Hard Capability Matrix Grid */}
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-widest text-slate-600 font-light mb-4">
                      Core Capabilities
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeSector.capabilities.map((capability, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: idx * 0.05,
                            duration: 0.4,
                          }}
                          className="flex items-start gap-3 p-3 border border-slate-200/60 hover:border-slate-300 transition-all duration-300 group cursor-pointer"
                        >
                          {/* Minimal geometric bullet */}
                          <div className="flex-shrink-0 mt-1">
                            <motion.div
                              className="w-1.5 h-1.5 bg-[#64DFDF]"
                              whileHover={{ scale: 1.3 }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>

                          {/* Capability text */}
                          <span className="text-slate-700 text-base leading-relaxed tracking-normal font-light group-hover:text-slate-900 transition-colors">
                            {capability}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Frameworks & Compliance Bar */}
                  <div className="space-y-4 pt-4 border-t border-slate-200/60">
                    <div className="text-xs uppercase tracking-widest text-slate-600 font-light">
                      Compliance & Governance Frameworks
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeSector.frameworks.map((framework, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: idx * 0.05,
                            duration: 0.3,
                          }}
                          className="bg-slate-100 text-slate-800 font-mono text-xs px-3 py-1.5 border border-slate-200/50 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 cursor-default"
                        >
                          {framework}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics Ticker */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60">
                    {[
                      {
                        value: activeSector.metrics.scale,
                        label: activeSector.metrics.scaleLabel,
                      },
                      {
                        value: activeSector.metrics.uptime,
                        label: activeSector.metrics.uptimeLabel,
                      },
                      {
                        value: activeSector.metrics.efficiency,
                        label: activeSector.metrics.efficiencyLabel,
                      },
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: idx * 0.1,
                          duration: 0.4,
                        }}
                        className="space-y-2"
                      >
                        {/* Big metric number */}
                        <motion.div
                          className="text-4xl font-extralight tracking-tight text-slate-900"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {metric.value}
                        </motion.div>

                        {/* Micro label */}
                        <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
