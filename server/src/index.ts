import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { app, io, server } from './socket/socket'; 
import authController from './controllers/authController';
import { CLIENT_URL, PORT } from './contants';
import authMiddleware from '../middlewares/authMiddleware';
import usersController from './controllers/usersController';
import conversationRouter from './controllers/conversationControllers';
import messageRouter from './controllers/messageController';
import { handleEvents } from './socket/event';

dotenv.config();
app.use(cors({origin: CLIENT_URL,credentials:true}));
app.use(cookieParser());
app.use(bodyParser.json());

io.on("connection", (socket) => {
    handleEvents(socket)
}) 

app.use("/auth", authController);
// protected routes
app.use("/users", authMiddleware, usersController);
app.use("/conversation", authMiddleware, conversationRouter);
app.use("/message", authMiddleware, messageRouter);

server.listen(PORT, () => {
    console.log('server is running port 8181')
})