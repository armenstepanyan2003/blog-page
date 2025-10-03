import React from 'react';
import BackButton from "@/components/BackButton";
import { AuthorResponse } from "@/constants";

const Page = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/authors/${params.id}`, {
        cache: "no-store"
    });
    const data: AuthorResponse = await res.json();

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-gray-100 mb-8">
                <h1 className="text-3xl font-bold text-sky-700 text-center">
                    {data.author.name} {data.author.lastname}
                </h1>
                <p className="text-gray-600 text-center">
                    <span className="font-semibold">Email:</span> {data.author.email}
                </p>
                <p className="text-gray-600 text-center">
                    <span className="font-semibold">Phone Number:</span> {data.author.phone || "N/A"}
                </p>
                <div className="flex justify-center mt-4">
                    <BackButton />
                </div>
            </div>

            <div className="w-full max-w-5xl grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.posts.length === 0 ? (
                    <p className="col-span-full text-gray-500 text-center">This author has no posts yet.</p>
                ) : (
                    data.posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl
                                transition-shadow duration-300 flex flex-col gap-3 border border-gray-100"
                        >
                            <h3 className="text-xl font-bold text-sky-700 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Page;
