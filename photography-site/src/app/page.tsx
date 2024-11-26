import EmblaCarousel from './components/sections/EmblaCarousel';
import RecentWork from './components/sections/RecentWork';
// import HeroSlideShow from "./components/HeroSlideShow";

export default function Home() {
  const options = { loop: true };

  return (
    <div className="min-h-screen">
      {/* <Image Carousel /> */}
      <EmblaCarousel options={options} />
      {/* Recent Work Section */}
      <RecentWork />
      
    </div>
  );
}
