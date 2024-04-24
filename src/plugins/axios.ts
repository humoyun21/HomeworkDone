import axios from "axios";

const http:any = axios.create({
    baseURL: "http://45.138.158.252:3000"
})

 http.interceptors.request.use((config:any)=>{
    let token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export  { http };