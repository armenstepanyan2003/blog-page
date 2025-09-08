'use client'

import React from 'react';
import {useState} from "react";
import Button from "@/components/ui/Button";
import DeleteModal from "@/components/DeleteModal";
import {useRouter} from "next/navigation";
import apiService from "@/services/api.service";
import EditModal from "@/components/EditModal";
import type { BlogProps, Blog } from "@/constants";

const Blog: React.FC<BlogProps> = ({blog}) => {

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const router = useRouter();

    const openDeleteModal = () => {
        setIsDeleteModalVisible(true);
    }

    const closeDeleteModal = () => {
        setIsDeleteModalVisible(false);
    }

    const handleOkDelete = async (): Promise<void> => {
        if (!blog.id) return
        await apiService.deleteBlog(blog.id);
        setIsDeleteModalVisible(false);
        router.push("/");
    }

    const closeEditModal = () => {
        setIsEditModalVisible(false);
    }

    const handleOkEdit = async (values: Blog): Promise<void> => {
        if (!blog.id) return
        await apiService.editBlog(blog.id, values);
        setIsEditModalVisible(false);
        router.refresh();
    }

    const openEditModal = () => {
        setIsEditModalVisible(true);
    }

    return (
        <div className="flex justify-between bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
            <div>
                <h1 className="text-3xl font-bold text-sky-800 mb-4">{blog.title}</h1>
                <p className="text-gray-500 italic mb-6">By {blog.author}</p>
                <p className="text-gray-700 leading-relaxed">{blog.description}</p>
            </div>
            <div className="flex flex-col gap-5">
                <Button title="Edit" onClick={openEditModal}/>
                <Button title="Delete" onClick={openDeleteModal}/>
            </div>

            <DeleteModal visible={isDeleteModalVisible} onCancel={closeDeleteModal} onOk={handleOkDelete} title="Delete Blog"/>
            <EditModal visible={isEditModalVisible} onOk={handleOkEdit} onCancel={closeEditModal} title="Edit Blog" blog={blog} />
        </div>
    );
};

export default Blog;
