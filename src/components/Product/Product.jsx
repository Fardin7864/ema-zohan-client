import Rating from "react-rating";
import {AiOutlineStar,AiFillStar} from "react-icons/ai"
import { addToLocalStorage } from "../LocalStorage/Localstorage";
import axios from "axios";
import useAxios from "../../hooks/useAxios/useAxios";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Product = ({ product }) => {
  const {userC} = useContext(AuthContext);
 const email = userC?.email;
  const loader = useAxios();
  const { img, name, price, ratings, seller } =
    product;


    const handleAddCart = () => {
      const withOutId ={...product,email};
      delete withOutId._id;
      console.log(withOutId)
      loader.post('/cart', withOutId)
      .then(res => {
        console.log(res.data)
      })
     }


  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={img || <Skeleton/>} alt="Shoes" />
      </figure>
      <div className="card-body px-0 py-0 gap-3">
        <div className="px-5 flex flex-col">
          <h5 className="text-[#0E161A] text-xl font-normal">{name || <Skeleton/>}</h5>
          <p className="text-base font-normal">Price: ${price || <Skeleton/>}</p>
        </div>
        <div className="px-5 flex flex-col grow">
          <p className="text-[#878888] text-xs font-normal">
            Manufacturer: {seller || <Skeleton/>}
          </p>
          <p className="flex justify-center items-center text-yellow-300 text-xl">
          <Rating
             emptySymbol={<AiOutlineStar></AiOutlineStar> || <Skeleton/>}
             fullSymbol={<AiFillStar></AiFillStar> || <Skeleton/>}
             initialRating={ratings || <Skeleton/>}
             readonly></Rating>
            </p>
        </div>
        <div className="card-actions justify-end">
        <div onClick={ handleAddCart}  className="w-full btn flex justify-center items-center h-12 bg-[#FFE0B3] rounded-br-lg rounded-bl-lg">
         { <button>Add to Cart </button> || <Skeleton/>}
        </div>
        </div>
      </div>
    </div>
  );
};

export  default Product;
