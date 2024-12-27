import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { SocketContextType } from "../utils/type";
import { io, Socket } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useAuthContext } from "./AuthContext";
import { VITE_SERVER_URL } from "../utils/contants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext<SocketContextType | null>(null);
const SocketContextProvider = ({children}:{children:ReactNode}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cookies] = useCookies(["token"]);
  const {loggedInUser} = useAuthContext();
  const navigate = useNavigate();

  const memoizedCookies = useMemo(() => {
    return cookies;
  },[cookies]);

  useEffect(() => {
    if(memoizedCookies && memoizedCookies?.token) {
        try {
            const socketInstance = io(VITE_SERVER_URL, {
                auth:{token:memoizedCookies?.token},
            });
            if(sessionStorage) {
                setSocket(socketInstance);
            }
        } catch (error) {
            console.log(error);
            navigate('/auth');
            toast.error(
                error?.toString() ?? 'Error establishing websocket connection',
                {style:{borderRadius:"10px", background:"#333",color:"#fff"}}
            )
        }
    }
  },[memoizedCookies, navigate])

  useEffect(() => {
    if(socket && loggedInUser && loggedInUser?.isAuthenticated && loggedInUser?.user) {
        socket.on('connect', () => {
            socket.emit("connectedUser", loggedInUser?.user?.id)
        });
        socket.on('disconnect', () => {
            socket.emit("disconnectedUser", loggedInUser?.user?.id)
        })
        return () => {
            socket.off("connect", () => {})
            socket.off("disconnect", () => {})
        }
    }
  },[socket, loggedInUser])

  return (
    <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider;
// eslint-disable-next-line react-refresh/only-export-components
export function useSocketContext () {
    return useContext(SocketContext)
}