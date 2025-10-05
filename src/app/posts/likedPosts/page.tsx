'use client';

import React, { useEffect, useState } from 'react';
import BackButton from "@/components/BackButton";
import apiService from "@/services/api.service";
import Pagination from "@/components/Pagination";
import Loading from "@/components/ui/Loading";
import EmptyData from "@/components/ui/EmptyData";

const LikedPostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 2;

    const fetchLikedPosts = async (page = 1) => {
        setLoading(true);
        try {
            const data = await apiService.getLikedPosts(page, limit);
            setPosts(data.items || []);
            setTotalPages(Math.ceil((data.totalCount) / limit));
        } catch (error) {
            console.log(error);
            setPosts([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLikedPosts(page);
    }, [page])

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-sky-100 p-6">
            <h1 className="text-4xl font-extrabold text-sky-700 mb-6">Liked Posts ❤️</h1>
            <BackButton />

            <div className="w-full max-w-3xl mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {loading ? (
                    <Loading text="Loading posts..." size="medium" />
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300 space-y-2"
                        >
                            <h3 className="text-xl font-bold text-sky-700 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-400 text-sm italic">
                                By <span className="font-medium">{post.user.firstName}</span>
                            </p>
                            <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex justify-center items-center h-64">
                        <EmptyData />
                    </div>
                )}
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default LikedPostsPage;
