import UserServive from "../service/userServices.js"
export default class BlogService {
    static async getAllBlogs() {
        try {
            const response = await fetch("https://mag-s-brand-backend.onrender.com/api/blogs/")
            return response;
        }
        catch (error) {
            console.error(`Error : ${error}`);
            throw error;
        }
    }

    static async getAllBlogById(blogId) {
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/blogs/${blogId}`)
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
            const response = await fetch("https://mag-s-brand-backend.onrender.com/api/blogs/", {
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
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/blogs/${id}`, {
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

    static async updateBlogLikes(id, likes) {
        const token = UserServive.getUserToken();
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/blogs/${id}/likes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
                body: JSON.stringify({ likes }) // Sending likes array as JSON
            });

            return response;
        }
        catch (error) {
            console.error(`Error while updating blog likes: ${error}`);
            throw error;
        }
    }


    static async deleteBlog(id) {
        const token = UserServive.getUserToken();
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/blogs/${id}`, {
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

    static async addSubscriber(email) {
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/subscribers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            return response;
        }
        catch (error) {
            console.error(`Error while adding subscriber: ${error}`);
            throw error;
        }
    }

    static async getAllSubscribers() {
        const token = UserServive.getUserToken();
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/subscribers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                }
            });
            return response;
        }
        catch (error) {
            console.error(`Error while getting subscribers: ${error}`);
            throw error;
        }
    }



    static validateTitle(titleValue) {
        return titleValue.trim() !== "" && titleValue.length >= 20;
    }

    static validateContent(contentValue) {
        return contentValue.trim() !== "" && contentValue.length >= 100;
    }

}