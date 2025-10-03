"use client";

import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

export default function FollowingPage() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("No token found, please login.");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/posts/followersPosts", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    alert("Failed to load posts");
                    return;
                }

                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Error loading posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-sky-700 mb-6">Followers Posts</h1>

            <div className="w-full max-w-3xl mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white p-6 shadow-lg rounded-2xl space-y-2"
                    >
                        <h3 className="text-xl font-bold text-sky-700 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-400 text-sm italic">
                            By <span className="font-medium">{post.user.firstName} {post.user.lastName}</span>
                        </p>
                        <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
                    </div>
                ))}
                {posts.length === 0 && (
                    <p className="text-gray-500 text-center col-span-full mt-10">No posts from your followers yet.</p>
                )}
            </div>
        </div>
    );
}
