import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const PremiumHeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Editorial Typography */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Overline */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600" />
              <span className="text-sm font-semibold text-orange-500 tracking-widest uppercase">
                National Infrastructure Security
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              Securing{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                India's
              </span>{" "}
              Critical Infrastructure
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              20+ years of expertise in Safe Cities, Smart Governance, ICCC Command & Control, and Enterprise Infrastructure Security. Trusted by national institutions and critical infrastructure operators.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
              >
                Explore Our Sectors
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-8 border-t border-white/10"
            >
              <div>
                <p className="text-2xl font-bold text-orange-500">20+</p>
                <p className="text-sm text-gray-400">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-orange-500">50+</p>
                <p className="text-sm text-gray-400">Critical Projects</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-orange-500">15+</p>
                <p className="text-sm text-gray-400">National Awards</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Abstract digital elements */}
          <motion.div
            variants={itemVariants}
            className="relative h-full hidden lg:flex items-center justify-center"
          >
            {/* Animated architectural lines */}
            <svg
              className="w-full h-full max-w-md"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer hexagon */}
              <motion.polygon
                points="200,50 350,125 350,275 200,350 50,275 50,125"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />

              {/* Inner hexagon */}
              <motion.polygon
                points="200,100 300,150 300,250 200,300 100,250 100,150"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
              />

              {/* Center circle */}
              <motion.circle
                cx="200"
                cy="200"
                r="50"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
              />

              {/* Connecting lines */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={200 + 100 * Math.cos((angle * Math.PI) / 180)}
                  y2={200 + 100 * Math.sin((angle * Math.PI) / 180)}
                  stroke="url(#gradient2)"
                  strokeWidth="1"
                  opacity="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 0.9 + i * 0.1,
                  }}
                />
              ))}

              {/* Animated dots */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={200 + 100 * Math.cos((angle * Math.PI) / 180)}
                  cy={200 + 100 * Math.sin((angle * Math.PI) / 180)}
                  r="4"
                  fill="url(#gradient1)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 1.2 + i * 0.1,
                  }}
                />
              ))}

              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating accent elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-20 h-20 border border-orange-500/30 rounded-lg"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 left-10 w-16 h-16 border border-blue-500/30 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-orange-500" />
        </div>
      </motion.div>
    </section>
  );
};
