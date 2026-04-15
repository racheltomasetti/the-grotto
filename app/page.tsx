import HeroScroll from "@/components/HeroScroll";
import Amenities from "@/components/Amenities";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <HeroScroll />
      <Amenities />
      <Footer />
    </main>
  );
}
