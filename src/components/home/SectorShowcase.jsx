import { motion } from "framer-motion";
import {
  Cpu,
  Brain,
  Building2,
  Zap,
  Scale,
  Heart,
  ArrowRight,
} from "lucide-react";

const sectors = [
  {
    id: 1,
    name: "Information Technology",
    description: "Enterprise software & cloud infrastructure",
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
    hoverColor: "hover:border-blue-500/60",
  },
  {
    id: 2,
    name: "Artificial Intelligence",
    description: "AI-powered intelligent automation",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
    hoverColor: "hover:border-purple-500/60",
  },
  {
    id: 3,
    name: "Smart City & Safe City",
    description: "Urban infrastructure & monitoring",
    icon: Building2,
    color: "from-green-500 to-emerald-500",
    borderColor: "border-green-500/30",
    hoverColor: "hover:border-green-500/60",
  },
  {
    id: 4,
    name: "Oil & Gas",
    description: "Industrial digitalization & monitoring",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    borderColor: "border-orange-500/30",
    hoverColor: "hover:border-orange-500/60",
  },
  {
    id: 5,
    name: "Judiciary",
    description: "E-courts & legal automation",
    icon: Scale,
    color: "from-indigo-500 to-blue-500",
    borderColor: "border-indigo-500/30",
    hoverColor: "hover:border-indigo-500/60",
  },
  {
    id: 6,
    name: "Healthcare",
    description: "AI healthcare systems & analytics",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    borderColor: "border-red-500/30",
    hoverColor: "hover:border-red-500/60",
  },
];

const SectorCard = ({ sector, index }) => {
  const Icon = sector.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10 }}
      className={`group relative p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border ${sector.borderColor} ${sector.hoverColor} transition-all duration-300 overflow-hidden cursor-pointer`}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${sector.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300" style={{
          backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
        }}>
          {sector.name}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors">
          {sector.description}
        </p>

        {/* Arrow */}
        <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10`} />
    </motion.div>
  );
};

export const SectorShowcase = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1a2f5a]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E9863C] rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#244884] rounded-full blur-3xl opacity-5" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Sectors
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Delivering intelligent solutions across key industries
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((sector, index) => (
            <SectorCard key={sector.id} sector={sector} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
