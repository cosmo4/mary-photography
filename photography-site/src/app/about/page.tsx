import Link from "next/link";
import AboutMe from "../components/sections/AboutMe";
import Image from "next/image";

export default function About() {
    return (
      <div className="min-h-screen w-full md:w-4/5 mx-auto text-gray-600">
        <h2 className="text-5xl md:text-7xl w-4/5 md:w-full mx-auto tracking-widest mt-20">Hello!</h2>
        <p className="text-3xl md:text-4xl w-4/5 md:w-full mx-auto mt-2">I&apos;m so excited you&apos;re here!</p>

        <div className="my-24">
          <AboutMe />
        </div>

        <p className="text-3xl md:text-5xl mx-auto w-1/2 text-center mt-32">
          WHY <span className="italic">I LOVE&nbsp;</span> WHAT <span className="italic">I DO</span>
        </p>

        <div className="flex gap-4 flex-col w-4/5 md:flex-row md:gap-10 md:w-3/5 mx-auto text-lg mt-14 mb-32">
          <div className="flex flex-col md:w-1/2">
            <p>It really is true...A PICTURE IS WORTH 1000 WORDS! I think we can all agree that life has a way of speeding by. A day turns into a week, a week turns into a month, and before we know it a year has gone by.</p>
            <p>In the end, it&apos;s our memories that remind us of the days gone by. For me, the best way to keep memories alive is through photographs.</p>
          </div>
          <div className="md:w-1/2">
            <p>I love providing a gallery of memories for my clients. When you scroll through the images you are taken back to a random day in the year when life was able to slow down for a few hours. You remember the laughter, smiles, and love that filled the moment. Instead of the memories being tucked away, they are frozen in time and able to be relived at any time.</p>
          </div>
        </div>

        <div className="flex flex-col-reverse mb-40 md:block">
          <div className="w-2/3 mx-auto md:w-1/3 md:ml-40">
            <p className="text-3xl md:text-5xl mb-10">MAY THIS BE THE <span className="italic">BEGINNING</span> OF A BEAUTIFUL <span className="italic">FRIENDSHIP</span></p>
            <Link href="/contact" className="text-xl mx-auto md:ml-14 bg-white text-black px-4 py-2 hover:bg-mocha hover:text-sugar duration-300 outline outline-1 outline-gray-500 rounded">Reach Out</Link>
          </div>
          <div className="w-5/6 md:w-2/5 relative md:block md:overflow-hidden md:ml-auto mx-auto md:mt-[-130px] mb-10 md:mb-48">
            <Image src="/about-me-pics/mary-camera.jpg" alt="Camera close up" width={700} height={400} className="object-cover w-full md:ml-14 " />
          </div>

        </div>
      </div>
    );
  }