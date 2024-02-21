const url = location.hash
const blogId = url.slice(1);
console.log(blogId)
document.addEventListener("DOMContentLoaded", function() {
    const blogPostsData = localStorage.getItem("blogPosts");
    const blogPosts = JSON.parse(blogPostsData);
    const blogSection = document.querySelector("#blog-section");
    location

    if (blogPosts && blogPosts.length > 0) {
        const foundPost = blogPosts.find(post => post.id === blogId);
        console.log(foundPost)
        if (foundPost) {
            const image = blogSection.querySelector("img");
            const title = blogSection.querySelector("#blog-title");
            const author = blogSection.querySelector("#blog-author");
            const date = blogSection.querySelector("#blog-date");
            const content = blogSection.querySelector("#blog-content-details");

            image.src = `../assets/images/${foundPost.blogthumbnail}`;
            title.textContent = foundPost.title;
            author.textContent = `Written by ${foundPost.author}`;
            const dateCreated = foundPost.dateCreated; 
            const parsedDate = new Date(dateCreated);
            const formattedDate = parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            date.textContent = formattedDate;
            content.innerHTML = foundPost.content;
        } else {
            blogSection.innerHTML = "<p>Blog post not found</p>";
        }
    } else {
        blogSection.innerHTML = "<p>No blog posts available</p>";
    }
});
