import { motion } from "framer-motion";
import { Brain, Zap, Cpu, Network, Lightbulb, Rocket } from "lucide-react";

const AICapability = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative p-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-[#E9863C]/50 transition-all h-full overflow-hidden">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E9863C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="inline-flex p-4 rounded-lg bg-gradient-to-br from-[#E9863C] to-[#f5a85c] mb-4 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 10 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E9863C] to-transparent opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300 -z-10" />
      </div>
    </motion.div>
  );
};

// Neural network animation
const NeuralNetwork = () => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <svg className="w-full h-full absolute inset-0 opacity-20" preserveAspectRatio="none">
      {/* Connections */}
      {nodes.map((node, idx) => {
        const nextNode = nodes[(idx + 1) % nodes.length];
        return (
          <motion.line
            key={`line-${idx}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${nextNode.x}%`}
            y2={`${nextNode.y}%`}
            stroke="#E9863C"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 2,
              delay: idx * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.circle
          key={`node-${node.id}`}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r="3"
          fill="#E9863C"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 2,
            delay: node.id * 0.15,
            repeat: Infinity,
          }}
        />
      ))}
    </svg>
  );
};

export const AIInnovationSection = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Predictive Governance",
      description: "AI-powered forecasting for policy decisions and resource allocation with real-time insights",
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description: "Automate complex workflows and processes with neural networks and machine learning",
    },
    {
      icon: Cpu,
      title: "Advanced Analytics",
      description: "Deep data analysis and pattern recognition across enterprise systems",
    },
    {
      icon: Network,
      title: "Smart Integration",
      description: "Seamless connectivity between systems with AI-driven orchestration",
    },
    {
      icon: Lightbulb,
      title: "AI Insights",
      description: "Real-time intelligence generation for informed decision-making",
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: "Continuous system optimization through machine learning algorithms",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1a2f5a]">
      {/* Neural network background */}
      <div className="absolute inset-0 overflow-hidden">
        <NeuralNetwork />
        
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#E9863C] rounded-full blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#244884] rounded-full blur-3xl opacity-5"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#E9863C]/30 mb-6"
          >
            <Brain className="w-4 h-4 text-[#E9863C]" />
            <span className="text-sm font-medium text-white">AI-Powered Intelligence</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Next-Generation AI
            <br />
            <span className="bg-gradient-to-r from-[#E9863C] to-[#f5a85c] bg-clip-text text-transparent">
              Innovation Platform
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Harness the power of artificial intelligence to transform governance, enterprise operations, and critical infrastructure
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {capabilities.map((capability, idx) => (
            <AICapability
              key={idx}
              icon={capability.icon}
              title={capability.title}
              description={capability.description}
              index={idx}
            />
          ))}
        </div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="p-8 rounded-xl bg-gradient-to-r from-[#E9863C]/20 to-[#244884]/20 backdrop-blur-md border border-[#E9863C]/30 overflow-hidden relative"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E9863C" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "99.9%", label: "System Uptime" },
              { number: "2.5M+", label: "Data Points/Day" },
              { number: "47ms", label: "Avg Response Time" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#E9863C] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
