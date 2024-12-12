import FetchCategoryImages from "@/app/components/shared/FetchImageByCategory";

const CouplePage = () => {
    return (
        <FetchCategoryImages category="Couple" excludeCategory="Blog"/>
    )
}

export default CouplePage;