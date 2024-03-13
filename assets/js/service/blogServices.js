export default class BlogService {
    static async getAllBlogs() {
        try {
            const response = await fetch("http://localhost:4000/api/blogs/")
            return response;
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }

    static async getAllBlogById(blogId) {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${blogId}`)
            return response;
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }

}