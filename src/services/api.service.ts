import {apiUrls} from "@/config/apiConfig";
import {Blog} from "@/constants";

class ApiService {
    constructor() {
    };

    async getNews(): Promise<Blog[]> {
        const finalUrl = `${apiUrls.MOCK_API}/blogs`;

        try {
            const res = await fetch(finalUrl);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`News: ${error}`);
            throw new Error('Failed to fetch Mock api');
        }
    };

    async getBlogById(id: string): Promise<Blog> {
        const finalUrl = `${apiUrls.MOCK_API}/blogs/${id}`;

        try {
            const res = await fetch(finalUrl);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`News: ${error}`);
            throw new Error('Failed to fetch Mock api');
        }
    };

    async deleteBlog(id: string): Promise<Blog[]> {
        const finalUrl = `${apiUrls.MOCK_API}/blogs/${id}`;

        try {
            const res = await fetch(finalUrl, { method: "DELETE" });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Delete Blog Error: ${error}`);
            throw new Error('Failed to delete blog');
        }
    };

    async editBlog(id: string, blog: Blog): Promise<Blog[]> {
        const finalUrl = `${apiUrls.MOCK_API}/blogs/${id}`;

        try {
            const res = await fetch(finalUrl, { method: "PUT" , body: JSON.stringify(blog), headers: {"Content-Type": "application/json"} });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Edit Blog Error ${error}`);
            throw new Error('Failed to edit blog');
        }
    };

    async addBlog(blog: Blog) {
        const finalUrl = `${apiUrls.MOCK_API}/blogs`;

        try {
            const res = await fetch(finalUrl, { method: "POST" , body: JSON.stringify(blog), headers: {"Content-Type": "application/json"}});

            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Add Blog Error: ${error}`);
            throw new Error('Failed to add blog');
        }
    };
}

const apiService = new ApiService();

export default apiService;

