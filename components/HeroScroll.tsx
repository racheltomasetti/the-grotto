"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 140;
const FRAME_SEQUENCE_VERSION = "2026-04-15-b";
const FRAME_PATH = (n: number) =>
  `/frames/frame-${String(n).padStart(4, "0")}.jpg?v=${FRAME_SEQUENCE_VERSION}`;
const MOBILE_PROGRESS_MULTIPLIER = 1.2;

export default function HeroScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const video = videoRef.current;
    if (!section || !img || !video) return;

    let isDisposed = false;
    let rafId = 0;
    let displayedFrame = 1;
    // Keep behavior aligned with CSS breakpoints used for rendering.
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;

    const detectFrameExt = async (): Promise<"jpg" | "webp"> => {
      const canLoad = (ext: "jpg" | "webp") =>
        new Promise<boolean>((resolve) => {
          const probe = new Image();
          probe.onload = () => resolve(true);
          probe.onerror = () => resolve(false);
          probe.src = `/frames/frame-0001.${ext}?v=${FRAME_SEQUENCE_VERSION}`;
        });

      if (await canLoad("jpg")) return "jpg";
      if (await canLoad("webp")) return "webp";
      return "jpg";
    };

    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
    const framePathWithExt = (index: number, ext: "jpg" | "webp") =>
      `/frames/frame-${String(index).padStart(4, "0")}.${ext}?v=${FRAME_SEQUENCE_VERSION}`;

    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      const scrolledWithinSection = -rect.top;
      return clamp01(scrolledWithinSection / totalScrollable);
    };

    const setupSharedTextAnimations = () => {
      gsap.to(overlayTextRef.current, {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });

      gsap.to(scrollPromptRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "5% top",
          scrub: true,
        },
      });
    };

    const initMobileFrames = async () => {
      const ext = await detectFrameExt();
      if (isDisposed) return;

      const frameCache = new Map<number, HTMLImageElement>();
      const loadedFrames = new Set<number>();
      const loadQueue: number[] = [];

      const queueFrame = (frameIndex: number) => {
        if (
          frameIndex < 1 ||
          frameIndex > TOTAL_FRAMES ||
          frameCache.has(frameIndex) ||
          loadQueue.includes(frameIndex)
        ) {
          return;
        }
        loadQueue.push(frameIndex);
      };

      const primeFrame = (frameIndex: number) => {
        if (frameIndex < 1 || frameIndex > TOTAL_FRAMES || frameCache.has(frameIndex)) {
          return;
        }
        const preload = new Image();
        preload.decoding = "async";
        preload.onload = () => {
          loadedFrames.add(frameIndex);
        };
        preload.src = framePathWithExt(frameIndex, ext);
        frameCache.set(frameIndex, preload);
      };

      const pumpQueue = () => {
        if (isDisposed || loadQueue.length === 0) return;
        const next = loadQueue.shift();
        if (typeof next === "number") {
          primeFrame(next);
        }
        const idleCallback = (
          globalThis as typeof globalThis & {
            requestIdleCallback?: (
              callback: IdleRequestCallback,
              options?: IdleRequestOptions
            ) => number;
          }
        ).requestIdleCallback;
        if (idleCallback) {
          idleCallback(pumpQueue, { timeout: 120 });
        } else {
          setTimeout(pumpQueue, 16);
        }
      };

      // Keep mobile lighter up front, then continue loading the rest in background.
      const initialPreloadCount = isMobileViewport ? 36 : 40;
      for (let i = 1; i <= Math.min(TOTAL_FRAMES, initialPreloadCount); i++) {
        primeFrame(i);
      }
      for (let i = initialPreloadCount + 1; i <= TOTAL_FRAMES; i++) {
        queueFrame(i);
      }
      pumpQueue();

      const findNearestLoadedFrame = (target: number, current: number) => {
        if (loadedFrames.has(target)) return target;
        const movingForward = target >= current;
        for (let distance = 1; distance < TOTAL_FRAMES; distance++) {
          const lower = target - distance;
          const upper = target + distance;
          if (movingForward) {
            if (upper <= TOTAL_FRAMES && loadedFrames.has(upper)) return upper;
            if (lower >= 1 && loadedFrames.has(lower)) return lower;
          } else {
            if (lower >= 1 && loadedFrames.has(lower)) return lower;
            if (upper <= TOTAL_FRAMES && loadedFrames.has(upper)) return upper;
          }
        }
        return 1;
      };

      const setFrameSrc = (frameIndex: number) => {
        if (frameIndex === displayedFrame) return;
        const frame = frameCache.get(frameIndex);
        if (frame) {
          img.src = frame.src;
          displayedFrame = frameIndex;
          return;
        }
        // Worst-case fallback; should be rare once preloading ramps up.
        img.src = framePathWithExt(frameIndex, ext);
        displayedFrame = frameIndex;
      };

      const updateFrame = () => {
        if (isDisposed) return;
        const rawProgress = computeProgress();
        const progress = clamp01(
          rawProgress * (isMobileViewport ? MOBILE_PROGRESS_MULTIPLIER : 1)
        );
        const targetFrameIndex = Math.max(
          1,
          Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
        );
        // Prioritize upcoming frames around current target for smoother scrub.
        queueFrame(targetFrameIndex);
        queueFrame(targetFrameIndex + 1);
        queueFrame(targetFrameIndex + 2);
        queueFrame(targetFrameIndex + 3);
        queueFrame(targetFrameIndex - 1);
        queueFrame(targetFrameIndex - 2);

        const nextDrawableFrame = findNearestLoadedFrame(targetFrameIndex, displayedFrame);
        setFrameSrc(nextDrawableFrame);
      };

      const requestUpdate = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateFrame);
      };

      // Render the first frame immediately with the detected extension.
      img.src = framePathWithExt(1, ext);
      displayedFrame = 1;
      requestUpdate();

      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("touchmove", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      window.addEventListener("orientationchange", requestUpdate);
      setupSharedTextAnimations();

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("touchmove", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        window.removeEventListener("orientationchange", requestUpdate);
      };
    };

    const initDesktopVideo = () => {
      let scrubTrigger: ScrollTrigger | null = null;

      const setupVideoScrub = () => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;

        video.pause();
        video.currentTime = 0;

        scrubTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            video.currentTime = self.progress * duration;
          },
        });

        setupSharedTextAnimations();
        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        setupVideoScrub();
      } else {
        video.addEventListener("loadedmetadata", setupVideoScrub, { once: true });
      }

      return () => {
        video.removeEventListener("loadedmetadata", setupVideoScrub);
        scrubTrigger?.kill();
      };
    };

    let detachListeners: (() => void) | undefined;
    if (isMobileViewport) {
      // Mobile: frame sequence scrub (user will regenerate frames from the mobile source clip).
      void initMobileFrames().then((cleanup) => {
        detachListeners = cleanup;
      });
    } else {
      // Desktop: scroll-scrubbed MP4.
      detachListeners = initDesktopVideo();
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      detachListeners?.();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[300vh] md:h-[400vh]">
      <div className="sticky top-0 h-[90vh] md:h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/video/the-grotto.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />

        <img
          ref={imgRef}
          src={FRAME_PATH(1)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />

        {/* Dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
        />

        {/* Hero text */}
        <div
          ref={overlayTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <p
            className="text-xs uppercase tracking-[0.4em] mb-4 opacity-70"
            style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-warm)" }}
          >
            A hidden world awaits
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-mist)" }}
          >
            The Grotto
          </h1>
          {/* <p
            className="text-base md:text-lg max-w-sm opacity-60"
            style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-mist)" }}
          >
            A boat cabin. A cave. A night you won't forget.
          </p> */}
        </div>

        {/* Scroll prompt */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] opacity-50"
            style={{ color: "var(--color-mist)" }}
          >
            Scroll to enter
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white opacity-30 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
