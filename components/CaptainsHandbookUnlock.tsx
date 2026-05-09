"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const PDF_API = "/api/captains-handbook";
/** Client-side hint for Chrome / many embedded PDF UIs: fit page width (reduces “zoomed in” on narrow screens). */
const PDF_IFRAME_SRC = `${PDF_API}#view=FitH`;

export default function CaptainsHandbookUnlock() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setPassword("");
    setError(null);
    setLoading(false);
  }, []);

  /** Prefetch cookie session so the modal can open on PDF or form without a loading beat. */
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(`${PDF_API}?check=1`);
        const data = (await res.json()) as { unlocked?: boolean };
        if (!cancelled && data.unlocked) setUnlocked(true);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Re-check when the modal opens (e.g. cookie set in another tab). No loading UI. */
  useEffect(() => {
    if (!open) return;
    void (async () => {
      try {
        const res = await fetch(`${PDF_API}?check=1`);
        const data = (await res.json()) as { unlocked?: boolean };
        if (data.unlocked) setUnlocked(true);
      } catch {
        /* ignore */
      }
    })();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || unlocked) return;
    const t = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLInputElement>('input[type="password"]')
        ?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open, unlocked]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(PDF_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("That didn’t match. Try again, or message your host.");
        return;
      }
      setUnlocked(true);
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 mb-5 flex flex-col items-center md:mt-8 md:mb-6">
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group relative rounded-full p-[clamp(0.25rem,1.5vw,0.5rem)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-firefly)]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
      >
        <span className="sr-only">Open captain&apos;s handbook</span>
        <Image
          src="/assets/ship-wheel.png"
          alt=""
          width={512}
          height={512}
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 32vw, min(20rem, 24vw)"
          className="pointer-events-none aspect-square h-auto w-[clamp(7.75rem,46vw,12.5rem)] max-w-[min(94vw,15.5rem)] select-none drop-shadow-lg sm:w-[clamp(8.25rem,40vw,13rem)] md:w-[clamp(10rem,30vw,15rem)] md:max-w-[min(42vw,17rem)] lg:w-[clamp(12rem,24vw,18.5rem)] lg:max-w-[20rem]"
          priority
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 backdrop-blur-[2px] sm:p-4"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={unlocked ? undefined : titleId}
            aria-label={unlocked ? "Captain's handbook" : undefined}
            className={`relative max-h-[min(92dvh,calc(100dvh-1rem))] w-full max-md:max-w-[min(100%,26rem)] overflow-y-auto overscroll-contain rounded-2xl border border-[var(--color-firefly)]/35 bg-[var(--color-midnight-surface)] px-4 py-5 shadow-2xl sm:rounded-[28px] sm:px-6 sm:py-7 md:max-h-none md:overflow-visible md:px-8 md:py-8 ${
              unlocked ? "md:max-w-3xl" : "md:max-w-lg"
            }`}
          >
            {unlocked ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    window.setTimeout(() => openButtonRef.current?.focus(), 0);
                  }}
                  className="absolute right-4 top-4 rounded-full p-2 text-[var(--color-mist)]/60 transition-colors hover:bg-white/5 hover:text-[var(--color-mist)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-firefly)]"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
                <div className="space-y-4 pt-12 md:pt-14">
                  {/* Embedded viewer: md+ only — avoids flaky mobile iframe PDF UX */}
                  <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-black/30 md:block">
                    <iframe
                      title="Captain's handbook PDF"
                      src={PDF_IFRAME_SRC}
                      loading="lazy"
                      className="h-[min(75dvh,520px)] w-full"
                    />
                  </div>
                  <a
                    href={PDF_API}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--color-firefly)]/50 bg-[var(--color-firefly)]/10 py-3.5 text-center text-base font-medium text-[var(--color-firefly)] transition-colors hover:border-[var(--color-firefly)] hover:bg-[var(--color-firefly)]/18 md:hidden"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Open the Captain&apos;s Handbook
                  </a>
                  <a
                    href={`${PDF_API}?download=1`}
                    className="hidden w-full items-center justify-center rounded-2xl border border-[var(--color-firefly)]/50 bg-[var(--color-firefly)]/10 py-3.5 text-center text-base font-medium text-[var(--color-firefly)] transition-colors hover:border-[var(--color-firefly)] hover:bg-[var(--color-firefly)]/18 md:inline-flex"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Download the Captain&apos;s Handbook
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2 grid w-full grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-x-2">
                  <span className="block w-10 shrink-0" aria-hidden />
                  <h3
                    id={titleId}
                    className="min-w-0 text-center text-2xl text-[var(--color-mist)] md:text-3xl"
                    style={{ fontFamily: "var(--font-header)" }}
                  >
                    Welcome aboard
                  </h3>
                  <div className="flex w-10 shrink-0 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        window.setTimeout(
                          () => openButtonRef.current?.focus(),
                          0,
                        );
                      }}
                      className="rounded-full p-2 text-[var(--color-mist)]/60 transition-colors hover:bg-white/5 hover:text-[var(--color-mist)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-firefly)]"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                        aria-hidden
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]/70 md:text-base"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Enter the code below to access the captain&apos;s handbook.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <input
                    type="password"
                    name="code"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Access code"
                    className="w-full rounded-2xl border border-white/15 bg-[var(--color-midnight)] px-4 py-3.5 text-[var(--color-mist)] placeholder:text-[var(--color-mist)]/35 focus:border-[var(--color-firefly)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-firefly)]/25"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  {error ? (
                    <p
                      className="text-left text-sm text-red-300/90"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {error}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={loading || password.length === 0}
                    className="w-full rounded-2xl border border-[var(--color-firefly)]/50 bg-[var(--color-firefly)]/10 py-3.5 text-base font-medium text-[var(--color-firefly)] transition-colors enabled:hover:border-[var(--color-firefly)] enabled:hover:bg-[var(--color-firefly)]/18 disabled:cursor-not-allowed disabled:opacity-45"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {loading ? "Unlocking…" : "Unlock"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
