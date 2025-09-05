'use client'

import {use, useMemo, useState} from "react";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import AddModal from "@/components/AddModal";
import Button from "@/components/ui/Button";
import apiService from "@/services/api.service";
import blog from "@/components/Blog";
import {useRouter} from "next/navigation";

const itemsPerPage = 3;

const Blogs = ({ dataPromise }: { dataPromise: Promise<any[]>}) => {
    const data = use(dataPromise);
    const [blogs, setBlogs] = useState(data);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState("");
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const router = useRouter();

    const lastItem = useMemo(() => {
        return currentPage * itemsPerPage;
    }, [currentPage]);
    const firstItem = useMemo(() => {
        return lastItem - itemsPerPage
    }, [lastItem]);
    const totalPages = useMemo(() => {
        return Math.ceil(blogs.length / itemsPerPage);
    }, [blogs.length]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    const searchingBlogs = blogs.filter(blog => {
        return blog.title.toLowerCase().includes(search.toLowerCase());
    });

    const currentBlog = useMemo(() => {
        return searchingBlogs.slice(firstItem, lastItem);
    }, [searchingBlogs,firstItem, lastItem]);

    const openAddModal = () => {
        setIsAddModalVisible(true);
    }

    const closeAddModal = () => {
        setIsAddModalVisible(false);
    }

    const handleAddBlog = async (values) => {
        const blog = await apiService.addBlog(values);
        setIsAddModalVisible(false);

        setBlogs(prevState => [blog, ...prevState]);
    }

    return (
        <div className="min-h-screen flex flex-col gap-5 items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50 to-sky-100">
            <h1 className="text-4xl font-extrabold text-sky-900 mb-12 text-center">Latest News</h1>
            <div className="flex flex-col gap-5">
                <input
                    type="search"
                    onChange={handleSearchChange}
                    value={search ?? ""}
                    placeholder="Search..."
                    className="w-full max-w-md px-4 py-2 rounded-2xl border border-gray-300 shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition duration-300 placeholder-gray-400"
                />
                <Button title="Add Blog" onClick={openAddModal}/>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlog.map((item) => (
                    <BlogCard
                        key={item.id}
                        id={item.id}
                        author={item.author}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            <AddModal visible={isAddModalVisible} title="Add Blog" onCancel={closeAddModal} onAdd={handleAddBlog}/>
        </div>
    );
};

export default Blogs;