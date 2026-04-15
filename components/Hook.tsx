export default function Hook() {
  return (
    <section className="w-full bg-[#0a0a0a] text-[var(--color-mist)]">
      <div className="mx-auto flex w-full max-w-5xl items-start justify-center px-6 pb-8 pt-14 text-center md:pb-10 md:pt-20">
        <div
          className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)",
          }}
        >
          <h2
            className="text-3xl leading-[0.95] md:text-6xl lg:text-7xl"
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
