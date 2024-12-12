import UploadPortfolio from "@/app/components/sections/UploadPortfolio"
import GoBack from "@/app/components/shared/GoBack"
const ManagePortfolio = () => {
    return (
        <div>
            <div className="flex flex-col gap-8 w-1/2 mx-auto my-20">
                <GoBack path="/admin" />
                <UploadPortfolio />
            </div>

        </div>
    )
}

export default ManagePortfolio