import React from 'react';
import apiService from "@/services/api.service";
import BackButton from "@/components/BackButton";
import Blog from "@/components/Blog";
import {BlogPageProps} from "@/constants";


export default async function BlogPage({params}: BlogPageProps) {
    const blog = await apiService.getBlogById(params.id)

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center py-12 px-6 bg-sky-50">
            <BackButton />
            <Blog blog={blog} />
        </div>
    )
}