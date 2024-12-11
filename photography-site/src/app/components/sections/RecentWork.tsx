import Link from "next/link"
import Image from "next/image"

const RecentWork = () => {
    return (
        <section>
        <div className="bg-bone flex gap-2 pl-20 pt-8 pb-20 w-[500px]">
          <p className="text-5xl">Recent </p>
          <p className="text-5xl italic">WORK</p>
        </div>
        <div className="flex gap-14 mx-60 mt-[-25px] mb-10 text-center">
          {/* Senior Category */}
          <div className="w-[300px] group">
            <Link href="/portfolio/Senior" className="relative block overflow-hidden rounded-md aspect-[4/5]">
              <Image
                src="/senior-category.webp"
                alt="Senior student"
                fill
                className="object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-300"
              />
            </Link>
            <p className="mt-2 text-2xl font-semibold">Senior</p>
            <div className="w-[150px] mx-auto outline outline-1 outline-gray-500">
                <Link href="/portfolio/senior" className="block text-xl mt-2 bg-white text-black px-4 py-2 hover:bg-mocha hover:text-sugar duration-300">
                See Album
                </Link>
            </div>
          </div>

          {/* Family Category */}
          <div className="w-[300px] group">
            <Link href="/portfolio/family" className="relative block overflow-hidden rounded-md aspect-[4/5]">
              <Image
                src="/family-category.webp"
                alt="Young family"
                fill
                className="object-cover group-hover:opacity-90 group-hover:scale-110 transition-all duration-300"
              />
            </Link>
            <p className="mt-2 text-center text-2xl font-semibold">Families</p>
            <div className="w-[150px] mx-auto outline outline-1 outline-gray-500">
                <Link href="/portfolio/family" className="block text-xl mt-2 bg-white text-black px-4 py-2 hover:bg-mocha hover:text-sugar duration-300">
                See Album
                </Link>
            </div>
          </div>

          {/* Couple Category */}
          <div className="w-[300px] group">
            <Link href="/portfolio/couple" className="relative block overflow-hidden rounded-md aspect-[4/5]">
              <Image
                src="/couple-category.webp"
                alt="Couple"
                fill
                className="object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-300"
              />
            </Link>
            <p className="mt-2 text-center text-2xl font-semibold">Couples</p>
            <div className="w-[150px] mx-auto outline outline-1 outline-gray-500">
                <Link href="/portfolio/couple" className="block text-xl mt-2 bg-white text-black px-4 py-2 hover:bg-mocha hover:text-sugar duration-300">
                See Album
                </Link>
            </div>
          </div>

          {/* Wedding Category */}
          <div className="w-[300px] group">
            <Link href="/portfolio/wedding" className="relative block overflow-hidden rounded-md aspect-[4/5]">
              <Image
                src="/wedding-category.webp"
                alt="Bride and Groom"
                fill
                className="object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-300"
              />
            </Link>
            <p className="mt-2 text-center text-2xl font-semibold">Weddings</p>
            <div className="w-[150px] mx-auto outline outline-1 outline-gray-500">
                <Link href="/portfolio/wedding" className="block text-xl mt-2 bg-white text-black px-4 py-2 hover:bg-mocha hover:text-sugar duration-300">
                See Album
                </Link>
            </div>
          </div>
        </div>
      </section>
    )
};

export default RecentWork;