import EmblaCarousel from '../app/components/EmblaCarousel';
// import HeroSlideShow from "./components/HeroSlideShow";

export default function Home() {
  const options = { loop: true };

  return (
    <div className="min-h-screen">
      {/* <HeroSlideShow /> */}
      <EmblaCarousel options={options} />

    </div>
  );
}
