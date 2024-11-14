const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5000;

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587, // Use 465 for SSL connections
  auth: {
    user: "apikey", // This is the literal string 'apikey'
    pass: process.env.SENDGRID_API_KEY,
  },
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://martinchardenet:uqaminm5151groupe9@Cluster0.dyror.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {}
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  //e
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: "User with this email already exists" });
    } else {
      res.status(500).json({ error: "Server error, please try again later" });
    }
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Email sending route
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    from: "picasso1.0@outlook.com",
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
