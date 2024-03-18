import UserServive from "../service/userServices.js"
export default class BlogService {
    static async getAllBlogs() {
        try {
            const response = await fetch("http://localhost:4000/api/blogs/")
            return response;
        }
        catch (error) {
            console.error(`Error : ${error}`);
            throw error;
        }
    }

    static async getAllBlogById(blogId) {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${blogId}`)
            return response;
        }
        catch (error) {
            console.error(`Error : ${error}`);
            throw error;
        }
    }

    static async createBlog(data) {
        const token = UserServive.getUserToken();
        try {
            const response = await fetch("http://localhost:4000/api/blogs/", {
                method: "POST",
                headers: {
                    "x-auth-token": token
                },
                body: data
            });

            return response;
        }
        catch (error) {
            console.error(`Error in creating blog: ${error}`);
            throw error;
        }
    }

    static async updateBlog(id, data) {
        const token = UserServive.getUserToken();
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "x-auth-token": token
                },
                body: data
            });

            return response;
        }
        catch (error) {
            console.error(`Error while updating: ${error}`);
            throw error;
        }
    }

    static async updateBlogLikes(blogId, userId) {
        const token = UserServive.getUserToken();
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "x-auth-token": token
                },
                body: Likes
            });

            return response;
        }
        catch (error) {
            console.error(`Error while updating: ${error}`);
            throw error;
        }
    }

    static async deleteBlog(id) {
        const token = UserServive.getUserToken();
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                method: "DELETE",
                headers: {
                    "x-auth-token": token
                }
            });
            return response;
        }
        catch (error) {
            console.error(`Error while updating: ${error}`);
            throw error;
        }
    }

}