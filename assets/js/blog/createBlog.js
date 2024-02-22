const title = document.querySelector("#blog-title");
const category = document.querySelector("#category");
const content = document.querySelector("#blog-description");
const addBlogBtn = document.querySelector("#add-blog-btn");
const imageUploadInput = document.querySelector("#imageInput");
checkAdminPrivilage();
// Validatin
title.addEventListener("input", (e) => {
  if (!validateTitle(e.target.value)) {
    title.style.border = "2px solid darkred";
  } else {
    title.style.border = "2px solid #742ad3";
  }
});
content.addEventListener("input", (e) => {
  if (!validateContent(tinymce.get("blog-description").getContent())) {
    content.style.border = "2px solid darkred";
  } else {
    content.style.border = "2px solid #742ad3";
  }
});

addBlogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const imageName = imageUploadInput.files[0] ? imageUploadInput.files[0].name : null;
  if (!imageName) {
    console.error("No image uploaded");
    return;
  }
  console.log(tinymce.get("blog-description").getContent());
  if (
    validateTitle(title.value) &&
    validateContent(tinymce.get("blog-description").getContent())
  ) {
    addBlogPost(
      title.value,
      category.value,
      tinymce.get("blog-description").getContent(),
      imageName
    );
    console.log("added");
    window.location.assign("../../blog-pages/dash-view-blog.html");
  }
});
