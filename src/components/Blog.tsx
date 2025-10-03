'use client'

import React, { use, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/EditModal";
import Link from "next/link";
import apiService from "@/services/api.service";
import { Blog } from '@/constants';

const Blog = ({blogPromise}) => {
    const blog = use(blogPromise);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [comments, setComments] = useState(blog.comments || []);
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [currentBlog, setCurrentBlog] = useState(blog);
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

    const openEditModal = () => {
        setIsEditModalVisible(true);
    }

    const closeEditModal = () => {
        setIsEditModalVisible(false);
    }

    const handleOkEdit = async (values: Blog) => {
        if (!blog.id) return
        const updated = await apiService.editBlog(blog.id, values);
        if (updated.error) {
            return {
                error: updated.error
            };
        }
        setIsEditModalVisible(false);
        setCurrentBlog(updated);
    }

    const handleAddComment = async () => {
        const text = commentRef.current?.value || '';
        if (!text.trim()) return;

        const newComment = await apiService.addComment(blog.id, { comment: text  });
        setComments((prev) => [newComment, ...prev]);
        if (commentRef.current) commentRef.current.value = '';
    };

    const currentUser = JSON.parse(localStorage.getItem('user') || "{}");
    const currentUserId = currentUser?.id;

    const handleLike = async (commentId: string) => {
        const data = await apiService.toggleLike(blog.id, commentId);
        setComments(prev =>
            prev.map(c => {
                if (c.id === commentId) {
                    const likeUserIds = c?.likedUserIds || [];
                    return {
                        ...c,
                        likesCount: data.likes_count || 0,
                        likedUserIds: data.action === "deleted" ?
                            likeUserIds?.filter(i => i !== currentUserId) : [...likeUserIds, currentUserId],
                    };
                }
                return c;
            })
        );
    };

    return (
        <div>
            <div className="flex justify-between bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
                <div>
                    <h1 className="text-3xl font-bold text-sky-800 mb-4">{currentBlog.title}</h1>
                    <p className="text-gray-500 italic mb-6">By {currentBlog.user?.firstName}</p>
                    <p className="text-gray-700 leading-relaxed">{currentBlog.description}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {Array.isArray(currentBlog.tags) && currentBlog.tags.map(tag => (
                            <Link key={tag.id} href={`/tags/${tag.name}`}>
                            <span
                                key={tag.id}
                                style={{ backgroundColor: tag.color }}
                                className="text-white text-xs font-semibold px-2 py-1 rounded-full"
                            >
                                {tag.name}
                            </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <button
                        onClick={openEditModal}
                        disabled={currentUserId !== currentBlog.userId}
                        className={`border rounded-md py-2 px-5 transition duration-300 
                             ${currentUserId !== currentBlog.userId
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                            : 'bg-white text-black hover:border-blue-500 hover:text-blue-500 cursor-pointer'}`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={openDeleteModal}
                        disabled={currentUserId !== currentBlog.userId}
                        className={`border rounded-md py-2 px-5 transition duration-300 
                            ${currentUserId !== currentBlog.userId
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                            : 'bg-white text-black hover:border-blue-500 hover:text-blue-500 cursor-pointer'}`}
                    >
                        Delete
                    </button>

                </div>

                <DeleteModal
                    visible={isDeleteModalVisible}
                    onCancel={closeDeleteModal}
                    onOk={handleOkDelete}
                    title="Delete Blog"
                />
                <EditModal
                    visible={isEditModalVisible}
                    onEdit={handleOkEdit}
                    onCancel={closeEditModal}
                    title="Edit Blog"
                    blog={currentBlog}
                />
            </div>
            <div className="mt-8 max-w-2xl w-full mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-sky-700 mb-4">Leave a Comment</h2>
                <textarea
                    ref={commentRef}
                    placeholder="Write your comment here..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none
                        focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none h-28
                        placeholder-gray-400 text-gray-700"
                />
                <Button title="Add Comment" onClick={handleAddComment}/>

                <div className="mt-6 space-y-4">
                    {comments.map((comment) => {
                        return (
                            <div
                                key={comment.id}
                                className="bg-white border border-gray-200
                                    rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-sky-700 font-semibold">{comment.user.firstName}</span>
                                        <p className="text-gray-700 mt-1 leading-relaxed">{comment.text}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleLike(comment.id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 ${(comment?.likedUserIds?.length &&
                                                    comment.likedUserIds.includes(+currentUserId)) ?
                                                    'text-red-500' : 'text-gray-400'}`}
                                                viewBox="0 0 20 20" fill="currentColor"
                                            >
                                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0
                                                    115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                />
                                            </svg>
                                        </button>
                                        <span>{comment.likesCount}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Blog;
