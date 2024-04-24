import { http } from "./axios";

interface dataLogin{
    username: string;
    password: string;
}


interface dataRegiste extends dataLogin{
    phone: string;
}

const register = async(url:string , data:dataRegiste)=>{
    try{
        const response = await http.post(url, data);
        return response;
    }catch(error){
        console.log(error);
    }
}

const login = async(url:string , data:dataLogin)=>{
    try{
        const response = await http.post(url, data);
        return response;
    }catch(error){
        console.log(error);
    }
}

export {login , register}