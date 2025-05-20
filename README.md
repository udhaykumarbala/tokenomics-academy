# Tokenomics Academy & Simulator

Tokenomics Academy is a fully‑client‑rendered learning platform built with Next.js 14 (App Router) that takes beginners from "zero to hero" in crypto‑economic design. It combines bite-sized MDX lessons with an interactive simulator where users tweak supply, inflation, burn, staking, and governance parameters and watch token metrics evolve over time.

## Features

- 📚 **Interactive Learning**: Bite-sized lessons on tokenomics fundamentals
- 🔄 **Real-time Simulator**: Experiment with token parameters and see immediate results
- 📊 **Visualized Metrics**: Charts showing how token metrics evolve over time
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
- 🌐 **Client-side Only**: No server required, making it easy to deploy and fork

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/udhaykumarbala/tokenomics-simulator.git
   cd tokenomics-simulator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `/src/app`: Next.js App Router pages
- `/src/components`: Reusable React components
  - `/ui`: Basic UI components
  - `/simulator`: Simulator-specific components
- `/src/content`: MDX files for lessons
- `/src/lib`: Utility functions and types
  - `/tokenomics`: Core simulation logic

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Markdown for content with JSX
- [Recharts](https://recharts.org/) - Chart library for data visualization

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Roadmap

- Add more comprehensive tokenomics models and simulations
- Implement side-by-side lesson/simulator view
- Add more advanced charts and analytics
- Create export/import functionality for simulation parameters

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Why This Project

Current tokenomics articles are static. Readers struggle to grasp compounding inflation, burns, or vesting cliffs without a sandbox. This project provides a hands‑on way to bridge theory and intuition while remaining 100% frontend‑only for easy deployment and forking.
