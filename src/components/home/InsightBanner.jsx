import { motion } from "framer-motion";

const insights = [
    {
      metric: "12+",
      label: "Years of Expertise",
      description: "Securing India's critical infrastructure since 2012",
      color: "#E9863C"
    },
    {
      metric: "25+",
      label: "Enterprise Projects",
      description: "Deployed across ports, refineries, and government institutions",
      color: "#64DFDF"
    },
    {
      metric: "5+",
      label: "National Awards",
      description: "Recognition for innovation in security and governance",
      color: "#E9863C"
    },
    {
      metric: "99.5%",
      label: "System Uptime",
      description: "Mission-critical infrastructure availability guarantee",
      color: "#64DFDF"
    },
    {
      metric: "500K+",
      label: "Citizens Served",
      description: "Through smart city and e-governance platforms",
      color: "#E9863C"
    },
    {
      metric: "200+",
      label: "IoT Sensors",
      description: "Deployed across urban and enterprise environments",
      color: "#64DFDF"
    },
  ];

export const InsightBanner = () => {
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
    <section className="relative w-full bg-white text-slate-900 py-24 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#E9863C]/50" />
            <span className="text-xs uppercase tracking-widest font-light text-slate-600">
              Enterprise Validation
            </span>
            <div className="w-12 h-[1px] bg-[#E9863C]/50" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-light tracking-tighter leading-[1.1] mb-4 text-slate-900">
            Proven Track Record at National Scale
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Trusted by India's most critical institutions and infrastructure operators
          </p>
        </motion.div>

        {/* Insights grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {insights.map((insight, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative p-8 border border-slate-200 hover:border-[#E9863C]/50 transition-all duration-500 cursor-pointer bg-slate-50"
            >
              {/* Background shift */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                {/* Big metric */}
                <motion.div
                  className="text-6xl font-extralight tracking-tight"
                  style={{ color: insight.color }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {insight.metric}
                </motion.div>

                {/* Label */}
                <div className="text-xs uppercase tracking-widest text-slate-600 font-light">
                  {insight.label}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 font-light leading-relaxed max-w-xs">
                  {insight.description}
                </p>
              </div>

              {/* Border highlight on hover */}
              <motion.div
                className="absolute inset-0 border"
                style={{ borderColor: insight.color }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#E9863C] to-transparent mt-16 origin-center"
        />
      </div>
    </section>
  );
};
