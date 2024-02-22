document.addEventListener("DOMContentLoaded", function() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const tableBody = document.getElementById("user-table-body");
    
    users.forEach(function(user, index) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = index + 1;
        
        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;
        
        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        
        const actionsCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
  
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
});