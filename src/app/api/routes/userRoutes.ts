// server/routes/userRoutes.js
import {Router} from "express";
import axios from "axios";
import { UserDetails } from "@/lib/types";

const router = Router();

// GET all users
router.get("/members", (req, res) => {
  res.send("Get all members");
});

// POST register new user
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, date, number } = req.body;
  try{
    const result = await axios.post('/members',{
      firstName,
      lastName,
      email,
      date,
      number
    })
    const data:UserDetails = result.data
    res.json(data)
  }
  catch(error){
    console.log(error)
  }
});

// GET single user by ID
router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Get user with ID ${userId}`);
});

export default router;


