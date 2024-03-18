import UserServive from "./userServices.js";

export default class CommentService {
    static async createComment(comment) {
        try {
            const token = UserServive.getUserToken();
            const response = await fetch("http://localhost:4000/api/comments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
                body: JSON.stringify(comment)
            });

            return response;
        }
        catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }

    static async getBlogComments(blogId) {
        try {
            const response = await fetch(`http://localhost:4000/api/comments/${blogId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response;
        }
        catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }
}