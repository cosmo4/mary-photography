
// The landing page will have the gallery separated into 5 categories which the user can select
// One of the options will be to view the entire gallery. This will lead to the query of 
// the most recent photos uploaded by Mary.

import Link from "next/link";

export default function Portfolio() {
    return (
      <div className="min-h-screen ">
        <h2 className="p-8">Congrats on navigating to the Portfolio page!</h2>
        <Link href="portfolio/all" className="text-2xl text-black bg-sage hover:text-sugar hover:bg-mocha px-8 py-4 mx-10 my">See Gallery</Link>
      </div>
    );
  }