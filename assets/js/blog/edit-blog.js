document.addEventListener("DOMContentLoaded", function() {
    function getBlogIdFromHash() {
        const url = location.hash;
        return url.slice(1); 
    }

    function populateFormWithBlogData(blogId) {
        const blogPostsData = localStorage.getItem("blogPosts");
        const blogPosts = JSON.parse(blogPostsData) || [];

        const blog = blogPosts.find(post => post.id === blogId);
        if (blog) {
            const titleInput = document.querySelector("input[type='text']");
            const categorySelect = document.querySelector("select");
            const descriptionTextarea = document.getElementById("blog-description");

            titleInput.value = blog.title;
            categorySelect.value = blog.category;
            descriptionTextarea.value = blog.content;
        }
    }

    const blogId = getBlogIdFromHash();
    populateFormWithBlogData(blogId);

    document.getElementById("add-blog-btn").addEventListener("click", function(event) {
        event.preventDefault(); 

        const title = document.querySelector("input[type='text']").value;
        const category = document.querySelector("select").value;
        const content = tinymce.get("blog-description").getContent();

        const blogPostsData = localStorage.getItem("blogPosts");
        const blogPosts = JSON.parse(blogPostsData) || [];
        const updatedBlogPosts = blogPosts.map(post => {
            if (post.id === blogId) {
                // Update only if the form field is not empty
                const updatedPost = {
                    id: post.id,
                    title: title || post.title,
                    category: category || post.category,
                    content: content || post.content,
                    author: post.author,
                    dateCreated: post.dateCreated,
                    blogthumbnail: post.blogthumbnail
                };
                return updatedPost;
            } else {
                return post;
            }
        });
        localStorage.setItem("blogPosts", JSON.stringify(updatedBlogPosts));
        window.location.assign("./dash-view-blog.html");
    });  
});
console.log("Hi")