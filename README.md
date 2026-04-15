# The Grotto — Website

Immersive scroll-driven landing page for a one-of-a-kind Airbnb experience.

## Stack
- **Next.js 14** (App Router)
- **GSAP + ScrollTrigger** — scroll-scrubbed hero video
- **Tailwind CSS**
- **Vercel** — deployment

## Getting Started

```bash
npm install
npm run dev
```

## Adding Your Video Asset

Drop your hero video into:
```
public/video/the-grotto.mp4
```

The HeroScroll component picks it up automatically. The video is scrubbed by scroll — the taller the height on the scroll container (currently 400vh), the slower the video plays relative to scroll.

## Adding Images

Drop amenity images into `public/images/` then uncomment the img tags in `components/Amenities.tsx`.

## Structure

```
/app
  page.tsx          — main page
  layout.tsx        — fonts, metadata
  globals.css       — CSS variables, base styles

/components
  HeroScroll.tsx    — sticky scroll-scrubbed video hero
  Amenities.tsx     — amenity cards (boat, grotto, cold plunge, office)
  Footer.tsx        — footer

/public
  /video            — drop grotto-hero.mp4 here
  /images           — drop amenity photos here
```

## CSS Variables (globals.css)
- `--color-cave` — dark background
- `--color-warm` — gold accent
- `--color-mist` — light text
- `--color-moss` — green accent
- `--color-glow` — neon green

## Fonts
Playfair Display (headings) + DM Sans (body). Swap in layout.tsx.

## Video scroll speed
Scroll container height is `400vh` in HeroScroll.tsx.
Increase to slow down, decrease to speed up.

## Deploy
```bash
vercel
```
