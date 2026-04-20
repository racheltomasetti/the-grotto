"use client";
import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPosition(pct);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging.current) updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging.current) updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [onMouseMove, onMouseUp, onTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 select-none cursor-col-resize"
      onMouseDown={(e) => {
        isDragging.current = true;
        updatePosition(e.clientX);
      }}
      onTouchStart={(e) => {
        isDragging.current = true;
        updatePosition(e.touches[0].clientX);
      }}
    >
      {/* Before image — full width base layer */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      {/* After image — clipped, revealed by dragging right */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-px pointer-events-none"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          backgroundColor: "var(--color-warm)",
          opacity: 0.8,
        }}
      >
        {/* Circular drag handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2"
          style={{
            backgroundColor: "var(--color-midnight)",
            borderColor: "var(--color-warm)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M5.5 4L2 8L5.5 12"
              stroke="var(--color-warm)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 4L14 8L10.5 12"
              stroke="var(--color-warm)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
