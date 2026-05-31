import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ScrollFloat = ({
  children,
  className = "",
  strength = 48,
  offset = ["start end", "end start"],
}) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [strength, -strength],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
