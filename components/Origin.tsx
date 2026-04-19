import BeforeAfterSlider from "./BeforeAfterSlider";

const BEFORE = "/images/before.png";
const AFTER = "/images/after.jpg";

export default function Origin() {
  return (
    <section className="w-full bg-[var(--color-midnight)] text-[var(--color-mist)]">
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

      <div className="mx-auto max-w-4xl px-6 pb-24 md:pb-36">
        <BeforeAfterSlider
          beforeSrc={BEFORE}
          afterSrc={AFTER}
          beforeAlt="Before: raw garage and boat"
          afterAlt="After: The Grotto today"
        />
      </div>
    </section>
  );
}
