import { http } from "./axios";

 const getItem = async(url)=>{
    try{
        const response = await http.get(url);
        return response;
    }catch(error){
        console.log(error);
    };
}

 const postItem = async(url, data)=>{
    try{
        const response = await http.post(url, data);
        return response;
    }catch(error){
        console.log(error);
    };
}

 const deleteItem = async(url, id)=>{
    try{
        const response = await http.delete(`${url}/${id}`);
        return response;
    }catch(error){
        console.log(error);
    };
}

 const updateItem = async(url,paylode)=>{
    try{
        const response = await http.put(`${url}/${paylode.id}`, paylode);
        return response;
    }catch(error){
        console.log(error);
    };
}


export {getItem , postItem , deleteItem , updateItem}