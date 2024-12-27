import express from 'express';
import { login, signup, verifyUser } from '../models/authModel';
const authController = express.Router();

authController.post("/signup", signup);
authController.post("/login", login)
authController.get("/verifyUser", verifyUser)

export default authController;