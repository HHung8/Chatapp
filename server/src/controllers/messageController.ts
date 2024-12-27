import express from 'express';
import { createMessage, deleteMessage, getMessages } from '../models/messageModel';
const messageRouter = express.Router();

messageRouter.get("/", getMessages);
messageRouter.post("/create", createMessage);
messageRouter.delete("/delete", deleteMessage);

export default messageRouter;
