import UploadPortfolio from "@/app/components/sections/UploadPortfolio"
import GoBack from "@/app/components/shared/GoBack"
const ManagePortfolio = () => {
    return (
        <div>
            <div className="flex flex-col gap-8 w-4/5 md:w-1/2 mx-auto mt-10 mb-20 md:my-20">
                <GoBack path="/admin" />
                <h2 className="text-4xl md:text-5xl text-gray-600">Add Images to Portfolio</h2>
                <UploadPortfolio />
            </div>

        </div>
    )
}

export default ManagePortfolio