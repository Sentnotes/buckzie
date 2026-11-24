# Changelog

All notable changes to the BuckledIn web application are documented in this file.
This project follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## Branch Map

| Branch | Purpose | Notes |
| --- | --- | --- |
| `main` | Production website | Live BuckledIn marketing site (tagged releases `v1.x.x`) |
| `buckle-videos` | Launch video assets | Buckle V2 square & 16:9 landscape video renders (`film/buckle-v2/`); kept separate from `main` |
| `design/impeccable-pass` | Design audit working branch | Historical UI/UX polish and accessibility pass |

---

## [1.1.0] - 2026-11-23

### Added
- **Home Page — Single-Line True 3D Bookshelf (`src/components/ui/ShelfBook3D.jsx`):**
  - Replaced the flat desktop bookshelf in `InteractiveShowcase.jsx` with 9 continuous 3D hardcover books (real cloth spines, paper block edges, front/inner covers, and clickable flippable pages).
  - Choreographed transitions: hover lifts a spine cleanly without blocking neighbors; clicking closes the current book, returns it to the shelf, pulls out the new book to show its front cover, and swings it open `-176°`.
  - Added **Shelf All** and `<` / `>` arrow navigation controls in the Tailored Programs header.
- **Home Page — Mobile & Tablet 3D Handbook (`src/components/ui/MobileHandbook3D.jsx`):**
  - Added a responsive single cloth-bound 3D handbook for screens `< lg` containing all 9 Tailored Programs as flippable pages, auto-centered when opened.
- **Drivers Page — Spotlight Testimonials (`src/components/DriverTestimonialsSpotlight.jsx`):**
  - Replaced the 3-column driver testimonial grid in `DriversPage.jsx` with a faded 4×3 background testimonial wall, borderless semi-circular gradient dome, active portrait spotlight, locked-height quote stage, and interactive dark pill tabs.
- **Dependencies:** Added `motion` (`motion/react`) for 3D transforms and transitions.

---

## [1.0.0] - 2026-11-20

### Baseline (`main` at `ecd26d4`)
- Split Institutional Dossier form layouts and fixed-height `PartnerModal` (`ecd26d4`).
- Aligned `LegalModal` Terms & Privacy language with W-2 drivers and school district service agreements (`a5efd63`).
- Modal `z-index`, keyboard navigation, briefings accessibility, and W-2 / 19-point copy alignment (`5598668`).
- Replaced Book a Ride simulator with Partner With Us / Partner Your District CTA and 2-tab `PartnerModal` (`6a9a3c3`).
