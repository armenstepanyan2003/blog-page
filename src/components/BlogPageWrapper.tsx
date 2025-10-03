"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import BackButton from "@/components/BackButton";

const fetchBlog = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return res.json();
}

const Blog = dynamic(() => import("@/components/Blog"), {
    ssr: false,
    loading: () =>
    <div className="animate-pulse bg-gray-200 w-[400px] h-[200px] rounded-md p-4 space-y-2">
        <div className="animate-pulse bg-gray-400 w-[385px] h-[222px] rounded-md"></div>
        <div className="animate-pulse bg-gray-400 w-[385] h-[500px] rounded-md"></div>
    </div>
});

const BlogPageWrapper: FC<{ id: string }> = ({id}) => {
    const res = fetchBlog(id);

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center py-12 px-6 bg-sky-50">
            <BackButton/>
            <Blog blogPromise={res}/>
        </div>
    );
};

export default BlogPageWrapper;
