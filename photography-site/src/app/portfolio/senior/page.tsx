import FetchCategoryImages from "@/app/components/shared/FetchImageByCategory";

const SeniorPage = () => {
    return (
        <FetchCategoryImages category="Senior" excludeCategory="Blog" />
    )
}

export default SeniorPage;