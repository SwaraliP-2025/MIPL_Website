import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const PremiumLoader = ({ onLoadComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Central animated network diagram */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-orange-500/30 rounded-full"
        />

        {/* Middle rotating ring (opposite direction) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-blue-500/30 rounded-full"
        />

        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"
        />

        {/* Animated dots around the circle */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.2
            }}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateY(-60px)`,
              transformOrigin: "0 0"
            }}
          />
        ))}
      </div>

      {/* Text reveal animation */}
      <div className="absolute bottom-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              MIPL
            </span>
          </h1>
          <p className="text-sm text-gray-400 tracking-widest">
            Securing National Infrastructure
          </p>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center gap-2 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-2 h-2 bg-orange-500 rounded-full"
            />
          ))}
        </motion.div>
      </div>

      {/* Fade out animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"
      />
    </motion.div>
  );
};
