import { apiUrls } from "@/config/apiConfig";
import { Blog } from "@/constants";
import { getAccessToken } from "@/utils/actions";

class ApiService {

    constructor() {
    };

    async deleteBlog(id: string): Promise<Blog[]> {
        const finalUrl = `${apiUrls.MOCK_API}/users/${id}`;
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

    async deleteMessage(messageId: string) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages/${messageId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
           console.log(`Delete Message Error: ${error}`);
        }
    }

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

    async editMessage(id: string, content) {
        const token = localStorage.getItem('token');
        try {
            const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages/${id}`, {
                method: "PUT",
                body: JSON.stringify({ content }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(`Edit Message Error: ${error}`);
        }
    }

    async editProfile(id: string, userData: { firstName: string, lastName: string, email: string, phone: string }) {
        const finalUrl = `${apiUrls.MOCK_API}/users/${id}`;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(finalUrl, {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.error?.details) {
                    return {
                        error: data.error
                    };
                }
            }
            return data;
        } catch (error) {
            console.log(`Edit Profile Error ${error}`);
            throw new Error('Failed to edit Profile');
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

    async writeMessage({ receiver, content, chatId }) {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages`, {
                method: "POST",
                body: JSON.stringify({receiver, content, chatId}),
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

    async createGroupChat(usersIds, groupName ) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/group`, {
                method: "POST",
                body: JSON.stringify({ usersIds, groupName }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                throw new Error("Failed to create group chat");
            }

            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Create GroupChat Error: ${error}`);
        }
    }

    async getMyChats() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/myChats`, {
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
            console.log(`GetMyChats Error: ${error}`);
        }
    }

    async isReadMessages(chatId, userId) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages/is-read/${chatId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userId })
            });

            if (!res.ok) {
                throw new Error(`Failed to mark messages as read: ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.log(`isReadMessages: ${error}`);
        }
    }

    async messageCount() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages/messageCount`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            })

            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`message count Error: ${error}`);
        }
    }

    async getNotificationStatus() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/notifications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            })

            const data = await res.json();
            return data;
        } catch (error) {
            console.log(`getNotificationStatus: ${error}`);
        }
    }

    async updateNotificationStatus(status) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/notifications`, {
                method: "PUT",
                body: JSON.stringify( status ),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProducts() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.log(`getAllProducts Error: ${error}`);
        }
    }

    async getAllSubscriptions() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.log(`getAllProducts Error: ${error}`);
        }
    }

    async createPayment({ amount, productId, quantity, userId,}) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ amount, productId, quantity, userId })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserOrders() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.log(`getAllOrders Error: ${error}`);
        }
    }

    async cancelSubscription(subscriptionId) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ subscriptionId })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.log(`cancelSubscriptionError: ${error}`);
        }
    }


    async refundPayment(paymentId) {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/refund`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ paymentId })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.log(`refundPaymentError: ${error}`);
        }
    }
}

const apiService = new ApiService();

export default apiService;
