import { Socket } from "socket.io";
import { joinRoom, leaveRoom } from "./room";

export const handleEvents = (socket:Socket) => {
    socket.on("joinConversation", (conversationId:string) => {
        console.log("join", conversationId);
        joinRoom(socket, conversationId)
    })
    socket.on("leaveConversation", (conversationId:string) => {
        leaveRoom(socket, conversationId);
    })
    socket.on("connectedUser", (userId:string) => {
        joinRoom(socket, userId);
    })
    socket.on("disconectedUser", (userId:string) => {
        leaveRoom(socket, userId);
    })
}