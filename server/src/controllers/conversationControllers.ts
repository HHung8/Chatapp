import express from 'express';
import { createConversation, deleteConversation, getConversations } from '../models/conversationModel';
const conversationRouter = express.Router();

conversationRouter.post("/", getConversations);
conversationRouter.post("/create", createConversation);
conversationRouter.delete("/delete", deleteConversation);

export default conversationRouter;