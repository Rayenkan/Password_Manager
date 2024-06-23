import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

console.log("Starting server...");

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Password_Manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Define User schema and model with explicit collection name
const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // User ID field, required and unique
    name: { type: String, required: true }, // User's name, required
    email: { type: String, required: true }, // User's email, required
    password: { type: String, required: true }, // User's password, required
  },
  {
    collection: "user", // MongoDB collection name for users
    versionKey: false, // Disable versioning (__v) field in documents
  }
);

const User = mongoose.model("User", userSchema); // Create User model

// Define Password schema and model with explicit collection name
const passwordSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true }, // User ID field, required
    userDt: [
      {
        website: { type: String, required: true }, // Website URL associated with password
        mail: { type: String, required: true }, // Email associated with password
        password: { type: String, required: true }, // Password string
      },
    ],
  },
  {
    collection: "userData", // MongoDB collection name for password data
    versionKey: false, // Disable versioning (__v) field in documents
  }
);

const Password = mongoose.model("Password", passwordSchema); // Create Password model

// Create a new user
app.post("/addUser", async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Calculate the next userId (assuming it's incremental)
    const userId = (await User.countDocuments()) + 1;

    // Create a new user instance
    const newUser = new User({
      id: userId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    console.log("New user created:", savedUser);
    res.status(201).json(savedUser); // Respond with the saved user data
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login endpoint
app.post("/login", async (req, res) => {
  try {
    // Find user by email and password
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      res.status(200).send(user); // Send user data if found
    } else {
      res.status(200).json({ message: "User not found" }); // User not found response
    }
  } catch (error) {
    console.error("User not found:", error);
    res.status(400).send("Error during login");
  }
});

// Add a new password entry for a user
app.post("/addPassword", async (req, res) => {
  try {
    const { id, data } = req.body;

    // Check if a Password document exists for the user ID
    let passwordDoc = await Password.findOne({ id });

    if (passwordDoc) {
      // If Password document exists, add a new entry to userDt array
      passwordDoc.userDt.push({
        website: data.website,
        mail: data.email,
        password: data.password,
      });
    } else {
      // If no Password document exists, create a new one
      passwordDoc = new Password({
        id,
        userDt: [
          {
            website: data.website,
            mail: data.email,
            password: data.password,
          },
        ],
      });
    }

    // Save the updated or new Password document
    const savedPassword = await passwordDoc.save();
    console.log("Password entry added:", savedPassword);
    res.status(201).json(savedPassword); // Respond with the saved password data
  } catch (error) {
    console.error("Error adding password:", error);
    res.status(400).json({ message: "Error adding password" });
  }
});

// Get all passwords for a user
app.get("/passwords", async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query parameters

    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }

    // Find all passwords associated with the userId
    const passwords = await Password.find({ id: userId });

    console.log("Passwords found:", passwords);
    res.status(200).send(passwords); // Respond with the found passwords
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(400).send(error);
  }
});

// Start the server and listen on specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
