const AIRBNB_URL =
  "https://www.airbnb.com/rooms/1631904160399630918?source_impression_id=p3_1776292383_P3gjsu_hW7eesOzy";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-16 text-center">
      <p
        className="text-xs uppercase tracking-[0.4em] opacity-30"
        style={{ color: "var(--color-mist)" }}
      >
        The Grotto
      </p>
      <a
        href={AIRBNB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--color-warm)]/40 bg-[var(--color-warm)]/10 px-8 py-3 text-sm font-medium tracking-wide text-[var(--color-mist)] transition-colors hover:bg-[var(--color-warm)]/20"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Book on Airbnb
      </a>
    </footer>
  );
}
