"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    id: "boat-cabin",
    label: "The Boat Cabin",
    headline: "Sleep inside the boat.",
    description:
      "A fully refurbished cabin tucked inside the hull. Starry ceiling, warm amber lighting, a hand-painted ocean mural, and a memory foam bed. This is your world.",
    tag: "Where you sleep",
    // image: "/images/boat-cabin.jpg",
  },
  {
    id: "grotto",
    label: "The Grotto",
    headline: "Cave meets kitchen.",
    description:
      "Moss-covered walls, lush plants, draping fabric overhead, and an outdoor kitchen on turf — all inside a converted garage space that feels like another dimension.",
    tag: "The main space",
    // image: "/images/grotto.jpg",
  },
  {
    id: "cold-plunge",
    label: "Cold Plunge + Sauna",
    headline: "Reset completely.",
    description:
      "A full cold plunge and sauna setup in the shared community space. The contrast protocol. Start hot, finish cold. Leave feeling like a new person.",
    tag: "Shared amenity",
    // image: "/images/cold-plunge.jpg",
  },
  {
    id: "office",
    label: "The Cottage Office",
    headline: "Work with a view.",
    description:
      "A nautical-themed workspace with ocean cottage energy. Natural light, cozy details, and enough quiet to actually get something done.",
    tag: "Work space",
    // image: "/images/office.jpg",
  },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.05,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-6xl px-6 pb-24 pt-8 md:pb-36 md:pt-12">
      {/* Section header */}
      <div className="mb-20 md:mb-28">
        <p
          className="text-xs uppercase tracking-[0.4em] mb-4 opacity-50"
          style={{ color: "var(--color-warm)" }}
        >
          What's inside
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold leading-tight max-w-lg"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--color-mist)" }}
        >
          Every corner has a story.
        </h2>
      </div>

      {/* Amenity cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {amenities.map((amenity, i) => (
          <div
            key={amenity.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="group relative rounded-2xl overflow-hidden border border-white/5"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Image placeholder — swap with real img when assets ready */}
            <div
              className="w-full aspect-video relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {/* <img src={amenity.image} alt={amenity.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <p className="text-xs tracking-widest uppercase" style={{ color: "var(--color-warm)" }}>
                  {amenity.label}
                </p>
              </div>
            </div>

            {/* Card content */}
            <div className="p-6 md:p-8">
              <span
                className="text-xs uppercase tracking-[0.3em] opacity-40 mb-3 block"
                style={{ color: "var(--color-warm)" }}
              >
                {amenity.tag}
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--color-mist)" }}
              >
                {amenity.headline}
              </h3>
              <p
                className="text-sm leading-relaxed opacity-60"
                style={{ color: "var(--color-mist)" }}
              >
                {amenity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
