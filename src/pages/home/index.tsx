
import {Header , Sidebar , Footer}from "@components"
import { Main } from "@layout";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "./style.scss"

const index = () => {

    const navigate = useNavigate();
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
    }, []);

    return <>
    <div className="flex">
        <Sidebar/>
        <div className=" basis-3/4 ">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    </div>
    </>
};

export default index;