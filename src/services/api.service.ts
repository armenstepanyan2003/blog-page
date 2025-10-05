import { apiUrls } from "@/config/apiConfig";
import { Blog } from "@/constants";
import { getAccessToken } from "@/utils/actions";
import page from "@/app/login/page";

class ApiService {
    constructor() {
    };

    async deleteBlog(id: string): Promise<Blog[]> {
        const finalUrl = `${apiUrls.MOCK_API}/posts/${id}`;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(finalUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Delete Blog Error: ${error}`);
            throw new Error('Failed to delete blog');
        }
    };

    async editBlog(id: string, blog: Blog): Promise<any> {
        const finalUrl = `${apiUrls.MOCK_API}/posts/${id}`;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(finalUrl, {
                method: "PUT",
                body: JSON.stringify(blog),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Edit Blog Error ${error}`);
            throw new Error('Failed to edit blog');
        }
    };

    async fetchBlogsByTag(tagName: string): Promise<Blog[]> {
        const token = await getAccessToken();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/tag/${tagName}`, {
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch blogs for tag ${tagName}`);
            }

            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    async addComment(id: string, payload: { comment: string }) {
        const finalUrl = `${apiUrls.MOCK_API}/users/${id}/comments`;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(finalUrl, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Add Comment Error ${error}`);
            throw new Error('Failed to add comment');
        }
    };

    async toggleLike(id: string, commentId: string) {
        const finalUrl = `${apiUrls.MOCK_API}/users/${id}/comments/${commentId}/likes`;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(finalUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Add Like Error ${error}`);
            throw new Error('Failed to add like');
        }
    };

    async getLikedPosts(page = 1, limit = 2) {
        const token = await getAccessToken();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/likedPosts?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            });

            const data = await res.json();
            return data;

        } catch (error) {
            console.log(`Getting LikedPosts Error: ${error}`);
            throw new Error('Failed to get like posts');
        }
    };

    async toggleLikePosts(postId: string) {
        const finalUrl = `${apiUrls.MOCK_API}/users/posts/${postId}/likes`;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(finalUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Add Like Error ${error}`);
            throw new Error('Failed to add like');
        }
    };

    async getFollowers() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/followers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            });

            const data = await res.json();
            return data;

        } catch (error) {
            console.log(`Getting LikedPosts Error: ${error}`);
            throw new Error('Failed to get like posts');
        }
    };

    async getFollowing() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/following`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            });

            const data = await res.json();
            return data;

        } catch (error) {
            console.log(`Getting LikedPosts Error: ${error}`);
            throw new Error('Failed to get like posts');
        }
    };

    async getMessages(userId) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            });

            const data = await res.json();
            return data;

        } catch (error) {
            console.log(`Getting Messages Error: ${error}`);
            throw new Error('Failed to get messages');
        }
    };

    async writeMessage({receiverId, content}) {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages`, {
                method: "POST",
                body: JSON.stringify({receiverId, content}),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Failed to send message");
            }

            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    async getAllUsers(page, limit, search) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&limit=${limit}&search=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(`Getting All Users Error: ${error}`);
        }
    }
}


const apiService = new ApiService();

export default apiService;
