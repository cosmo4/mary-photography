import type { Metadata } from "next";
import "./globals.css";
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Mary Mills Photography",
  description: "Senior, family & wedding photographer based in Utah County but ready for an adventure anywhere!",
  icons: {
    icon: '/large-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // Screen width adjustment effect if needed
    // useEffect(() => {
    //   const handleResize = () => {
    //     const screenWidth = window.innerWidth / 1.75;
    //     document.documentElement.style.setProperty('--screen-width', `${screenWidth}px`);
    //   };
  
    //   window.addEventListener('resize', handleResize);
    //   handleResize(); // Set initial value on mount
  
    //   return () => window.removeEventListener('resize', handleResize); // Clean up on unmount
    // }, []);

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <SpeedInsights/>
        <Header />
          <main className="pt-[130px] w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
