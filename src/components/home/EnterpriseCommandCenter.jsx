import { motion } from "framer-motion";
import { Activity, AlertCircle, TrendingUp, Zap, Shield, Radio } from "lucide-react";
import { useState, useEffect } from "react";

// Animated metric card
const MetricCard = ({ icon: Icon, label, value, unit, trend, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-[#E9863C]/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-[#E9863C] to-[#f5a85c] group-hover:shadow-lg group-hover:shadow-[#E9863C]/40 transition-all">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            {trend}%
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">{displayValue}</span>
        <span className="text-gray-400 text-sm">{unit}</span>
      </div>
    </motion.div>
  );
};

// Live monitoring widget
const LiveMonitor = ({ title, items, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Radio className="w-5 h-5 text-[#E9863C] animate-pulse" />
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + idx * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#E9863C]/30 transition-all"
          >
            <span className="text-gray-300 text-sm">{item.label}</span>
            <span className={`text-sm font-semibold ${item.status === 'active' ? 'text-green-400' : item.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const EnterpriseCommandCenter = () => {
  const metrics = [
    { icon: Activity, label: "Active Systems", value: "2,847", unit: "online", trend: 12 },
    { icon: AlertCircle, label: "Security Alerts", value: "23", unit: "monitored", trend: -8 },
    { icon: Zap, label: "Processing Power", value: "98", unit: "%", trend: 5 },
    { icon: Shield, label: "Threat Level", value: "Low", unit: "", trend: 0 },
  ];

  const aiAlerts = [
    { label: "Predictive Maintenance", value: "3 alerts", status: "active" },
    { label: "Anomaly Detection", value: "0 anomalies", status: "active" },
    { label: "Resource Optimization", value: "Optimized", status: "active" },
    { label: "Security Scan", value: "Passed", status: "active" },
  ];

  const cityMetrics = [
    { label: "Traffic Flow", value: "Optimal", status: "active" },
    { label: "Energy Usage", value: "78%", status: "warning" },
    { label: "Air Quality", value: "Good", status: "active" },
    { label: "Emergency Response", value: "Ready", status: "active" },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#1a2f5a] to-[#0f172a]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg className="w-full h-full opacity-5" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#E9863C" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
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
            Enterprise Command Center
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real-time monitoring and AI-powered intelligence for critical infrastructure
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <MetricCard
              key={idx}
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              trend={metric.trend}
              delay={idx * 0.1}
            />
          ))}
        </div>

        {/* Live Monitoring Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveMonitor
            title="AI Intelligence Alerts"
            items={aiAlerts}
            delay={0.4}
          />
          <LiveMonitor
            title="Smart City Metrics"
            items={cityMetrics}
            delay={0.5}
          />
        </div>

        {/* Dashboard visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 p-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 overflow-hidden"
        >
          <h3 className="text-xl font-bold text-white mb-6">Live Infrastructure Map</h3>
          
          {/* Animated network visualization */}
          <div className="relative h-64 bg-gradient-to-b from-white/5 to-transparent rounded-lg overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Network nodes */}
              {[
                { x: "20%", y: "30%", label: "Data Center 1" },
                { x: "50%", y: "20%", label: "Cloud Hub" },
                { x: "80%", y: "35%", label: "Edge Node" },
                { x: "35%", y: "70%", label: "IoT Gateway" },
                { x: "65%", y: "75%", label: "Security Center" },
              ].map((node, idx) => (
                <g key={idx}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="#E9863C"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                    viewport={{ once: true }}
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="none"
                    stroke="#E9863C"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.6 + idx * 0.1,
                      repeat: Infinity,
                    }}
                    viewport={{ once: true }}
                  />
                </g>
              ))}

              {/* Connection lines */}
              <motion.line
                x1="20%" y1="30%"
                x2="50%" y2="20%"
                stroke="#E9863C"
                strokeWidth="1"
                opacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%" y1="20%"
                x2="80%" y2="35%"
                stroke="#E9863C"
                strokeWidth="1"
                opacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="35%" y1="70%"
                x2="50%" y2="20%"
                stroke="#96A3BF"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="65%" y1="75%"
                x2="80%" y2="35%"
                stroke="#96A3BF"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                viewport={{ once: true }}
              />
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E9863C]" />
                <span>Active Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#96A3BF]" />
                <span>Secondary Links</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
