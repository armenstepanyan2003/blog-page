'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from "@/components/ui/Button";
import { Blog } from "@/constants";
import apiService from "@/services/api.service";

const BlogCard: React.FC<Blog> =({id, user, userId, title, description, tags, isFollowing: initialFollowing, post_likes_count: initialLikes, isLiked: initialIsLiked, updateFollowings }) => {
    const [isFollowing, setFollowing] = useState(initialFollowing);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isLiked, setLiked] = useState(initialIsLiked);

    useEffect(() => {
        setFollowing(initialFollowing);
    }, [initialFollowing]);

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const isSelf = currentUser?.id === userId;

    const handleToggleLike = async (postId: string) => {
        const data = await apiService.toggleLikePosts(postId);
        setLikesCount(data.likes_count);
        setLiked(data.action === 'like');
    }

    const handleToggleFollow = async () => {
        if (isSelf) return;
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/users/followers/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!res.ok) {
                return;
            }

            const data = await res.json();

            const following = data.action === "follow";
            setFollowing(following);
            updateFollowings(userId, following);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-transform transform
                hover:-translate-y-1 hover:scale-105 duration-300 flex flex-col gap-3 border border-gray-100">
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
            <Link href={`/posts/${id}/${encodeURIComponent(title)}`}>
                <h3 className="text-xl font-bold text-sky-700 line-clamp-2">{title}</h3>
            </Link>
            <Link
                href={`/posts/author/${userId}`}
                className="text-gray-500 text-sm italic transition-colors duration-200
                 hover:text-sky-600 hover:underline"
            >
                <p className="text-gray-400 text-sm italic">By {user.firstName}</p>
            </Link>
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
            <button
                onClick={handleToggleFollow}
                disabled={isSelf}
                className={`
                     px-4 py-2 rounded-lg font-semibold transition-colors duration-200
                     ${isSelf ? "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"
                     : "border border-blue-500 bg-blue-500 text-white rounded-md"
                }`}
            >
                {isSelf ? "Follow" : (isFollowing ? `Following!` : `Follow`)}
            </button>
        </div>
    );
};

export default BlogCard;
