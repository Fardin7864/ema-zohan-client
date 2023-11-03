// import { useLoaderData } from "react-router-dom";
import Product from "../Product/Product";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../hooks/useAxios/useAxios";

const Products = () => {
  // const loaderProducts = useLoaderData();
  const [products, setProducts] = useState();
  const [currenPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const totalData = loaderProducts.length;
  const totalPages = Math.ceil(totalDataCount / itemsPerPage);
  const pages = [...Array(totalPages).keys()];
  const loader = useAxios();

  useEffect(() => {
    // Fetch total data count
    fetch("https://ema-zohan-server-cw431fdf8-fardin7864s-projects.vercel.app/productsCounts")
      .then((res) => res.json())
      .then((result) => setTotalDataCount(result.count));
  }, []);

  useEffect(() => {
    // fetch(
    //   `https://ema-zohan-server-cw431fdf8-fardin7864s-projects.vercel.app/productsByCount?page=${currenPage}&size=${itemsPerPage}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProducts(data);
    //     setIsLoading(false);
    //   });

    loader.get(`/productsByCount?page=${currenPage}&size=${itemsPerPage}`)
          .then((data) => {
            setProducts(data.data);
            setIsLoading(false);
          });

  }, [currenPage, itemsPerPage,loader]);

  const handleSize = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handleNext = () => {
    if (currenPage < totalPages - 1) {
      setCurrentPage(currenPage + 1);
    }
  };
  const handlePrev = () => {
    if (currenPage > 0) {
      setCurrentPage(currenPage - 1);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-7">
          {Array(itemsPerPage)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="border p-4">
                <Skeleton height={100} />
                <Skeleton height={30} width="80%" />
                <Skeleton height={20} width="60%" />
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-7">
          {products?.map((product) => (
            <Product key={product.id} product={product}></Product>
          ))}
        </div>
      )}

      <div className=" flex items-center justify-center gap-3">
        <button onClick={handlePrev} className=" btn btn-warning">
          Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currenPage === page ? "btn bg-orange-400" : "btn btn-ghost"
            }
            key={page}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className=" btn btn-warning ">
          Next
        </button>
        <div className=" flex items-center gap-3">
          <p>Total Items:</p>
          <select
            className=" border border-orange-500 p-2"
            value={itemsPerPage}
            onChange={handleSize}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Products;
