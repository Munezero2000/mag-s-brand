import UserServive from "../service/userServices.js";

const search = document.getElementById("search-input");
const allUsers = document.getElementById("all-users");
const admins = document.getElementById("admins");
const reader = document.getElementById("readers");
const select = document.getElementById("select");
const subs= document.getElementById("subscribers");

let filter = "";

const getUserData =async ()=>{
    const response = await UserServive.getAllUsers();
    const data = await response.json();
    if(response.ok){
        return data;
    }
}

document.addEventListener("DOMContentLoaded", async () =>{
    const authenticated = UserServive.getAuthenticatedUser();
    if(!authenticated || authenticated.role !=="admin"){
        window.location.assign("../../blog-pages/blog.html");
        return;}

    const data = await getUserData();
    const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
    allUsers.textContent = data.usersCount;
    admins.textContent = renderUsersInformation(data.users, 'admin').length;
    reader.textContent = renderUsersInformation(data.users,'reader').length;
    subs.textContent = subscribers.length;
    renderUsersInformation(data.users,filter);
});

search.addEventListener("input", async (e) => {
    filter = e.target.value;
    const data = await getUserData();
    renderUsersInformation(data.users, filter);
});

select.addEventListener("change", async (e)=>{
    filter = e.target.value;
    const data = await getUserData();
    renderUsersInformation(data.users,filter);
})

function renderUsersInformation(users, filter) {
    const tableBody = document.querySelector("#user-table tbody");
    tableBody.innerHTML = "";
    const filteredUsers = users.filter((user) => {
        return (
            user.username.toLowerCase().includes(filter.toLowerCase()) ||
            user.role.toLowerCase().includes(filter.toLowerCase())
        );
    });

   
    filteredUsers.forEach(function (user, index) {
        const row = document.createElement("tr");
        row.classList.add("user-information");
        if (index > 0) {
            row.style.borderRadius = "10px";
        }

        const idCell = document.createElement("td");
        idCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.innerHTML = highlightSearchTerm(user.username, filter);

        const emailCell = document.createElement("td");
        emailCell.innerHTML = highlightSearchTerm(user.email, filter);

        const roleCell = document.createElement("td");
        roleCell.innerHTML = highlightSearchTerm(user.role.toUpperCase(), filter);

        const actionsCell = document.createElement("td");
        actionsCell.classList.add("action");

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-pen-to-square"></i>';

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', function() {
            deleteUserFromLocalStorage(user.id)
            window.location.reload();
        });
        
        
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(roleCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
    return filteredUsers;
}

function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
}
