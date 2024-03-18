import BlogService from "../service/blogServices.js";
import UserServive from "../service/userServices.js";

const authenticated = UserServive.getAuthenticatedUser();
const id = location.hash.slice(1);

document.addEventListener("DOMContentLoaded", async ()=> {
    if(!authenticated || authenticated.role !=="admin"){
        window.location.assign("../../blog-pages/blog.html");
        return;
    }else{

        const response = await BlogService.getAllBlogById(id);
        const blog = await response.json();

    function populateFormWithBlogData(blog) {
        if (blog) {
            const titleInput = document.querySelector("#blog-title");
            const categorySelect = document.querySelector("#category");
            const descriptionTextarea = document.getElementById("blog-description");

            titleInput.value = blog.title;
            categorySelect.value = blog.category;
            console.log(blog.category);
            descriptionTextarea.value = blog.content;
        }
    }

    populateFormWithBlogData(blog);

    document.getElementById("add-blog-btn").addEventListener("click", async(event)=> {
        event.preventDefault(); 

        const title = document.querySelector("#blog-title");
        const category = document.querySelector("#category");
        const content = document.querySelector("#blog-description");
        const imageUploadInput = document.querySelector("#imageInput");
        const author = UserServive.getAuthenticatedUser();

        const formData = new FormData();
        formData.append("title",title.value);
        formData.append("category", category.value);
        formData.append("content", tinymce.get("blog-description").getContent());
        formData.append("author", author._id);
        formData.append("thumbnail", imageUploadInput.files[0])

        const response = await BlogService.updateBlog(id,formData);
        const data = await response.json();
        console.log(data);

        window.location.assign("./dash-view-blog.html");
    });  }
});
console.log("Hi")