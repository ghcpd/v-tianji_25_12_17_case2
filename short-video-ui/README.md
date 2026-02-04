# Short Video UI

A small Vite + React + TypeScript frontend project implementing a TikTok-style short-video feed using mock data and IntersectionObserver-based autoplay behavior.

Features
- Smooth vertical scrolling with CSS scroll-snap
- Auto-play/pause for active video using IntersectionObserver
- Like and Follow toggles with in-memory state
- Unit tests with Vitest + Testing Library

Getting started
1. Install dependencies:
   npm install
2. Run dev server:
   npm run dev
   (Open http://localhost:5173)
3. Run tests:
   npm test -- --run

Notes
- Vitest may prompt to install a coverage provider if using --coverage; this environment left that step out to avoid dependency mismatches.
