import EmblaCarousel from './components/sections/EmblaCarousel';
import Quote from './components/sections/MainQuote';
import RecentWork from './components/sections/RecentWork';
import AboutMe from './components/sections/AboutMe';
// import HeroSlideShow from "./components/HeroSlideShow";

export default function Home() {
  const options = { loop: true };

  return (
    <div className="min-h-screen">
      {/* <Image Carousel /> */}
      {/* <EmblaCarousel options={options} /> */}

      {/* Recent Work Section */}
      <RecentWork />

      {/* Quote Section */}
      <Quote />

      {/* About Me Section */}
      <AboutMe />
      
    </div>
  );
}
