import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../title/Title";
import ProductItem from "../Latest-collections/ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 8));
  }, [])
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ld:grid-cols-5 gap-4 gap-y-6">
        {
        bestSeller.map((item, index) => (
          <ProductItem key={index}
           id={item._id}
            name={item.name}
             image={item.image} 
             price={item.price}/>
        ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
