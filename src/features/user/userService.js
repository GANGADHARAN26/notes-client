import axios from "axios";
import { backendUrl } from "../../../config";
import { toast } from "react-toastify";

const register=async(userData)=>{
    const response=await axios.post(`${backendUrl}user/register`,userData);
        return response.data;
}
const login=async(userData)=>{
    const response=await axios.post(`${backendUrl}user/login`,userData);
    if(response.data){
            localStorage.setItem('customer',JSON.stringify(response.data));
        toast.success(response.data.notify);
        return response.data;
    }else{
        toast.error("error in user login")
    }
}
const forgotPassword=async(userData)=>{
    const response=await axios.post(`${backendUrl}user/forgot-password`,userData);
    if(response.data){
        toast.success(response.data.notify);

        return response.data;
    }else{
        toast.error("error in forgot password")
    }
}
const updatePassword=async(userData)=>{
    const response=await axios.post(`${backendUrl}user/update-password`,userData);
    if(response.data){
        toast.success(response.data.notify);

        return response.data;
    }else{
        toast.error("error in update password")
    }
}
export const authService={
    register,
    login,
    forgotPassword,
    updatePassword,
}