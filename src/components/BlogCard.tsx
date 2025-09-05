'use client';

import React from 'react';
import Link from 'next/link';

const BlogCard = ({ id, author, title, description }) => {
    return (
        <Link href={`/blogs/${id}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 flex flex-col gap-3 border border-gray-100">
                <h3 className="text-xl font-bold text-sky-700 line-clamp-2">{title}</h3>
                <p className="text-gray-400 text-sm italic">By {author}</p>
                <p className="text-gray-700 text-base line-clamp-3">{description}</p>
            </div>
        </Link>
    );
};

export default BlogCard;