const AIRBNB_URL =
  "https://www.airbnb.com/rooms/1631904160399630918?source_impression_id=p3_1776292383_P3gjsu_hW7eesOzy";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-16 text-center">
      <a
        href={AIRBNB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-[var(--color-firefly)] px-7 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-midnight)] transition-opacity hover:opacity-90"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Book on Airbnb
      </a>
    </footer>
  );
}
