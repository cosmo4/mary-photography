import Link from "next/link";

const Admin = () => {
    return(
        <div className="w-4/5 mx-auto my-24 min-h-lvh">
            <p className="text-4xl mb-14">Hello Mary!</p>
            <div className="flex gap-24 justify-center text-2xl text-sugar">
                <Link href="/admin/manage-blog" className="bg-oak px-10 py-5 rounded-md hover:bg-mocha">Manage Blog</Link>
                <Link href="/admin/manage-portfolio" className="bg-oak px-10 py-5 rounded-md hover:bg-mocha">Manage Portfolio</Link>
                <Link href="/admin/manage-prices" className="bg-oak px-10 py-5 rounded-md hover:bg-mocha">Manage Prices</Link>

            </div>
            
        </div>
        
    )
}

export default Admin;