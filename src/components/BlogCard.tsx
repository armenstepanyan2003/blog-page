'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Blog } from "@/constants";
import apiService from "@/services/api.service";

const BlogCard: React.FC<Blog> =({ id, slug, user, title, description, tags, post_likes_count: initialLikes, isLiked: initialIsLiked }) => {

    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isLiked, setLiked] = useState(initialIsLiked);

    const handleToggleLike = async (postId: string) => {
        const data = await apiService.toggleLikePosts(postId);
        setLikesCount(data.likes_count);
        setLiked(data.action === 'like');
    }

    return (
        <div className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-gray-100">
            <div className="absolute top-3 right-3 flex items-center gap-1">
                <button onClick={() => handleToggleLike(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={`h-5 w-5 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                         viewBox="0 0 20 20" fill="currentColor"
                    >
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0
                            115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        />
                    </svg>
                </button>
                <span>{likesCount}</span>
            </div>
            <Link href={`/posts/${slug}`}>
                <h3 className="text-xl font-bold text-sky-700 line-clamp-2">{title}</h3>
            </Link>
            <p className="text-gray-400 text-sm italic">By {user.firstName}</p>
            <p className="text-gray-700 text-base line-clamp-3">{description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                    <span
                        key={tag.id}
                        style={{ backgroundColor: tag.color }}
                        className="text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BlogCard;
