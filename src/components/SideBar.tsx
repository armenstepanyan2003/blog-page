'use client'

import React from 'react';
import Link from "next/link";

const SideBar = () => {
    return (
        <div className="bg-sky-300 w-64 h-full min-h-screen text-white p-4">
            <div className="flex flex-col gap-4">
                <Link
                    href="/posts"
                    className="border border-blue-500 bg-blue-500 text-white rounded-md py-2 px-5 hover:cursor-pointer hover:opacity-70 transition duration-300 [aria-current='page']:bg-gray-500 [aria-current='page']:text-white"
                >
                    Posts
                </Link>

                <Link
                    href="/users"
                    className="border border-blue-500 bg-blue-500 text-white rounded-md py-2 px-5 hover:cursor-pointer hover:opacity-70 transition duration-300 [aria-current='page']:bg-gray-500 [aria-current='page']:text-white"
                >
                    Users
                </Link>

                <Link
                    href="/posts/followersPosts"
                    className="border border-blue-500 bg-blue-500 text-white rounded-md py-2 px-5 hover:cursor-pointer hover:opacity-70 transition duration-300 [aria-current='page']:bg-gray-500 [aria-current='page']:text-white"
                >
                    Followers Posts
                </Link>

                <Link
                    href="/posts/likedPosts"
                    className="border border-blue-500 bg-blue-500 text-white rounded-md py-2 px-5 hover:cursor-pointer hover:opacity-70 transition duration-300 [aria-current='page']:bg-gray-500 [aria-current='page']:text-white"
                >
                    Liked Posts
                </Link>

                <Link
                    href="/users/followers"
                    className="border border-blue-500 bg-blue-500 text-white rounded-md py-2 px-5 hover:cursor-pointer hover:opacity-70 transition duration-300 [aria-current='page']:bg-gray-500 [aria-current='page']:text-white"
                >
                    Followers
                </Link>

                <Link
                    href="/users/following"
                    className="border border-blue-500 bg-blue-500 text-white rounded-md py-2 px-5 hover:cursor-pointer hover:opacity-70 transition duration-300 [aria-current='page']:bg-gray-500 [aria-current='page']:text-white"
                >
                    Following
                </Link>
            </div>
        </div>
    );
};

export default SideBar;
