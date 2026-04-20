"use client";

import { useState } from "react";

type Img = { src: string; alt: string; ar: number }; // ar = height/width

const day: Img[] = [
  { src: "/images/gallery/day/kitchen-day.jpeg",    alt: "Kitchen",     ar: 1535 / 2312 },
  { src: "/images/gallery/day/bathroom.jpeg",        alt: "Bathroom",    ar: 2312 / 1535 },
  { src: "/images/gallery/day/couch.JPG",            alt: "Lounge",      ar: 2847 / 4287 },
  { src: "/images/gallery/day/backyard-day.jpeg",    alt: "Backyard",    ar: 2048 / 1536 },
  { src: "/images/gallery/day/plunge-day.jpeg",      alt: "Cold Plunge", ar: 2048 / 1536 },
  { src: "/images/gallery/day/side-grotto-day.jpeg", alt: "The Grotto",  ar: 2048 / 1536 },
];

const night: Img[] = [
  { src: "/images/gallery/night/frontal-night.jpeg",    alt: "The Grotto at Night", ar: 2048 / 1536 },
  { src: "/images/gallery/night/sauna-night.jpeg",      alt: "Sauna",               ar: 2048 / 1536 },
  { src: "/images/gallery/night/garden.JPG",            alt: "Garden",              ar: 4287 / 2847 },
  { src: "/images/gallery/night/shower.jpeg",           alt: "Shower",              ar: 2048 / 1536 },
  { src: "/images/gallery/night/left-grotto-night.jpeg",alt: "Grotto Left",         ar: 2048 / 1536 },
  { src: "/images/gallery/night/plunge-night.jpeg",     alt: "Cold Plunge at Night",ar: 2048 / 1536 },
];

// Columns for each layout — images arranged to keep column heights as balanced as possible
const layouts = {
  day: {
    // desktop: 3 cols × 2 images
    desktop: [
      [day[0], day[1]], // kitchen(landscape) + bathroom(portrait)
      [day[3], day[2]], // couch(landscape) + backyard(portrait)
      [day[5], day[4]], // side-grotto(portrait) + plunge(portrait)
    ],
    // mobile: 2 cols × 3 images
    mobile: [
      [day[5], day[0], day[1]], // side-grotto + kitchen + bathroom
      [day[2], day[4], day[3]], // couch   + plunge + backyard
    ],
  },
  night: {
    desktop: [
      [night[1], night[0]], // sauna(portrait)               + frontal
      [night[4], night[3]], // left-grotto           + plunge
      [{ ...night[2], ar: 2048 / 1536 }, night[5]], // garden(normalized to match) + shower
    ],
    mobile: [
      [night[1], night[2], night[0]], // garden + frontal + sauna
      [night[4], night[3], night[5]], // shower + left-grotto + plunge
    ],
  },
};

const GAP = 10;

function Columns({ cols, height }: { cols: Img[][]; height: string }) {
  return (
    <div style={{ display: "flex", gap: GAP, height }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: GAP }}>
          {col.map((img) => (
            <div
              key={img.src}
              style={{
                flex: img.ar,
                minHeight: 0,
                overflow: "hidden",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [mode, setMode] = useState<"day" | "night">("day");
  const layout = layouts[mode];
  const body =
    mode === "day"
      ? "The day starts here. Make it yours."
      : "A world of its own. The Grotto after dark.";

  return (
    <section className="relative z-20 mx-auto max-w-6xl px-6 pb-12 pt-18 md:pb-16 md:pt-24">

      {/* Fixed headline */}
      <div className="mx-auto mb-6 w-full max-w-3xl px-2 text-center md:mb-10 md:px-0">
        <h2
          className="text-4xl leading-[0.95] md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--color-mist)" }}
        >
          Find your flow. 
        </h2>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-6 md:mb-8">
        <div
          className="relative flex rounded-full bg-white/[0.04] p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-lg [--gallery-toggle-inset:4px] md:p-1.5 md:[--gallery-toggle-inset:6px]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute top-1 bottom-1 rounded-full backdrop-blur-sm transition-all duration-300 ease-out md:top-1.5 md:bottom-1.5"
            style={{
              left: mode === "day" ? "var(--gallery-toggle-inset)" : "50%",
              right: mode === "day" ? "50%" : "var(--gallery-toggle-inset)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.08), 0 1px 8px rgba(0,0,0,0.1)",
            }}
          />
          <button
            onClick={() => setMode("day")}
            className="relative z-10 flex items-center justify-center rounded-full px-6 py-2.5 transition-colors duration-300 md:px-8 md:py-3"
            aria-label="Day"
          >
            {/* Sun */}
            <svg
              className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: mode === "day" ? "var(--color-firefly)" : "rgba(246,241,230,0.35)" }}>
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2"  x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2"  y1="12" x2="5"  y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
              <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22" />
            </svg>
          </button>
          <button
            onClick={() => setMode("night")}
            className="relative z-10 flex items-center justify-center rounded-full px-6 py-2.5 transition-colors duration-300 md:px-8 md:py-3"
            aria-label="Night"
          >
            {/* Moon */}
            <svg
              className="h-4 w-4 md:h-5 md:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: mode === "night" ? "var(--color-firefly)" : "rgba(246,241,230,0.35)" }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dynamic body copy */}
      <div
        key={`${mode}-copy`}
        className="mx-auto mb-8 w-full max-w-2xl px-2 text-center md:mb-10 md:px-0"
        style={{ animation: "galleryFadeIn 0.35s ease-out" }}
      >
        <p
          className="text-base leading-relaxed text-[var(--color-mist)]/70 md:text-xl"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {body}
        </p>
      </div>

      {/* Mobile: 2 cols */}
      <div className="md:hidden" key={`${mode}-mobile`} style={{ animation: "galleryFadeIn 0.4s ease-out" }}>
        <Columns cols={layout.mobile} height="min(85vh, 640px)" />
      </div>

      {/* Desktop: 3 cols */}
      <div className="hidden md:block" key={`${mode}-desktop`} style={{ animation: "galleryFadeIn 0.4s ease-out" }}>
        <Columns cols={layout.desktop} height="min(78vh, 680px)" />
      </div>

      <style>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
