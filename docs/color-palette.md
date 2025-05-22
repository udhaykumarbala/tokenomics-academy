# Color Palette Usage Guide

This document outlines the Web3-inspired color palette for Tokenomics Academy and provides guidelines for consistent usage.

## Color Variables

```css
:root {
  --primary-color: #3A86FF;      /* Neon Blue - Primary accent */
  --secondary-color: #9D4EDD;    /* Electric Purple - Secondary accent */
  --background: #F8F9FA;         /* Light mode background */
  --foreground: #212529;         /* Light mode text */
  --glass-bg: rgba(255,255,255,0.05); /* Glass card background */
  --success-color: #00D9A0;      /* Mint Green - Success highlights */
  --warning-color: #FFB703;      /* Soft Orange - Warning text */
  --button-hover-gradient: linear-gradient(90deg, #3A86FF, #9D4EDD); /* Button hover gradient */
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0A0E1A;       /* Deep Navy - Dark mode background */
    --foreground: #E0E0E0;       /* Light text for dark mode */
  }
}
```

## Utility Classes

### Primary Color
- `.bg-primary` - Background color
- `.text-primary` - Text color 
- `.border-primary` - Border color
- `.hover\:bg-primary-dark:hover` - Darker hover effect
- `.hover\:text-primary-dark:hover` - Darker text hover effect
- `.hover\:bg-primary-light-opacity:hover` - Light transparent hover for outline buttons

### Secondary Color
- `.bg-secondary` - Background color
- `.text-secondary` - Text color
- `.border-secondary` - Border color

### Glass Effect
- `.bg-glass` - Semi-transparent background with blur

### Status Colors
- `.bg-success` / `.text-success` - Success highlights (Mint Green)
- `.bg-warning` / `.text-warning` - Warning text (Soft Orange)

### Special Effects
- `.hover\:bg-gradient:hover` - Gradient background on hover

## Accessibility Guidelines

- Ensure text has sufficient contrast against backgrounds (WCAG AA minimum)
- Use primary color for interactive elements like links and buttons
- Use secondary color for accent elements and highlights
- Use success and warning colors consistently for their respective purposes
- Test with color blindness simulators to ensure usability

## Usage Examples

### Buttons
- Primary button: `className="bg-primary hover:bg-primary-dark text-white"`
- Secondary button: `className="bg-white border border-primary text-primary hover:bg-primary-light-opacity"`
- Gradient hover button: `className="bg-primary hover:bg-gradient text-white"`

### Cards
- Glass card: `className="bg-glass"`
- White card: `className="bg-white"`

### Text
- Primary text: `className="text-primary"`
- Secondary accent: `className="text-secondary"`
- Success message: `className="text-success"`
- Warning message: `className="text-warning"`