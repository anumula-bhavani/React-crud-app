// Mock data storage (No API calls)
let users = [];

document.addEventListener("DOMContentLoaded", displayUsers);

const userForm = document.getElementById("userForm");
const userTable = document.getElementById("userTable");
const userIdInput = document.getElementById("userId");

// 🚀 Display users from local array
function displayUsers() {
    userTable.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// 🚀 Handle form submission (Create or Update)
userForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = userIdInput.value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();

    if (!name || !email || !age) {
        alert("All fields are required!");
        return;
    }

    const userData = { name, email, age };

    if (userId) {
        // Update user
        users[userId] = userData;
    } else {
        // Create new user
        users.push(userData);
    }

    userForm.reset();
    userIdInput.value = "";
    displayUsers();
});

// 🚀 Populate form for editing
function editUser(index) {
    userIdInput.value = index;
    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
    document.getElementById("age").value = users[index].age;
}

// 🚀 Delete user
function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        users.splice(index, 1);
        displayUsers();
    }
}
