import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const industries = [
  {
    id: 1,
    title: "SMART & SAFE CITY",
    subtitle: "Intelligent Solutions for",
    highlight: "Sustainable Urban Futures",
    description: "AI-powered surveillance, real-time monitoring and integrated command centers for safer, smarter cities.",
    buttonText: "Read More",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=600&fit=crop",
    bgGradient: "from-blue-900 via-blue-800 to-blue-900",
  },
  {
    id: 2,
    title: "OIL & GAS",
    subtitle: "Powering Progress with",
    highlight: "Intelligent Operations",
    description: "Digital transformation for refining, distribution and predictive analytics, automation and asset optimization.",
    buttonText: "Read More",
    image: "oil and gas.png",
    bgGradient: "from-amber-900 via-orange-800 to-amber-900",
  },
  {
    id: 3,
    title: "JUDICIARY",
    subtitle: "Technology Solutions for",
    highlight: "Digital Justice",
    description: "Secure digital records and secure legal workflows for efficient and accessible judicial systems.",
    buttonText: "Read More",
    image: "judiciary.png",
    bgGradient: "from-blue-900 via-indigo-800 to-blue-900",
  },
  {
    id: 4,
    title: "HEALTHCARE",
    subtitle: "AI-Powered Healthcare for",
    highlight: "Better Outcomes",
    description: "Integrated systems that improve patient care, digital healthcare platforms for efficiency and safety.",
    buttonText: "Read More",
    image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1200&h=600&fit=crop",
    bgGradient: "from-blue-900 via-cyan-800 to-blue-900",
  },
  {
    id: 5,
    title: "CYBER SECURITY",
    subtitle: "Protecting What Matters",
    highlight: "with Intelligence",
    description: "Advanced security frameworks, threat detection, SOC services and data protection for enterprises.",
    buttonText: "Read More",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
    bgGradient: "from-slate-900 via-blue-800 to-slate-900",
  },
  {
    id: 6,
    title: "INFORMATION TECHNOLOGY",
    subtitle: "Building Robust IT",
    highlight: "Foundations for Digital Transformation",
    description: "Cloud infrastructure, enterprise applications and IT services that drive innovation, agility and growth.",
    buttonText: "Read More",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    bgGradient: "from-blue-900 via-cyan-800 to-blue-900",
  },
];

export const IndustriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) {
        nextIndex = industries.length - 1;
      } else if (nextIndex >= industries.length) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  };

  const currentIndustry = industries[currentIndex];

  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1a2f5a]">
      {/* Carousel Container */}
      <div ref={containerRef} className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${currentIndustry.image}')`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                imageRendering: 'crisp-edges',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Dark Overlay - Reduced opacity for clearer images */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-start">
              <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="max-w-2xl"
                >
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4"
                  >
                    {currentIndustry.title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6"
                  >
                    <span className="text-gray-300">{currentIndustry.subtitle}</span>
                    <br />
                    <span className="text-[#E9863C] font-bold">{currentIndustry.highlight}</span>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed"
                  >
                    {currentIndustry.description}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-[#E9863C] to-[#f5a85c] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#E9863C]/40 transition-all"
                  >
                    {currentIndustry.buttonText} →
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Bottom Right */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-20 flex gap-2 sm:gap-3">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(-1)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 backdrop-blur-md border border-white/20 hover:border-[#E9863C]/50 hover:from-slate-600 hover:to-slate-800 transition-all group shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#E9863C] transition-colors mx-auto" />
        </motion.button>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(1)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 backdrop-blur-md border border-white/20 hover:border-[#E9863C]/50 hover:from-slate-600 hover:to-slate-800 transition-all group shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#E9863C] transition-colors mx-auto" />
        </motion.button>
      </div>

      {/* Slide Counter - Top Right */}
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-20">
        <div className="text-white/70 text-xs sm:text-sm font-medium">
          <span className="text-[#E9863C] font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span> / {String(industries.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Badge - Top Left */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-20 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#E9863C]/30"
        >
          <svg className="w-4 sm:w-5 h-4 sm:h-5 text-[#E9863C] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">
            Built in India. Designed for the Future. Scaled for the World.
          </span>
        </motion.div>
      </div>
    </section>
  );
};
