import { useLoaderData } from "react-router-dom";
import Product from "../Product/Product";
import { useEffect, useState } from "react";

const Products = () => {
    const loaderProducts = useLoaderData();
    const [products, setProducts] = useState();
    const [currenPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    // const [count, setCoutn] = useState(0)
    const totalData = loaderProducts.length;
    const totalPages = Math.ceil(totalData / itemsPerPage);
    const pages = [...Array(totalPages).keys()];
    // console.log(pages)

    // useEffect(() => { 
    //     fetch('http://localhost:5000/productsCounts')
    //     .then(res => res.json())
    //     .then(result => setCoutn(result.count))
    //  },[])

    useEffect(() => { 
        fetch(`http://localhost:5000/productsByCount?page=${currenPage}&size=${itemsPerPage}`)
        .then(res => res.json())
        .then(data => setProducts(data))
     },[currenPage,itemsPerPage])

     const handleSize =(e) => { 
        const val = parseInt(e.target.value);
        setItemsPerPage(val)
        setCurrentPage(0)
      }

    const handleNext = () => { 
        if (currenPage < totalPages -1 ) {
            setCurrentPage(currenPage + 1)
        }
     }
     const handlePrev = () => { 
        if (currenPage > 0) {
            setCurrentPage(currenPage - 1)
        }
      }

    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-7">
            {
                products?.map(product => 
                    <Product
                    key={product.id}
                    product={product}
                    ></Product>)
            }
        </div>
           <div className=" flex items-center justify-center gap-3">

            <button onClick={handlePrev} className=" btn btn-warning">Prev</button>
                {
                    pages.map(page => <button onClick={()=>setCurrentPage(page)} className={currenPage === page ? 'btn bg-orange-400' : 'btn btn-ghost'} key={page}>{page}</button>)
                }
                <button onClick={handleNext} className=" btn btn-warning ">Next</button>
                <div className=" flex items-center gap-3">
                    <p>Total Items:</p>
                    <select className=" border border-orange-500 p-2" value={itemsPerPage} onChange={handleSize}>
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