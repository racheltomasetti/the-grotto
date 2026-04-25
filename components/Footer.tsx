const AIRBNB_URL =
  "https://www.airbnb.com/rooms/1631904160399630918?source_impression_id=p3_1776292383_P3gjsu_hW7eesOzy";
const VRBO_URL = "https://www.vrbo.com/5225632?dateless=true";

export default function Footer() {
  const ctaClassName =
    "inline-flex h-[96px] w-[230px] flex-col items-center justify-center rounded-[28px] border border-[var(--color-firefly)]/50 bg-transparent px-6 transition-colors hover:border-[var(--color-firefly)] hover:bg-[var(--color-firefly)]/8";

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
          <span className="text-xl font-medium tracking-[0.03em] text-[var(--color-firefly)]">
            Airbnb
          </span>
          <span className="mt-1 text-sm uppercase tracking-[0.22em] text-[var(--color-mist)]/65">
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
          <span className="text-xl font-medium tracking-[0.08em] text-[var(--color-firefly)]">
            VRBO
          </span>
          <span className="mt-1 text-sm uppercase tracking-[0.22em] text-[var(--color-mist)]/65">
            Book Now
          </span>
        </a>
      </div>
    </footer>
  );
}
