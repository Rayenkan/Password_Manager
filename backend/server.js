// app.js
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

console.log("Starting server...");

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Password_Manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('MongoDB connected...');
    })

// Define User schema and model with explicit collection name
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { collection: 'user' }); // Explicitly specifying the collection name

const User = mongoose.model('User', userSchema);

// Define Password schema and model with explicit collection name
const passwordSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userDt: {
        website: { type: String, required: true },
        mail: { type: String, required: true },
        password: { type: String, required: true },
    }
}, { collection: 'userData' }); // Explicitly specifying the collection name

const Password = mongoose.model('Password', passwordSchema);

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        console.log('Creating new user:', user);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(400).send(error);
    }
});

// Create a new password entry for a user
app.post('/addPassword', async (req, res) => {
    try {
        console.log(req.body)
        const filter = { id: "1" }; // Filter condition to find the document

        const update = {
            $push: {
                userDt: {
                    website: req.body.data.website,
                    mail: req.body.data.mail,
                    password: req.body.data.password
                }
            }
        };

        // Perform the update operation
        const result = await Password.updateOne(filter, update);
        console.log('Adding new password entry:', result);
        res.status(201).send(result);
    } catch (error) {
        console.log('Error adding password:', error);
        res.status(400).send(error);
    }
});

// Get all passwords for a user
app.get('/passwords', async (req, res) => {
    try {
        const userId = req.query.userId; // Extract userId from query parameters
        console.log(`Fetching passwords for user ID: ${userId}`);

        if (!userId) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        const passwords = await Password.find({ id: userId }); // Query using the custom id field
        console.log('Passwords found:', passwords);
        res.status(200).send(passwords);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(400).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
