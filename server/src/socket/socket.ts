import {Server} from 'socket.io';
import express from 'express';
import { createServer } from 'node:http';
import { CLIENT_URL } from '../contants';

const app = express();
const server = createServer(app);

const io = new Server(server, {cors:{
    origin:[CLIENT_URL as string],
    method:["GET", "POST"]
}});
 
export {app,server, io};

