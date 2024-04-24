import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";
import { http } from "@http";

function index() {
  const [data, setData] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [editProductdId, setEditProductId] = useState<number | null>(null);

  const [img, setImg] = useState("");
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);

  interface postDataInterface {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    brandId: number;
    modelId: number;
  }
  //-------------
  //Get
  const getProduct = () => {
    axios
      .get("http://45.138.158.252:3000/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        //  console.log(res?.data);
        setData(res.data);
      });
  };

  // Function useEffect 
  useEffect(() => {
    getProduct();
    http.get("/models").then((res: any) => {
      setModel(res.data);
    });
    http.get("/brands").then((res: any) => {
      setBrand(res.data);
    });
  }, []);
 
  // handle inpure file creation images
  const handelChange = (e: any) => {
    const file = new FormData();
    file.append("file", e.target.files[0]);
    http
      .post("images/upload", file)
      .then((res: any) => {
        if (res.status === 201) {
          setImg(res?.data?.path);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  // add product function 
  const createProduct = (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      price: +e.target[1].value,
      imageUrl: img,
      modelId: +e.target[3].value,
      brandId: +e.target[4].value,
    };
    console.log(data);

    http
      .post("/products", data)
      .then((res: any) => {
        console.log(res);

        if (res.status === 201) {
          toast.success("Product Added Successfully");
          setTimeout(() => {
            getProduct();
            setAddProduct(false);
            setImg("")
          }, 500);
        }
      })
      .catch((err: any) => {
        if (err.response.status === 409) {
          toast.error("Product Already Exists");
          setTimeout(() => {
            setAddProduct(false);
          }, 2000);
        }
      });
  };
 


  // delete product function-------------------------------
  const deleteProduct = async (id: number | string) => {
    try {
      const res = await http.delete(`/products/${id}`);
      //  console.log(res);
      if (res?.status == 200) {
        toast.success("Product Deleted Successfully");
        let newData = data.filter((itim: any) => itim?.id !== id);
        setData(newData);
      }
    } catch (err: any) {
      //  console.log(err)
      if (err?.response?.status == 404) {
        toast.error("Product Not Found");
      }
    }
  };
  //=========================================================



  return (
    <>
      <h1 className="text-[24px] text-center font-medium mb-2 " >
        Products page
      </h1>
      <button
        onClick={() => setAddProduct(true)}
        className="py-2 px-5 rounded-full bg-lime-500 text-white text-[18px] mb-4"
      >
        add
      </button>
      {addProduct && (
        <div className=" fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center  bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
          <div className=" relative">
            <button
              onClick={() => {
                setAddProduct(false)
                setImg("")
              }}
              className=" absolute top-6 right-3  hover:shadow-sm hover:shadow-slate-300 duration-200 py-1 px-2 rounded-md"
            >
              <i className="bi bi-x-lg text-white"></i>
            </button>
            <form
              onSubmit={createProduct}
              className="flex items-center flex-col my-3 border p-5 rounded-lg shadow-md shadow-slate-300 "
            >
              <h1 className="text-[24px] text-white mb-3 text-center">
                Form add products
              </h1>
              <input
                required
                type="text"
                placeholder="Add products name"
                className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]"
              />
              <input
                required
                type="number"
                placeholder="Add products price"
                className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]"
              />
              <input
                required
                onChange={handelChange}
                type="file"
                className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]"
              />
              {img && (
                <img
                  src={img}
                  alt="img product"
                  className="max-w-[200px] max-h-[150px] w-full h-full object-cover "
                />
              )}
              <p className=" text-[18px] text-white">Models</p>
              <select className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]">
                {model.map((el: any) => {
                  return (
                    <option
                      className=" text-slate-600"
                      key={el?.id}
                      value={el?.id}
                    >
                      {el?.name}
                    </option>
                  );
                })}
              </select>
              <p className=" text-[18px] text-white">Brands</p>
              <select className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]">
                {brand.map((el: any) => {
                  return (
                    <option
                      className=" text-slate-600"
                      key={el?.id}
                      value={el?.id}
                    >
                      {el?.name}
                    </option>
                  );
                })}
              </select>
              <button className="py-2 px-7 text-[18px] bg-lime-500 hover:bg-lime-700 duration-200 active:bg-lime-500 border text-white rounded-full">
                <i className="bi bi-database-fill-add mr-2"></i>add
              </button>
            </form>
          </div>
        </div>
      )}
      {editProduct && (
        <div className=" fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center  bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
          <div className=" relative">
          <button
              onClick={() => {
                setEditProduct(false)
                setImg("")
              }}
              className=" absolute top-6 right-3  hover:shadow-sm hover:shadow-slate-300 duration-200 py-1 px-2 rounded-md"
            >
              <i className="bi bi-x-lg text-white"></i>
            </button>
            <form
              className="flex items-center flex-col my-3 border p-5 rounded-lg shadow-md shadow-slate-300 "
            >
              <h1 className="text-[24px] text-white mb-3 text-center">
                Form edit products
              </h1>
              <input
                required
                type="text"
                placeholder="Edit products name"
                className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]"
              />
              <input
                required
                type="number"
                placeholder="Edit products price"
                className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]"
              />
              <input type="file" 
              required
              onChange={handelChange} 
              className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]"/>
              {img && (
                <img
                  src={img}
                  alt="img product"
                  className="max-w-[200px] max-h-[150px] w-full h-full object-cover "
                />
              )}
              
              <select className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]">
                {model.map((el: any) => {
                  return (
                    <option className=" text-slate-600" key={el?.id} value={el?.id}>
                      {el?.name}
                    </option>
                  );
                })}
              </select>
              <select className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]">
                {brand.map((el: any) => {
                  return (
                    <option className=" text-slate-600" key={el?.id} value={el?.id}>
                      {el?.name}
                    </option>
                  );
                })}
              </select>
              <button className="py-2 px-7 text-[18px] bg-lime-500 hover:bg-lime-700 duration-200 active:bg-lime-500 border text-white rounded-full">
                <i className="bi bi-pencil-square mr-2"></i>edit
              </button>
            </form>
          </div>
        </div>
      )}
      {data.length ? (
        <div className=" grid grid-cols-3 gap-y-4">
          {data.map((el: postDataInterface) => {
            return (
              <div
                key={el?.id}
                className="flex flex-col items-center max-w-[300px] w-full border rounded-md hover:shadow-lg duration-300"
              >
                <div className="w-full min-h-[150px] h-full">
                  <img
                    src={el?.imageUrl}
                    alt={el?.name}
                    className=" h-full w-full rounded-t-md object-cover"
                  />
                </div>
                <div className="p-3">
                  <h1 className="text-[24px] text-center font-medium mb-2">
                    {el?.name}
                  </h1>
                  <p className="text-center text-gray-500">{el?.description}</p>
                  <p className="text-center text-gray-500">
                    Price: {el?.price}$
                  </p>
                  <p className="text-center text-gray-500">
                    Brand Id: {el?.brandId}
                  </p>
                  <p className="text-center text-gray-500">
                    Model Id: {el?.modelId}
                  </p>
                  <div className="flex items-center justify-center gap-3 my-2">
                    <button
                      onClick={() => {
                        setEditProductId(el?.id);
                        setEditProduct(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <i className="bi bi-pencil-square mr-1"></i>Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(el?.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <i className="bi bi-trash-fill mr-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>NOT FOOND !!!</h1>
      )}
      <ToastContainer />
    </>
  );
}

export default index;
