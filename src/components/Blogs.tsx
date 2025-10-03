"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import Loading from "./ui/Loading";
import AddModal from "@/components/AddModal";
import Button from "@/components/ui/Button";
import EmptyData from "@/components/ui/EmptyData";
import type { Blog } from "@/constants";
import { toast } from "react-toastify";

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);

    const fetchBlogs = async (page = 1, search = "", limit = 2) => {
        try {
            setLoading(true);
            let url = `/api/posts?page=${page}&search=${encodeURIComponent(search)}`;
            if (limit) {
                url += `&limit=${limit}`
            }

            const res = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });

            const data = await res.json();

            if (data?.error) {
                console.log("Caught an error", data);
                toast(data.error, {
                    type: "error",
                    timeout: 3000,
                });
                return;
            }

            const totalPages = Math.ceil(data.totalCount / 2);

            setBlogs(data.items);
            setTotalPages(totalPages);
        } catch (error) {
            console.log("Fetch error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(page, search);
    }, [page, search]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleAddBlog = async (values: Blog) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values),
            });

           if (!res.ok) {
               const response = await res.json();
               return {
                   error: response
               };
           }

            setIsAddModalVisible(false);
            fetchBlogs(page, search);
        } catch (error) {
            console.log(error);
        }
    };

    const openAddModal = () => setIsAddModalVisible(true);
    const closeAddModal = () => setIsAddModalVisible(false);

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center">
                Latest Posts
            </h1>

            <div className="flex flex-col gap-4 items-center w-full max-w-3xl mb-8">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full sm:flex-1 px-4 py-2 rounded-xl border border-gray-300 shadow-sm text-gray-800
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                />
                <Button title="Add Blog" btnType="primary" onClick={openAddModal} />
            </div>

            {loading ? (
                <Loading text="Loading blogs..." size="medium" />
            ) : blogs?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} {...blog} isLiked={blog.isLiked} />
                    ))}
                </div>
            ) : (
                <EmptyData text="No blogs found." />
            )}

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <AddModal
                visible={isAddModalVisible}
                title="Add New Blog"
                onCancel={closeAddModal}
                onAdd={handleAddBlog}
            />
        </div>
    );
};

export default Blogs;
