// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("DB Connection Error:", err));

// // Import Routesa
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const User = require("./models/User");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serve static files from 'public' folder

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Connection Error:", err));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
