import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

console.log("Starting server...");

// Middleware
app.use(bodyParser.json());
app.use(cors());

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
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: "user",
    versionKey: false,
  }
); // Explicitly specifying the collection name

const User = mongoose.model("User", userSchema);

// Define Password schema and model with explicit collection name
// Define Password schema and model with explicit collection name
const passwordSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    userDt: [
      {
        website: { type: String, required: true },
        mail: { type: String, required: true },
        password: { type: String, required: true },
      },
    ],
  },
  {
    collection: "userData",
    versionKey: false,
  }
); // Explicitly specifying the collection name

const Password = mongoose.model("Password", passwordSchema);

// Create a new user
app.post("/addUser", async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Calculate the next userId
    const userId = (await User.countDocuments()) + 1;

    // Create a new user
    const newUser = new User({
      id: userId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log("New user created:", savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(200).json({ message: "user Not found" });
    }
  } catch (error) {
    console.error("User not found:", error);
    res.status(400).send("error");
  }
});

// Create a new password entry for a user
app.post("/addPassword", async (req, res) => {
  try {
    const { id, data } = req.body;
    console.log(id)
    // Check if a Password document exists for the user ID
    let passwordDoc = await Password.findOne({ id });
    console.log(passwordDoc);
    if (passwordDoc) {
      passwordDoc.userDt.push({
        website: data.website,
        mail: data.email,
        password: data.password,
      });
      // If no Password document exists, create a new one
    } else {
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

      // Save the new Password document
      const savedPassword = await passwordDoc.save();
      console.log("New Password document created:", savedPassword);
      return res.status(201).json(savedPassword);
    }

    // If Password document exists, add a new entry to userDt array

    // Save the updated Password document
    const updatedPassword = await passwordDoc.save();
    console.log("Adding new password entry:", updatedPassword);
    res.status(201).json(updatedPassword);
  } catch (error) {
    console.error("Error adding password:", error);
    res.status(400).json({ message: "Error adding password" });
  }
});

// Get all passwords for a user
app.get("/passwords", async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query parameters
    console.log(`Fetching passwords for user ID: ${userId}`);

    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }

    const passwords = await Password.find({ id: userId }); // Query using the custom id field
    console.log("Passwords found:", passwords);
    res.status(200).send(passwords);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(400).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
