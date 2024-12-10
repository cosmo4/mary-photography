// Just some practice with reusability

import Link from "next/link";
import React from "react";

interface GoBackProps {
    path: string;
}

const GoBack: React.FC<GoBackProps> = ({ path }) => {
    return(
        <div className="my-5 inline-block hover:scale-110 hover:text-gray-400 duration-300 transform origin-left">
            <Link href={path} className="text-3xl text-gray-600 py-2">&#10094;&nbsp; Back</Link>
        </div>
    )
}

export default GoBack;