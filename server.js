const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Enable Cross-Origin Resource Sharing so our React frontend can hit this API
app.use(cors());

// Parse incoming JSON payloads
app.use(bodyParser.json());

// In-memory data store for now.
// TODO: Replace this with a real MongoDB connection later when we go to production.
let users = [
    { _id: "1", name: "John Doe", email: "john@example.com", phone: "1234567890", role: "Admin" },
    { _id: "2", name: "Jane Smith", email: "jane@example.com", phone: "0987654321", role: "User" },
    { _id: "3", name: "Alice Johnson", email: "alice@example.com", phone: "5551234567", role: "User" },
    { _id: "4", name: "Bob Brown", email: "bob@example.com", phone: "5559876543", role: "Moderator" },
    { _id: "5", name: "Charlie Davis", email: "charlie@example.com", phone: "5555555555", role: "User" },
    { _id: "6", name: "Diana Evans", email: "diana@example.com", phone: "5551112222", role: "Admin" }
];

// Routes

/*
 * GET /api/users
 * Returns a list of users with pagination support.
 * Query params: page (default 1), limit (default 5)
 */
app.get('/api/users', (req, res) => {
    // Basic pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    // Add next/prev metadata if there are more records
    if (endIndex < users.length) {
        results.next = { page: page + 1, limit: limit };
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1, limit: limit };
    }

    results.users = users.slice(startIndex, endIndex);
    res.json(results);
});

// Simple search implementation
// filters by name, email, or role (case-insensitive)
app.get('/api/users/search', (req, res) => {
    const query = req.query.query.toLowerCase();

    // We can optimize this later if the dataset grows too large
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    res.json(filteredUsers);
});

// Generate a CSV download for admin reports
app.get('/api/users/export', (req, res) => {
    let csv = 'ID,Name,Email,Phone,Role\n';
    users.forEach(user => {
        csv += `${user._id},${user.name},${user.email},${user.phone},${user.role}\n`;
    });

    // Set headers so the browser treats this as a file download
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csv);
});

// Fetch a single user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u._id === req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// Add a new user
app.post('/api/users', (req, res) => {
    // Quick and dirty ID generation using timestamp
    // In a real app, the DB would handle this
    const newUser = {
        _id: String(Date.now()),
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Edit an existing user
app.put('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "User not found" });

    // Merge existing user data with updates
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
});

// Remove a user
app.delete('/api/users/:id', (req, res) => {
    // Just filter out the one we want to delete
    users = users.filter(u => u._id !== req.params.id);
    res.json({ message: "User deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Backend server is up and listening on port ${PORT}`);
});
