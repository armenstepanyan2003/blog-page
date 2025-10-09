import React from "react";
import BackButton from "@/components/BackButton";
import apiService from "@/services/api.service";

interface Props {
    params: { tagName: string };
}

export default async function TagPage({params}: Props) {
    const {tagName} = await params;
    const blogs = await apiService.fetchBlogsByTag(tagName);
    const currentTag = blogs.flatMap(blog => blog.tags).find(tag => tag.name === tagName);

    return (
        <div className="flex flex-col gap-6 items-center py-12 px-6 bg-gray-100">
            {currentTag && (
                <span
                    className="px-4 py-1 rounded-full text-white text-sm font-semibold shadow-md"
                    style={{ backgroundColor: currentTag.color }}
                >
                     #{currentTag.name}
                </span>
            )}

            <BackButton />

            {blogs.length === 0 ? (
                <p>No blogs found for this tag.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-gray-100"
                        >
                            <h3 className="text-xl font-bold text-sky-700 line-clamp-2">
                                {blog.title}
                            </h3>
                            <p className="text-gray-400 text-sm italic">By {blog.user.firstName}</p>
                            <p className="text-gray-700 text-base line-clamp-3">{blog.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
