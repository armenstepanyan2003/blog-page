import {apiUrls} from "@/config/apiConfig";

class ApiService {
    constructor() {
    };

    async getNews(): Promise<any[]> {
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

    async getBlogById(id): Promise<any[]> {
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

    async deleteBlog(id): Promise<any[]> {
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

    async editBlog(id,blog): Promise<any[]> {
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

    async addBlog(blog): Promise<any[]> {
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

