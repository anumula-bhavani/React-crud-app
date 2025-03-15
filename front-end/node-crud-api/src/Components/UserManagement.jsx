import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users"; // Adjust if needed

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", age: "", id: null });

    // Fetch users from backend
    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.age) {
            alert("All fields are required!");
            return;
        }

        try {
            if (formData.id) {
                // Update existing user
                await fetch(`${API_URL}/${formData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create new user
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ name: "", email: "", age: "", id: null });
            fetchUsers();
        } catch (error) {
            console.error("Error adding/updating user:", error);
        }
    }

    async function deleteUser(id) {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await fetch(`${API_URL}/${id}`, { method: "DELETE" });
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    }

    function editUser(user) {
        setFormData({ name: user.name, email: user.email, age: user.age, id: user._id });
    }

    return (
        <div>
            <h2>CRUD Operations with React</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                <button type="submit">{formData.id ? "Update User" : "Add User"}</button>
            </form>

            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <button onClick={() => editUser(user)}>Edit</button>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
