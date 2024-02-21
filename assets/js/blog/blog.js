const search = document.querySelector("#search-input");
let filter = '';

search.addEventListener('input', (e) => {
    filter = e.target.value;
    renderBlogCard('blogs-card-container', filter); 
});

function renderBlogCard(containerDiv, filter) {
    const container = document.querySelector(`#${containerDiv}`);
    const blogs = getBlogPost();

    filteredBlogs = blogs.filter((blog) => {
        return blog.title.includes(filter) || blog.category.includes(filter);
    });

    console.log(blogs);

    container.innerHTML = '';

    filteredBlogs.forEach((blog) => {
        let cardElement = createCard(blog);
        cardElement.addEventListener('click', (e)=>{
            window.location.assign(`../../blog-pages/blogdetails.html#${blog.id}`)
        })
        container.append(cardElement);
    });
}

renderBlogCard('blogs-card-container', filter);




