import FetchCategoryImages from "@/app/components/shared/FetchImageByCategory";

const FamilyPage = () => {
    return (
        <FetchCategoryImages category="Family" excludeCategory="Blog" />
    )
}

export default FamilyPage;