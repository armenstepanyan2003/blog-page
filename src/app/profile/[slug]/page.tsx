'use client';

import React, { useEffect, useState } from 'react';
import { AuthorResponse } from "@/constants";
import EditModalProfile from "@/components/EditModalProfile";
import apiService from "@/services/api.service";
import {useRouter} from "next/navigation";
import {useUserProvider} from "@/providers/UserProvider";

const Page = ({ params }: { params: { slug: string } }) => {
    const resolvedParams = React.use(params);
    const { slug } = resolvedParams;
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [data, setData] = useState<AuthorResponse | null>(null);
    const { setUser } = useUserProvider();

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/authors/${slug}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    console.error("Author not found", res.status);
                    setData(null);
                    return;
                }

                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Fetch error:", err);
                setData(null);
            }
        };

        fetchData();
    }, [slug]);


    const openEditModal = () => setIsEditModalVisible(true);
    const closeEditModal = () => setIsEditModalVisible(false);

    if (!data) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    const handleOkEdit = async (values) => {
        if (!data.id) return
        const updated = await apiService.editProfile(data.id, values);
        if (updated.error) {
            return {
                error: updated.error
            };
        }
        setData(prev => prev ? { ...prev,  ...updated } : updated);

        const currentUser = JSON.parse(localStorage.getItem("user"));
        const newUser = { ...currentUser, ...updated };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);

        if (updated.slug !== slug) {
            router.push(`/profile/${updated.slug}`);
        }

        setIsEditModalVisible(false);

    }

    return (
        <div className="bg-gray-100 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-gray-100 mb-8">
                <h1 className="text-3xl font-bold text-sky-700 text-center">
                    {data.firstName} {data.lastName}
                </h1>
                <p className="text-gray-600 text-center">
                    <span className="font-semibold">Email:</span> {data.email}
                </p>
                <p className="text-gray-600 text-center">
                    <span className="font-semibold">Phone Number:</span> {data.phone || "N/A"}
                </p>
                <button
                    onClick={openEditModal}
                    className="self-center border rounded-md py-2 px-8  transition duration-300 bg-white text-black hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                >
                    Edit
                </button>

            </div>

            <div className="w-full max-w-5xl grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.posts.length === 0 ? (
                    <p className="col-span-full text-gray-500 text-center">This author has no posts yet.</p>
                ) : (
                    data.posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-6 shadow-lg rounded-2xl flex flex-col gap-3 border border-gray-100"
                        >
                            <h3 className="text-xl font-bold text-sky-700 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
                        </div>
                    ))
                )}
            </div>
            <EditModalProfile
                visible={isEditModalVisible}
                onEdit={handleOkEdit}
                onCancel={closeEditModal}
                title="Edit Blog"
                data={data}
            />
        </div>
    );
};

export default Page;
