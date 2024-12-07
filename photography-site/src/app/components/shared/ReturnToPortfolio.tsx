import Link from "next/link";

const ReturnToPortfolio = () => {
    return(
        <div className="my-5 inline-block hover:scale-110 hover:text-gray-400 duration-300 transform origin-left">
            <Link href="/portfolio" className="text-3xl text-gray-600 px-4 py-2">&#10094;&nbsp; Back</Link>
        </div>
    )
}

export default ReturnToPortfolio;