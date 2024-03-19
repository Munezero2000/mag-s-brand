import BlogService from "../service/blogServices.js";
import UserServive from "../service/userServices.js";

const title = document.querySelector("#blog-title");
const category = document.querySelector("#category");
const content = document.querySelector("#blog-description");
const addBlogBtn = document.querySelector("#add-blog-btn");
const imageUploadInput = document.querySelector("#imageInput");

// Validation
title.addEventListener("input", (e) => {
  if (!BlogService.validateTitle(e.target.value)) {
    title.style.border = "2px solid darkred";
  } else {
    title.style.border = "2px solid #742ad3";
  }
});

content.addEventListener("input", (e) => {
  if (!BlogService.validateContent(tinymce.get("blog-description").getContent())) {
    content.style.border = "2px solid darkred";
  } else {
    content.style.border = "2px solid #742ad3";
  }
});

addBlogBtn.addEventListener("click", async (e) => {
  const author = UserServive.getAuthenticatedUser();
  e.preventDefault();
  console.log(tinymce.get("blog-description").getContent());
  if (
    BlogService.validateTitle(title.value) &&
    BlogService.validateContent(tinymce.get("blog-description").getContent())
  ) {
    const formData = new FormData();
    formData.append("title",title.value);
    formData.append("category", category.value);
    formData.append("content", tinymce.get("blog-description").getContent());
    formData.append("author", author._id);
    formData.append("thumbnail", imageUploadInput.files[0])

    const response = await BlogService.createBlog(formData);
    const data = await response.json();
    console.log(data);
    window.location.assign("../../blog-pages/dash-view-blog.html");
  }
});
