import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

const SideBar = () => {
    const path = usePathname();

    const links = [
        { href: "/posts", label: "Posts" },
        { href: "/users", label: "Users" },
        { href: "/posts/followersPosts", label: "Followers Posts" },
        { href: "/posts/likedPosts", label: "Liked Posts" },
        { href: "/users/followers", label: "Followers" },
        { href: "/users/following", label: "Following" },
        { href: "/users/myChats", label: "My Chats" },
        { href: "/subscriptions", label: "Subscriptions" },
        { href: "/products", label: "Products" },
        { href: "/orders", label: "Orders" },
    ];

    return (
        <div className="bg-white w-64 h-full min-h-screen border-r border-gray-400 p-4">
            <div className="flex flex-col gap-2">
                {links.map(link => {
                    const isActive = path === link.href;
                    const classes = isActive
                        ? "w-full text-left py-2 px-4 rounded-md bg-gray-200 text-black font-semibold"
                        : "w-full text-left py-2 px-4 rounded-md transition duration-200 hover:bg-gray-100 hover:text-black";
                    return (
                        <Link key={link.href} href={link.href} className={classes}>
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SideBar;