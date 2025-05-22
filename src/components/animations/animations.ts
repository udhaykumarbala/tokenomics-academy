// Animation variants for consistent use across the application
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Timing for animations
export const pageTransitionTiming = {
  duration: 0.3,
  ease: "easeInOut",
};

// Staggered children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Child item animation
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
    }
  },
};

// Button hover animation
export const buttonHover = {
  scale: 1.03,
  transition: { duration: 0.2 },
};

// Link hover animation
export const linkHover = {
  textDecoration: "underline",
};