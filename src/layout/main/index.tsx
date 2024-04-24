import { Outlet } from "react-router-dom"

import "./style.scss"

const index = () => {
  return (
    <main className=" p-4">
       <Outlet/>
    </main>
  )
}

export default index