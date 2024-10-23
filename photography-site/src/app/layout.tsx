import type { Metadata } from "next";
import "./globals.css";
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';

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
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />
          <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
