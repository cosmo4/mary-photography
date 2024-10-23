import Link from "next/link";

export default function Blog() {
    return (
      <div className="min-h-screen">
        <h2>Congrats on navigating to the Blog page!</h2>
        <Link href="/blog/post">
            Click me to see one post
        </Link>
      </div>
    );
  }