import {BlogPageProps} from "@/constants";
import BlogPageWrapper from "@/components/BlogPageWrapper";

export default  function BlogPage({params}: BlogPageProps) {
    if (!params.id) return null;

    return (
        <BlogPageWrapper id={params.id} title={params.title} />
    )
}
