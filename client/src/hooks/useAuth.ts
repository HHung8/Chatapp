import { useState } from "react";
import { SignupData } from "../utils/type";
import { userLogin, userSignup } from "../api/authApiHandlers";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";


export default function useAuth() {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_cookies,_,removeCookie] = useCookies();
    const [loading, setLoading] = useState<"login" | "signup" | null>(null);
    const {setLoggedInUser} = useAuthContext();
    const [tabValue, setTabValue] = useState<number>(0)
    
    const [signupData, setSignUpData] = useState<SignupData>({
        cPassword: "",
        email: "",
        fullName:"",
        password:"",
        imageUrl:"",
        showCP:false,
        showP:false,
    });

    const [loginData, setLoginData] = useState<{email:string,password:string,showP:boolean}>({
        email:"",
        password:"",
        showP:false
    })
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
      }
    function handleSignupDataChange({key,value}:{key:string, value:string | boolean}) {
        setSignUpData((prev) => ({...prev, [key]:value}));
    }

    function handleLoginDataChange({key, value}:{key:string, value:string | boolean}) {
        setLoginData((prev) => ({...prev, [key]:value}));
    }

    async function handleSignup() {
        setLoading("signup")
        try {
            const response = await userSignup(signupData)
            if(response && response?.data ) {
                setLoggedInUser({isAuthenticated:true, user:response?.data});
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.toString() ?? "Failed to signup please try again", {
                style: {
                    borderRadius:"10px",
                    background:"#333",
                    color:"#fff"
                }
            })
        }
    }

    async function handleLogin() {
        setLoading("login")
        try {
            const response = await userLogin(loginData)
            if(response && response?.data) {
                setLoggedInUser({isAuthenticated:true, user:response?.data});
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.toString() ?? "Failed to login please try again", {
                style: {
                    borderRadius: "10px",
                    background:"#333",
                    color:"#fff"
                }
            })
        }
    }

    async function logout() {
        await removeCookie('token')
    }

    return {    
        signupData, 
        handleSignupDataChange, 
        handleSignup, 
        loading, 
        loginData, 
        handleLoginDataChange,
        handleLogin,
        tabValue,
        handleChange,
        logout
    }
}