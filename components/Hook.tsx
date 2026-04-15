export default function Hook() {
  return (
    <section className="w-full bg-[#0a0a0a] text-[var(--color-mist)]">
      <div className="mx-auto flex w-full max-w-5xl items-start justify-center px-6 pb-12 pt-18 text-center md:pb-16 md:pt-24">
        <div className="w-full max-w-3xl px-2 md:px-0">
          <h2
            className="text-4xl leading-[0.95] md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your voyage awaits.
          </h2>
          <p
            className="mt-8 text-base leading-relaxed text-[var(--color-mist)]/80 md:text-lg"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Tucked away in the heart of Miami lives a cavern lit by stars. A lush,
            immersive retreat hidden from the outside noise. Come to slow down,
            explore, and recharge.
          </p>
        </div>
      </div>
    </section>
  );
}
