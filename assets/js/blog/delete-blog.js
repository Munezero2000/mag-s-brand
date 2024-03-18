import UserServive from "../service/userServices.js";
import BlogService from "../service/blogServices.js";
let blogId;
document.addEventListener("DOMContentLoaded", async ()=> {
    const authenticated = UserServive.getAuthenticatedUser();
    if (!authenticated || authenticated.role !== "admin") {
        window.location.assign("../../blog-pages/blog.html");
        return;
    }
     blogId = location.hash.slice(1);
    const res = await BlogService.getAllBlogById(blogId);
    const blog = await res.json();
    const blogTitle = document.getElementById("blog-title");
    blogTitle.textContent = `Titled: ${blog.title}` || "";

    // Get blog title title
    const response = await BlogService.getAllBlogById(blogId);

   
});


const blogSection = document.querySelector("#blog-section");
const deleteContainer = document.querySelector("#delete-container");


document.getElementById("blog-delete-btn").addEventListener("click", async () => {
    const response = await BlogService.deleteBlog(blogId);
    const data = await response.json();
    console.log(data)
    if (response.ok) {
        window.location.assign('./dash-view-blog.html')
    }

});
document.getElementById("cancel-delete-btn").addEventListener("click", async () => {
        window.location.href = "dash-view-blog.html";
});

