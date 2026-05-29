import { motion } from "framer-motion";

const stats = [
  { number: "25+", label: "Years Experience" },
  { number: "50+", label: "Major Projects" },
  { number: "500+", label: "Security Audits" },
  { number: "100%", label: "Client Satisfaction" },
];

export const ImpactStatsSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">


      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Delivering excellence across industries with proven results
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-[#E9863C] mb-2"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <p className="text-slate-600 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
