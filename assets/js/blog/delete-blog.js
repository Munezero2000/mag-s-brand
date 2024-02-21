document.addEventListener("DOMContentLoaded", function() {
    const url = location.hash;
    const blogId = url.slice(1);

    const blogPostsData = localStorage.getItem("blogPosts");
    const blogPosts = JSON.parse(blogPostsData);
    const blogSection = document.querySelector("#blog-section");
    const deleteContainer = document.querySelector("#delete-container");

  
    function deleteBlogPost() {
        const index = blogPosts.findIndex(post => post.id === blogId);
        if (index !== -1) {
            blogPosts.splice(index, 1);
            localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
        }
    }

    document.getElementById("blog-delete-btn").addEventListener("click", function() {
        deleteBlogPost();
        window.location.assign('./dash-view-blog.html')
    });

    document.getElementById("cancel-delete-btn").addEventListener("click", function() {
        window.location.href = `blog-detail.html#${blogId}`;
    });
});
