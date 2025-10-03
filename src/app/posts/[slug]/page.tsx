import BlogPageWrapper from "@/components/BlogPageWrapper";

interface IBlogPage {
    params: Promise<{ slug: string }>
}

export default async function BlogPage({params}: IBlogPage) {
    const { slug } = await params;

    if (!slug) return null;

    return (
        <BlogPageWrapper slug={slug} />
    )
}
