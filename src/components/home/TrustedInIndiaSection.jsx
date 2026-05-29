import { motion } from "framer-motion";
import { CheckCircle, MapPin, Building2, Zap } from "lucide-react";

const trustPoints = [
  {
    icon: Building2,
    title: "Smart Governance",
    description: "Transforming governance systems across Indian states and municipalities",
    count: "50+",
    label: "Implementations",
  },
  {
    icon: Zap,
    title: "Infrastructure Projects",
    description: "Powering critical infrastructure and smart city initiatives nationwide",
    count: "100+",
    label: "Projects",
  },
  {
    icon: MapPin,
    title: "National Scale",
    description: "Operating across India with presence in major metros and tier-2 cities",
    count: "15+",
    label: "States",
  },
  {
    icon: CheckCircle,
    title: "Enterprise Clients",
    description: "Trusted by government agencies, enterprises, and public sector organizations",
    count: "500+",
    label: "Clients",
  },
];

export const TrustedInIndiaSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">


      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Trusted Across India's Digital Transformation Journey
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Delivering enterprise consulting and intelligent infrastructure solutions at national scale
          </p>
        </motion.div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#E9863C]/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#E9863C] to-[#f5a85c] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#E9863C]">{point.count}</div>
                    <div className="text-xs text-slate-400">{point.label}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                <p className="text-slate-400 text-sm">{point.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 text-lg">
            <span className="text-[#E9863C] font-bold">Engineering India's Intelligent Future</span>
            {" "}through enterprise consulting, AI transformation, and national-scale digital infrastructure
          </p>
        </motion.div>
      </div>
    </section>
  );
};
