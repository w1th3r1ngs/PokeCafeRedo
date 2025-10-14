import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up"
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  // Reduced movement distance for subtlety
  const directionOffset = {
    up: { y: shouldReduceMotion ? 0 : 15 },
    down: { y: shouldReduceMotion ? 0 : -15 },
    left: { x: shouldReduceMotion ? 0 : 15 },
    right: { x: shouldReduceMotion ? 0 : -15 },
    none: {}
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        x: 0
      } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.4,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
