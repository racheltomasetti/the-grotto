const AIRBNB_URL =
  "https://www.airbnb.com/rooms/1631904160399630918?source_impression_id=p3_1776292383_P3gjsu_hW7eesOzy";
const VRBO_URL = "https://www.vrbo.com/5225632?dateless=true";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-16 text-center">
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-[var(--color-firefly)] px-7 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-midnight)] transition-opacity hover:opacity-90 sm:w-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Book on Airbnb
        </a>
        <a
          href={VRBO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-md border border-[var(--color-firefly)]/50 bg-transparent px-7 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-firefly)] transition-colors hover:border-[var(--color-firefly)] hover:bg-[var(--color-firefly)]/10 sm:w-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Book on VRBO
        </a>
      </div>
    </footer>
  );
}
