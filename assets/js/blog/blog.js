import UserServive from "../service/userServices.js";
import BlogService from "../service/blogServices.js";

const search = document.querySelector("#search-input");
const logout = document.getElementById("logout");
const signedUser = document.getElementById("signed-user");
const registerBtn = document.getElementById("register-call")
const dashboard = document.getElementById("dashboard-link")
const filterCenter = document.getElementById("filter")
const accountLink = document.getElementById("account-link");

//check if user is authenticated
const authenticatedUser = UserServive.getAuthenticatedUser();

// search blog and render the blogs
let filter = '';
search.addEventListener('input', (e) => {
    filter = e.target.value;
   showBlogs()
});
filterCenter.addEventListener('change', (e) => {
    filter = e.target.value;
   showBlogs()
});


// Event listner for initializing page content when it is loaded
document.addEventListener("DOMContentLoaded", (e)=>{
    showBlogs();
    dashboard.style.display = "none";  
    if(authenticatedUser !== null){
        if(authenticatedUser && authenticatedUser.role === "admin"){
            dashboard.style.display = "block";
            accountLink.style.display ="none";
        }
        signedUser.textContent=`Signed in as: ${authenticatedUser.email}`
        registerBtn.style.display = "none";
        logout.innerHTML='<a ><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
    }else{
        accountLink.style.display ="none";
        // signedUser.textContent = "Register today😊"
        logout.innerHTML = '<a href="../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
    }
})

// a function that render blogs to the page
function renderBlogs(containerDiv, blogs, filter) {
    const container = document.querySelector(`#${containerDiv}`);

    let filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(filter.toLowerCase()) || blog.category.includes(filter) && blog.status.includes("published");
    });

    container.innerHTML = '';

    filteredBlogs.forEach((blog) => {
        let cardElement = createCard(blog);
        cardElement.addEventListener('click', (e)=>{
            window.location.assign(`./../blog-pages/blogdetails.html#${blog._id}`)
        })
        container.append(cardElement);
    });
}
logout.addEventListener('click', (e)=>{
    UserServive.logout();
    location.reload();
    signedUser.textContent ="";
    logout.innerHTML = '<a href="../login.html"><i class="fa-solid fa-right-from-bracket"></i> Login</a>';
});
function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('blog-card', 'flex', 'flex-col');
    
    const image = document.createElement('img');
    image.src = data.thumbnail;
    image.alt = data.title;
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('text-white');
    
    const datePara = document.createElement('p');
    const dateCreated = data.createdAt; 
    const parsedDate = new Date(dateCreated);
    const formattedDate = parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    datePara.textContent = formattedDate;
    
    const titlePara = document.createElement('p');
    titlePara.textContent = data.title;
    
    const descriptionPara = document.createElement('p');
    let message = "🌟Read more now!....🚀";
    descriptionPara.innerHTML= message;
   
  
    contentDiv.appendChild(datePara);
    contentDiv.appendChild(titlePara);
    contentDiv.appendChild(descriptionPara);
  
    card.appendChild(image);
    card.appendChild(contentDiv);
    
    return card;
  }

async function showBlogs (){
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    const response = await BlogService.getAllBlogs();
    loader.style.display = 'none';
    const data = await response.json();
    const blogs=data.blogs;
    renderBlogs('blogs-card-container',blogs, filter)
}

