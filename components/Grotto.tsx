"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "quarters",
    label: "The Quarters",
    headline: "The Quarters",
    description:
      "Step aboard and explore the Captain's Quarters. Find a cozy lounge nestled beside the captain's wheel. When the night calls, surrender to a bed wrapped in warm light, deep inside the hull.",
    image: "/images/captains-quarters.jpg",
  },
  {
    id: "cavern",
    label: "The Cavern",
    headline: "The Cavern",
    description:
      "The heart of the grotto. Moss-covered walls, lush hanging plants, and a vibrant pergola-framed kitchenette. Time moves differently here. Cook, gather, and let the grotto set the rhythm.",
      image: "/images/cavern.jpg",
  },
  {
    id: "threshold",
    label: "Cold Plunge + Sauna",
    headline: "The Threshold",
    description:
      "Enter the threshold. A cold plunge and sauna waiting in perfect opposition. Give yourself over to the contrast, and leave feeling rebuilt.",
    image: "/images/threshold.jpg",
  },
  {
    id: "cabin",
    label: "The Cabin",
    headline: "The Cabin",
    description:
      "Find your focus in the cabin. A private, nautical-themed workspace tucked within the cavern — succulents, cool air, and everything you need within reach. The outside world can wait.",
    image: "/images/cabin.jpg",
  },
];

export default function Grotto() {
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

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {features.map((feature, i) => (
          <div
            key={feature.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="group relative rounded-2xl overflow-hidden border border-white/5"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="w-full aspect-video relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {feature.image ? (
                <img
                  src={feature.image}
                  alt={feature.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <p className="text-xs tracking-widest uppercase" style={{ color: "var(--color-warm)" }}>
                    {feature.label}
                  </p>
                </div>
              )}
            </div>

            {/* Feature content */}
            <div className="p-6 md:p-8">
              <h3
                className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--color-mist)" }}
              >
                {feature.headline}
              </h3>
              <p
                className="text-sm leading-relaxed opacity-60"
                style={{ color: "var(--color-mist)" }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
