// Framer Motion animation variants for consistent animations across the site

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

export const hoverGlow = {
  boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
  transition: { duration: 0.3 },
};

export const tapScale = {
  scale: 0.95,
};

export const slideInFromBottom = {
  initial: { y: 100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const rotateIn = {
  initial: { rotate: -10, opacity: 0, scale: 0.9 },
  animate: { 
    rotate: 0, 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

export const bounceIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

// Viewport animation settings
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: "-50px",
};

// Transition presets
export const transitions = {
  smooth: { duration: 0.6, ease: "easeOut" },
  spring: { type: "spring", stiffness: 100, damping: 15 },
  bouncy: { type: "spring", stiffness: 300, damping: 20 },
  slow: { duration: 1, ease: "easeInOut" },
};
