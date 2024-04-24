import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { ToastContainer, toast } from "react-toastify";


import * as Yup from "yup"
import { useMask } from '@react-input/mask';
import {register} from "@auth";
import "./style.scss";

const index = () => {
  const inputRef = useMask({ mask: '+998 (__) ___-__-__', replacement: { _: /\d/ } });
  const navigate = useNavigate();
  const [formData , setFormData] = useState({username: "", password: "",phone: ""});
  const [error, setError] = useState<{ [key: string]: string }>({username: "", password: "", phone:""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    // console.log(formData); 
 }
const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Posswod invalit ").required("Password is required"),
  phone: Yup.string().required("Phone is required"),
});



 // function form submit ------------------------// (e) type->  React.ChangeEvent<HTMLInputElement>
 const handelSubmit = async(e: any)=>{
    e.preventDefault();
        
    try{
      await schema.validate(formData , {abortEarly: false});
      let phoneNumber = formData.phone.replace(/\D/g, '');
      let neWFormData = {...formData, phone: `+${phoneNumber}`}
      
      const data =  await register("/auth/register" , neWFormData);

      if(data.status===201){
      toast.success("User Added Successfully");
      setTimeout(() => { navigate("/login")}, 500);
    }
    
    } catch (err) {
      let errVal:{ [key: string]: string } ={}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error:any) => {
          if (!errVal[error.path]) {
            errVal[error.path] = error.message;
          }
        });
      setError(errVal);
    }
  }  
} 
  return <>
  
  <div className="refister-wrapp w-full h-[100vh] flex items-center justify-center">
      <div className=" max-w-[700px] w-full border rounded-3xl bg-transparent py-7 px-5 flex flex-col items-center justify-center">
        <h1 className="text-[24px] text-white mb-3">Foorm Registrator</h1>
        <form
          onSubmit={handelSubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            onChange={handleChange}
            name="username"
            placeholder="Username"
            className=" w-[90%] mb-3 py-2 px-4 bg-transparent border  outline-none text-black text-[20px] placeholder:text-black rounded-lg focus:border-yellow-700"
            
          />
          {
            error && <p className="mb-3 text-red-500">{error.username}</p>
          }
          <input
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="Password"
            className=" w-[90%] mb-3 py-2 px-4 bg-transparent border  outline-none text-black text-[20px] placeholder:text-black rounded-lg focus:border-yellow-700"
           
          />
          {
            error && <p className="mb-3 text-red-500">{error.password}</p>
          }
          <input
           ref={inputRef}
            type="tel"
            onChange={handleChange}
            name="phone"
            placeholder="Phone"
            className=" w-[90%] mb-3 py-2 px-4 bg-transparent border  outline-none ttext-black text-[20px] placeholder:text-black rounded-lg focus:border-yellow-700"
           
          />
          {
            error && <p className="mb-3 text-red-500">{error.phone}</p>
          }
          <button className="w-[50%] bg-green-700 rounded-lg py-2 px-3 text-[18px] text-white hover:bg-green-300 active:bg-white  duration-300 active:text-cyan-600">
            Submit
          </button>

        </form>
        
      </div>
    </div>
    <ToastContainer/>
  </>;
};

export default index;
