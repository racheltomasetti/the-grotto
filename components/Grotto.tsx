type Feature = {
  id: string;
  label: string;
  headline: string;
  description: string;
  image: string;
  /** Use `contain` to letterbox; default is cover (fills frame). */
  imageFit?: "cover" | "contain";
  /**
   * With `cover`, bias which part of the photo stays visible when cropping.
   * `top` uses a soft upper-third anchor (bias toward the top, not the edge).
   */
  imagePosition?: "center" | "top" | "bottom";
};

const features: Feature[] = [
  {
    id: "quarters",
    label: "The Quarters",
    headline: "The Quarters",
    description:
      "Step aboard and explore the Captain's Quarters. Find a cozy lounge nestled beside the captain's wheel. When the night calls, surrender to a bed wrapped in warm light, deep inside the hull.",
    image: "/images/captains-quarters.jpg",
  },
  {
    id: "cavern",
    label: "The Cavern",
    headline: "The Cavern",
    description:
      "The heart of the grotto. Moss-covered walls, lush hanging plants, and a vibrant pergola-framed kitchenette. Time moves differently here. Cook, gather, and let the grotto set the rhythm.",
      image: "/images/cavern.jpg",
  },
  {
    id: "threshold",
    label: "Cold Plunge + Sauna",
    headline: "The Threshold",
    description:
      "Enter the threshold. A cold plunge and sauna waiting in perfect opposition. Give yourself over to the contrast, and leave feeling rebuilt.",
    image: "/images/threshold.jpg",
  },
  {
    id: "bridge",
    label: "The Bridge",
    headline: "The Bridge",
    description:
      "Find your focus in the bridge. A private, nautical-themed workspace tucked within the cavern — succulents, cool air, and everything you need within reach. The outside world can wait.",
    image: "/images/bridge.jpg",
  },
  {
    id: "head",
    label: "The Head",
    headline: "The Head",
    description:
      "Your private bathroom, finished with marble tile floors, a walk-in shower, and adjustable lighting. Everything you need to reset and get back to it.",
    image: "/images/head.jpg",
    imagePosition: "top",
  },
];

export default function Grotto() {
  return (
    <section className="relative z-20 mx-auto max-w-6xl px-6 pb-0 pt-8 md:pt-12">

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
              index === features.length - 1
                ? "md:col-span-2 md:w-[calc((100%-2rem)/2)] md:max-w-none md:justify-self-center"
                : ""
            }`}
            style={{
              /* Stay above canvas (--color-midnight); never blend down to it or cards read darker than the page */
              background:
                "linear-gradient(135deg, rgb(38, 40, 54) 0%, rgb(30, 30, 42) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="w-full aspect-video relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {feature.image ? (
                <img
                  src={feature.image}
                  alt={feature.label}
                  className={`h-full w-full ${
                    feature.imageFit === "contain"
                      ? "object-contain object-center"
                      : feature.imagePosition === "bottom"
                        ? "object-cover object-bottom"
                        : feature.imagePosition === "top"
                          ? "object-cover object-[50%_44%]"
                          : "object-cover"
                  }`}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <p className="text-xs tracking-widest uppercase" style={{ color: "var(--color-moss)" }}>
                    {feature.label}
                  </p>
                </div>
              )}
            </div>

            {/* Feature content */}
            <div className="p-6 md:p-8">
              <h3
                className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--color-mist)" }}
              >
                {feature.headline}
              </h3>
              <p className="text-sm md:text-lg leading-relaxed opacity-75" style={{ color: "var(--color-mist)" }}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
