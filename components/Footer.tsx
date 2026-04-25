const AIRBNB_URL =
  "https://www.airbnb.com/rooms/1631904160399630918?source_impression_id=p3_1776292383_P3gjsu_hW7eesOzy";
const VRBO_URL = "https://www.vrbo.com/5225632?dateless=true";

export default function Footer() {
  const ctaClassName =
    "inline-flex h-[84px] w-[200px] flex-col items-center justify-center rounded-[24px] border border-[var(--color-firefly)]/50 bg-transparent px-5 transition-colors hover:border-[var(--color-firefly)] hover:bg-[var(--color-firefly)]/8 sm:h-[96px] sm:w-[230px] sm:rounded-[28px] sm:px-6";

  return (
    <footer className="border-t border-white/5 px-6 py-16 text-center">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClassName}
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="text-lg font-medium tracking-[0.03em] text-[var(--color-firefly)] sm:text-xl">
            Airbnb
          </span>
          <span className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-mist)]/65 sm:text-sm sm:tracking-[0.22em]">
            Book Now
          </span>
        </a>
        <a
          href={VRBO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClassName}
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="text-lg font-medium tracking-[0.08em] text-[var(--color-firefly)] sm:text-xl">
            VRBO
          </span>
          <span className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-mist)]/65 sm:text-sm sm:tracking-[0.22em]">
            Book Now
          </span>
        </a>
      </div>
    </footer>
  );
}
