import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { Home, Register, Login, Brands, Products, Models, Erorr } from "@pages";

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Register />} />
        <Route path="/home/*" element={<Home />}>
          <Route path="brands" element={<Brands />} />
          <Route path="products" element={<Products />} />
          <Route path="models" element={<Models />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Erorr />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default index;
