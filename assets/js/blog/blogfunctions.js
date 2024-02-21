//validation
function validateTitle(titleValue) {
  return titleValue.trim() !== "" && titleValue.length >= 20;
}

function validateContent(contentValue) {
  return contentValue.trim() !== "" && contentValue.length >= 100;
}

function addBlogPost(title, category, content, imageName) {
  // Blog Post Object
  const blogPost = {
    id: uuidv4(),
    title: title,
    category: category,
    content: content,
    author: "me",
    dateCreated: new Date().toISOString(),
    blogthumbnail: imageName
  };

  let feedback = saveBlogPostToLocalStorage(blogPost);
  return feedback;
}

function saveBlogPostToLocalStorage(blogPost) {
  const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  blogPosts.push(blogPost);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  return "Blog post added successfully.";
}
