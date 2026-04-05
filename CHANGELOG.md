# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-04-05

### Changed

- Full rewrite from vanilla JS to **Next.js 16 + TypeScript**
- UI rebuilt with **shadcn/ui + Tailwind CSS v4**
- State management via **Zustand** (replacing ad-hoc DOM manipulation)
- Watermark rendering extracted to pure functions (`src/lib/watermark/renderer.ts`)
- Top-down layout: full-width preview above, controls below in responsive grid
- Brand color updated to teal/cyan; consistent light & dark themes
- Favicon now matches header logo (Lucide Droplets SVG)

### Added

- Dark mode toggle (via `next-themes`)
- Real-time canvas preview with `requestAnimationFrame` debouncing
- Image validation (type + size) with toast error feedback
- Dual deployment support: Vercel (default) and Cloudflare Pages (static export)
- `wrangler.jsonc` for Cloudflare Pages configuration

### Removed

- Legacy `index.html` / `css/` / `js/` vanilla implementation
- CDN dependencies (Bootstrap, Font Awesome, FileSaver.js)
- Unused shadcn/ui components and `shadcn` runtime dependency

[1.0.0]: https://github.com/chilohwei/watermark-tool/releases/tag/v1.0.0
