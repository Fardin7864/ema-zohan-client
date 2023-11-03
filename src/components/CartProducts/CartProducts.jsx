import { useOutletContext } from "react-router-dom";
import CartProduct from "../CartProduct/CartProduct";
import { AiFillDelete, AiFillCreditCard } from "react-icons/ai";
import { getFromLocalStorage } from "../LocalStorage/Localstorage";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import { AuthContext } from "../../providers/AuthContext";
import Skeleton from "react-loading-skeleton";

const CartProducts = () => {
  const [toRender, setToRender] = useState(false);
  const [products, setProducts] = useState([]);
  // const allProducts = useOutletContext();
  // const savedProducts = getFromLocalStorage();
  const [showAll, setShowAll] = useState(false);
  const {userC}= useContext(AuthContext)
  const loader = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const handleRender = ()=>{
    setToRender(!toRender)
  }
  const email = userC?.email;
  useEffect(() => {
    // const toDisplayProduct = allProducts.filter((product) =>
    //   savedProducts.includes(product.id)
    // );
    // setProducts(toDisplayProduct);
    loader.get(`/cartData?email=${email}`)
    .then(res =>{
       console.log('res.data:', res.data)
       setProducts(res.data)
       setIsLoading(false)
      })
  }, [toRender, loader,email]);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  const toDisplay = !showAll ? products.slice(0, 3) : products;
  let totalPrice = 0;
  let totalShipping = 0;
  let tex = 0;
  products.forEach((product) => {
    totalPrice += product.price;
    totalShipping += product.shipping;
    tex += totalPrice * 0.02;
  });

  return (
    <div className="">
      <div className="flex justify-center gap-4">
        {isLoading? 
        (
          <div className=" grid grid-col-1">
            {Array(products.length || 3).fill(null).map((_,index)=>
            (
              <div key={index} className='p-3 flex rounded-lg gap-5'>
              <div className="w-24 h-24">
                <Skeleton height={80}/>
              </div>
                  <div className=" flex flex-col grow">
                  <Skeleton height={30} width={100}/>
                  <Skeleton height={20} width={100} />
                  <Skeleton height={20} width={100} />
                  </div>
                  <div className='flex justify-center items-center text-4xl  h-auto'>
                      <Skeleton height={30} width={30} className=" rounded-full"/>
                  </div>
              </div>
            ))}

        </div>
         )
        :
        <div className="px-3">
          {toDisplay?.map((product) => (
            <CartProduct key={product.id} product={product} handleRender ={handleRender}></CartProduct>
          ))}
        </div>
        }
        <div className="bg-[#ff99004d] w-1/3 h-5/6 rounded-xl my-5">
          <div className="px-5">
            <h4 className="text-3xl font-bold py-4">Order Summary</h4>
            <p className="py-2">Selected Item:{products?.length} </p>
            <p className="py-2">Total Price: ${totalPrice.toFixed(0)}</p>
            <p className="py-2">Total Shipping Charge: ${totalShipping.toFixed(0)}</p>
            <p className="py-2">Tex: ${tex.toFixed(0)}</p>
            <h4 className=" text-2xl font-bold py-2">
              Grand Total: ${(totalPrice + totalShipping + tex).toFixed(0)}{" "}
            </h4>
          </div>
          <div className="flex flex-col gap-3">
            <button className="btn btn-accent ">
              Clear Cart <AiFillDelete></AiFillDelete>
            </button>
            <button className="btn btn-primary ">
              Check Out <AiFillCreditCard></AiFillCreditCard>{" "}
            </button>
          </div>
        </div>
      </div>
      { products.length > 3 &&
      
      
        (!showAll ? <div className="flex justify-center my-6">
        <button onClick={handleShowAll} className="btn btn-warning">
          Show All
        </button>
        </div>
         : <div className="flex justify-center my-6">
         <button onClick={handleShowAll} className="btn btn-warning">
           Show less
         </button>
         </div>)
    || ''

      }
    </div>
  );
};

export default CartProducts;
