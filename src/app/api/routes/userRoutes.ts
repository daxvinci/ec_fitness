// server/routes/userRoutes.js
import {Router} from "express";

const router = Router();

// GET all users
router.get("/users", (req, res) => {
  res.send("Get all users");
});

// POST register new user
router.post("/register", (req, res) => {
  const { name, email, membershipType } = req.body;
  res.send("User registered");
});

// GET single user by ID
router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Get user with ID ${userId}`);
});

export default router;


