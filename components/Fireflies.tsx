"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Fireflies() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="fireflies"
      options={{
        fullScreen: { enable: true, zIndex: 10 },
        interactivity: { events: {} },
        fpsLimit: 60,
        particles: {
          number: { value: 15 },
          color: { value: "#efc868" },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.1, max: 0.7 },
            animation: { enable: true, speed: 0.4, sync: false },
          },
          size: {
            value: { min: 2, max: 4 },
          },
          shadow: {
            enable: true,
            color: "#efc868",
            blur: 12,
          },
          twinkle: {
            particles: { enable: true, frequency: 0.05, opacity: 1 },
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none" as const,
            random: true,
            straight: false,
            outModes: { default: "out" as const },
          },
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: { size: { value: { min: 1, max: 2.5 } } },
            },
          },
        ],
        detectRetina: true,
      }}
    />
  );
}
