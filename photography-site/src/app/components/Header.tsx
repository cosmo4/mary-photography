import Link from 'next/link';

const Header = () => {
    return (
        <header className="flex justify-between items-center py-6 px-4 md:px-16 border-b border-gray-300">
      
        <nav className="flex space-x-8 text-gray-700 text-xl ml-auto">
          <Link href="/" className="underline-hover hover:text-black">
            Home
          </Link>
          <Link href="/portfolio" className="underline-hover hover:text-black">
            Portfolio
          </Link>
          <Link href="/about" className="underline-hover hover:text-black">
            About
          </Link>
          
        </nav>

        <div className="text-center mx-28">
          <h1 className="text-5xl tracking-wider text-gray-600">Mary Mills</h1>
          <p className="text-xl mt-1 tracking-widest text-gray-700">PHOTOGRAPHY</p>
        </div>

        
        <nav className="flex space-x-8 text-gray-700 text-xl mr-auto">
          <Link href="/blog" className="underline-hover hover:text-black">
            Blog
          </Link>
          <Link href="/investment" className="underline-hover hover:text-black">
            Investment
          </Link>
          <Link href="/contact" className="underline-hover hover:text-black">
            Contact
          </Link>
        </nav>
      </header>
    )
};

export default Header;