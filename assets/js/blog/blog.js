const search = document.querySelector("#search-input");
const logout = document.getElementById("logout");
const signedUser = document.getElementById("signed-user");
const registerBtn = document.getElementById("register-call")
const dashboard = document.getElementById("dashboard-link")

let filter = '';

const authenticatedUser = getAuthenticatedUser();
search.addEventListener('input', (e) => {
    filter = e.target.value;
    renderBlogCard('blogs-card-container', filter); 
});

document.addEventListener("DOMContentLoaded", (e)=>{
    dashboard.style.display = "none";  
    if(authenticatedUser !== null){
        if(authenticatedUser && authenticatedUser.role === "admin"){
            dashboard.style.display = "block";
        }
        signedUser.textContent=`Signed in as: ${authenticatedUser.email}`
        registerBtn.style.display = "none";
        logout.innerHTML='<a ><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
    }else{
       
        // signedUser.textContent = "Register today😊"
        logout.innerHTML = '<a href="../../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
    }
})
function renderBlogCard(containerDiv, filter) {
    const container = document.querySelector(`#${containerDiv}`);
    const blogs = getBlogPost();

    filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(filter.toLowerCase()) || blog.category.includes(filter);
    });

    container.innerHTML = '';

    filteredBlogs.forEach((blog) => {
        let cardElement = createCard(blog);
        cardElement.addEventListener('click', (e)=>{
            window.location.assign(`../../blog-pages/blogdetails.html#${blog.id}`)
        })
        container.append(cardElement);
    });
}
logout.addEventListener('click', (e)=>{
    endSession();
    signedUser.textContent ="";
    logout.innerHTML = '<a href="../../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
});
renderBlogCard('blogs-card-container', filter);




