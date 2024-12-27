import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, LoggedInUser } from "../utils/type";
import {useCookies} from "react-cookie";
import axios from "axios";
import { VITE_SERVER_URL } from "../utils/contants";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthContextType>({
    loggedInUser: {isAuthenticated:false, user:null},
    setLoggedInUser: () => {},
    showLoading: true,
});

const AuthContextProvider = ({children}: {children:React.ReactNode}) => {
    const [cookies] = useCookies(["token"]);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
        isAuthenticated: false,
        user: null,
    });
    const [showLoading, setShowLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const authUser = async () => {
            setShowLoading(true);
            if(cookies && cookies?.token && typeof cookies?.token === 'string') {
                try {
                    const response = await axios.get(`${VITE_SERVER_URL}/auth/verifyUser`, {
                        withCredentials: true,    
                    });
                    if(response && response.data) {
                        setLoggedInUser(response?.data ?? null);
                        if(pathname === '/auth') {
                            navigate("/")
                        }
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error?.toString() ?? "Failed to authenticated and verify user. Please try again", {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff'
                        }
                    });
                    
                }
            } else {
                navigate("/auth")
            }
            setShowLoading(false);
        }
        authUser();
    },[cookies,navigate,pathname])

    return (
        <AuthContext.Provider value={{loggedInUser, setLoggedInUser, showLoading}}>
            {children}
        </AuthContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    return useContext(AuthContext)
}
export default AuthContextProvider;