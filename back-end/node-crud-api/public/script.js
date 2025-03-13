async function fetchUsers() {
    try {
        const response = await fetch("/api/users"); // Fetch users from backend API
        const users = await response.json();
        
        const usersTable = document.getElementById("usersTable");
        usersTable.innerHTML = ""; // Clear previous content
        
        users.forEach(user => {
            const row = `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
            </tr>`;
            usersTable.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}
