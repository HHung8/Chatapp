import express from 'express';
import { getAllUsers } from '../models/usersModel';
const usersController = express.Router();

usersController.post("/all", getAllUsers)
export default usersController;