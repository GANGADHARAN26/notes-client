import axios from "axios";
import { backendUrl } from "../../../config";
import { toast } from "react-toastify";

const notes=async(userData)=>{
    const response=await axios.post(`${backendUrl}task/${userData.type}`,userData);
    if(response.data){
        return response.data;
    }else{
       toast.error("error in user login")
    }
}
const createNote=async(userData)=>{
    const response=await axios.post(`${backendUrl}task/create`,userData);
    if(response.data){
        return response.data;
    }else{
       toast.error("error in notes creating")
    }
}
const updateNote=async(userData)=>{
    const response=await axios.put(`${backendUrl}task/update`,userData);
    if(response.data){
        return response.data;
    }else{
       toast.error("error in updateing note")
    }
}
const deleteNote=async(userData)=>{
    const response=await axios.put(`${backendUrl}task/trashed`,userData);
    if(response.data){
        return response.data;
    }else{
       toast.error("error in deleting note")
    }
}
export const notesService={
    notes,
    createNote,
    updateNote,
    deleteNote,
}