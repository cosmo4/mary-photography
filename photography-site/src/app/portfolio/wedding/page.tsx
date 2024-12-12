import FetchCategoryImages from "@/app/components/shared/FetchImageByCategory";

const WeddingPage = () => {
    return (
        <FetchCategoryImages category="Wedding" excludeCategory="Blog"/>
    )
}

export default WeddingPage;