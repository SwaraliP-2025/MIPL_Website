import { motion } from "framer-motion";
import { MapPin, Wifi, Camera, AlertTriangle, Zap, Users } from "lucide-react";

// City node component
const CityNode = ({ x, y, icon: Icon, label, status, delay }) => {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {/* Pulse ring */}
      <motion.circle
        cx={x}
        cy={y}
        r="20"
        fill="none"
        stroke="#E9863C"
        strokeWidth="2"
        opacity="0.3"
        animate={{
          r: [20, 35, 20],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main circle */}
      <circle
        cx={x}
        cy={y}
        r="15"
        fill={status === "active" ? "#E9863C" : status === "warning" ? "#FBBF24" : "#10B981"}
        opacity="0.8"
      />

      {/* Icon background */}
      <circle
        cx={x}
        cy={y}
        r="12"
        fill="white"
        opacity="0.1"
      />
    </motion.g>
  );
};

// Connection line with data flow
const DataFlowLine = ({ x1, y1, x2, y2, delay }) => {
  return (
    <motion.g key={`line-${x1}-${y1}`}>
      {/* Base line */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#96A3BF"
        strokeWidth="1"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay }}
        viewport={{ once: true }}
      />

      {/* Animated data flow */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#E9863C"
        strokeWidth="2"
        opacity="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration: 2,
          delay: delay + 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.g>
  );
};

export const SmartCitySection = () => {
  const cityNodes = [
    { x: "15%", y: "25%", icon: Camera, label: "Surveillance", status: "active" },
    { x: "50%", y: "15%", icon: Wifi, label: "IoT Hub", status: "active" },
    { x: "85%", y: "30%", icon: Zap, label: "Energy Grid", status: "warning" },
    { x: "25%", y: "65%", icon: Users, label: "Traffic Control", status: "active" },
    { x: "50%", y: "75%", icon: AlertTriangle, label: "Emergency", status: "active" },
    { x: "75%", y: "60%", icon: MapPin, label: "Location Services", status: "active" },
  ];

  const connections = [
    { x1: "15%", y1: "25%", x2: "50%", y2: "15%", delay: 0.2 },
    { x1: "50%", y1: "15%", x2: "85%", y2: "30%", delay: 0.4 },
    { x1: "50%", y1: "15%", x2: "25%", y2: "65%", delay: 0.3 },
    { x1: "50%", y1: "15%", x2: "50%", y2: "75%", delay: 0.5 },
    { x1: "50%", y1: "75%", x2: "75%", y2: "60%", delay: 0.6 },
    { x1: "85%", y1: "30%", x2: "75%", y2: "60%", delay: 0.7 },
  ];

  const metrics = [
    { icon: Camera, label: "Live Cameras", value: "2,847", color: "from-blue-500 to-cyan-500" },
    { icon: Wifi, label: "IoT Devices", value: "15,234", color: "from-purple-500 to-pink-500" },
    { icon: Zap, label: "Energy Efficiency", value: "94%", color: "from-orange-500 to-red-500" },
    { icon: Users, label: "Traffic Flow", value: "Optimal", color: "from-green-500 to-emerald-500" },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#1a2f5a] to-[#0f172a]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E9863C] rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#244884] rounded-full blur-3xl opacity-5" />
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Smart City & Safe City
            <br />
            <span className="bg-gradient-to-r from-[#E9863C] to-[#f5a85c] bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real-time monitoring and intelligent management of urban infrastructure
          </p>
        </motion.div>

        {/* Main visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 p-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 overflow-hidden"
        >
          {/* City map visualization */}
          <div className="relative h-96 bg-gradient-to-b from-white/5 to-transparent rounded-lg overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Grid background */}
              <defs>
                <pattern id="city-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E9863C" strokeWidth="0.5" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#city-grid)" />

              {/* Connection lines */}
              {connections.map((conn, idx) => (
                <DataFlowLine
                  key={idx}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  delay={conn.delay}
                />
              ))}

              {/* City nodes */}
              {cityNodes.map((node, idx) => (
                <CityNode
                  key={idx}
                  x={node.x}
                  y={node.y}
                  icon={node.icon}
                  label={node.label}
                  status={node.status}
                  delay={0.3 + idx * 0.1}
                />
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E9863C]" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span>Optimal</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-[#E9863C]/50 transition-all group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${metric.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              title: "Real-Time Monitoring",
              description: "24/7 surveillance and monitoring of critical city infrastructure with AI-powered anomaly detection",
              features: ["Live video feeds", "Sensor networks", "Predictive alerts"],
            },
            {
              title: "Emergency Response",
              description: "Intelligent emergency management system with automated response coordination",
              features: ["Rapid dispatch", "Resource optimization", "Incident tracking"],
            },
            {
              title: "Traffic Intelligence",
              description: "Smart traffic management with AI-driven optimization for seamless flow",
              features: ["Flow optimization", "Congestion prediction", "Route guidance"],
            },
            {
              title: "Infrastructure Analytics",
              description: "Comprehensive analysis of city infrastructure health and performance",
              features: ["Predictive maintenance", "Energy optimization", "Asset tracking"],
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-[#E9863C]/50 transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E9863C]" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
