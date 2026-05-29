import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    id: 1,
    title: "AI & Automation",
    subtitle: "Enterprise Transformation",
    description: "Implement intelligent automation to reduce operational costs by 40% and accelerate decision-making across your enterprise",
    image: "",
    color: "from-purple-500 to-pink-500",
    link: "/solutions/ai-transformation",
  },
  {
    id: 2,
    title: "Smart Governance",
    subtitle: "Digital Infrastructure",
    description: "Transform government operations with intelligent systems that improve citizen services and reduce administrative burden",
    image: "",
    color: "from-blue-500 to-cyan-500",
    link: "/solutions/smart-governance",
  },
  {
    id: 3,
    title: "Smart Cities",
    subtitle: "Urban Intelligence",
    description: "Build connected urban infrastructure with real-time analytics for traffic, utilities, and public safety management",
    image: "",
    color: "from-green-500 to-emerald-500",
    link: "/solutions/smart-cities",
  },
  {
    id: 4,
    title: "Healthcare Intelligence",
    subtitle: "Patient-Centric Solutions",
    description: "Enhance patient outcomes with AI-powered diagnostics, predictive analytics, and integrated healthcare management systems",
    image: "",
    color: "from-red-500 to-pink-500",
    link: "/solutions/healthcare",
  },
  {
    id: 5,
    title: "Cyber Security",
    subtitle: "Enterprise Protection",
    description: "Protect your critical assets with advanced threat detection, 24/7 security operations, and compliance management",
    image: "",
    color: "from-slate-500 to-gray-500",
    link: "/solutions/cybersecurity",
  },
  {
    id: 6,
    title: "Digital Infrastructure",
    subtitle: "Enterprise Solutions",
    description: "Scale your operations with cloud-native infrastructure, data centers, and enterprise IT solutions built for growth",
    image: "",
    color: "from-orange-500 to-red-500",
    link: "/solutions/infrastructure",
  },
];

const SolutionCard = ({ solution, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Card Background with Image Placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-20`} />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Glassmorphism Border */}
      <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-[#E9863C]/50 transition-all duration-300" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 z-10">
        {/* Top Section */}
        <div>
          <motion.div
            className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
          >
            {solution.image}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-1">{solution.title}</h3>
          <p className="text-sm text-[#E9863C] font-semibold">{solution.subtitle}</p>
        </div>

        {/* Bottom Section */}
        <div>
          <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors">
            {solution.description}
          </p>
          <motion.div
            className="flex items-center gap-2 text-[#E9863C] font-semibold group-hover:gap-3 transition-all"
            whileHover={{ x: 5 }}
          >
            <span>Explore Solution</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10`}
      />

      {/* Link Wrapper */}
      <Link to={solution.link} className="absolute inset-0" />
    </motion.div>
  );
};

export const SolutionCardsSection = () => {
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
            Consulting Services for Your Sector
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover how MIPL's specialized consulting services solve industry-specific challenges and drive measurable business outcomes
          </p>
        </motion.div>

        {/* Solutions Grid - Card Based Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-8">
            Ready to transform your enterprise? Explore our solutions or see our impact.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#E9863C] to-[#f5a85c] text-white font-bold hover:shadow-lg hover:shadow-[#E9863C]/40 transition-all"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Explore Our Solutions →
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border-2 border-[#E9863C] text-[#E9863C] font-bold hover:bg-[#E9863C]/10 transition-all"
            >
              <Link to="/projects">View Our Impact</Link>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
