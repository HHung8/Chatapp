import { SERVER_ENDPOINTS } from "../utils/contants";
import { SignupData } from "../utils/type";
import authFetchHandler from "./authFetchHandler";

export const userSignup = async (signupData: SignupData) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.AUTH.SIGNUP,
    method: "POST",
    data: {
      email: signupData?.email,
      name: signupData?.fullName,
      password: signupData?.password,
      imageUrl: signupData?.imageUrl,
    },
  });
  console.log(response)
  return response;
};


export const userLogin = async(loginData: {email: string; password:string}) => {
    const response = await authFetchHandler({
        endPoint: SERVER_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        data: {
            email: loginData?.email,
            password: loginData?.password,
        }
    });
    return response;
}
