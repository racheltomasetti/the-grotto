const BEFORE_PLACEHOLDER = "/images/before.jpg";
const AFTER_PLACEHOLDER = "/images/after.jpg";

export default function Origin() {
  return (
    <section className="w-full bg-[#0a0a0a] text-[var(--color-mist)]">
      <div className="mx-auto flex w-full max-w-5xl items-start justify-center px-6 pb-8 text-center md:pb-10 pt-18 md:pt-24">
        <div className="w-full max-w-3xl px-2 md:px-0">
          <h2
            className="text-4xl leading-[0.95] md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            How it began.
          </h2>
          <p
            className="mt-8 text-base leading-relaxed text-[var(--color-mist)]/80 md:text-lg"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            It started with a retired vessel and a vision. The Scanlon family — Miami born and
            raised — saw something in an empty garage and a boat with nowhere left to go. Six
            months of building by hand later, The Grotto was born. A one of a kind experience
            for those who find it.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 md:pb-36">
        <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-8">
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="aspect-[4/3] w-full">
              <img
                src={BEFORE_PLACEHOLDER}
                alt="Before: raw garage and boat"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption
              className="px-4 py-3 text-[10px] uppercase tracking-[0.3em] opacity-50"
              style={{ color: "var(--color-warm)" }}
            >
              Before
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="aspect-[4/3] w-full">
              <img
                src={AFTER_PLACEHOLDER}
                alt="After: The Grotto today"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption
              className="px-4 py-3 text-[10px] uppercase tracking-[0.3em] opacity-50"
              style={{ color: "var(--color-warm)" }}
            >
              Now
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
