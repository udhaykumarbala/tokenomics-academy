// Animation variants for consistent use across the application
export const pageTransition = {
  hidden: { opacity: 0, x: 20 }, // Start slightly off-screen to the right and faded
  enter: { opacity: 1, x: 0 },    // Slide in to original position and fade in
  exit: { opacity: 0, x: -20 },   // Slide out to the left and fade out
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
  scale: 1.05,
  transition: { type: "spring", stiffness: 300 },
};

// Link hover animation
export const linkHover = {
  textDecoration: "underline",
};

// Slider interaction animations
export const sliderHover = {
  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.2)",
  transition: { duration: 0.2 },
};

export const sliderDrag = {
  scale: 1.02,
  boxShadow: "0 0 0 5px rgba(66, 153, 225, 0.3)",
  transition: { duration: 0.1 },
};

// Slider value change animation
export const sliderValueChange = {
  initial: { scale: 1, opacity: 1 },
  animate: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
  transition: { duration: 0.3 },
};

// Chart animations
export const chartEntrance = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.5
    }
  }
};

// Insight item animations
export const insightEntrance = {
  hidden: { opacity: 0, x: -5 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      duration: 0.3
    }
  }
};

// Data point hover animation
export const dataPointHover = {
  scale: 1.15,
  transition: { duration: 0.1 },
};