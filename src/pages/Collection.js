import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../components/assets/website/assets";
import Title from "../components/title/Title";
import ProductItem from "../components/Latest-collections/ProductItem";

const Collection = () => {
  const { products , search, showSearch} = useContext(ShopContext);
  // filters state
  const [showFilter, setShowFilter] = useState(false);
  // state for filter products
  const [filterProducts, setFilterProducts] = useState([]);
  // filter for main catageory
  const [category, setCategory] = useState([]);
  // filter for sub catageory
  const [subCategory, setsubCategory] = useState([]);
// sort type state
const [sortType, setSortType] = useState('relavent')
  const [noResults, setNoResults] = useState(false);
  // toogle for catageory for filter

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  // toogle for sub catageory for filter

  const toggleSubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setsubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubCategory((prev) => [...prev, e.target.value]);
    }
  };
const applyFilter = () => {
  let productsCopy = products.slice();
  // search
  if(showSearch && search) {
    productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  }
  if(productsCopy.length === 0) {
    setNoResults(true)
  }else {
    setNoResults(false)
  }
//  filter
  if(category.length > 0) {
    productsCopy = productsCopy.filter(item => category.includes(item.category))
  }
  if(subCategory.length > 0) {
    productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
  }
  setFilterProducts(productsCopy);
}
// sort functanilty

const sortProducts = () => {
  let filterProductCopy = filterProducts.slice();
  switch (sortType) {
    case 'low-high':
      setFilterProducts(filterProductCopy.sort((a, b)=> (a.price - b.price)));
      break;

      case 'high-low': 
      setFilterProducts(filterProductCopy.sort((a,b) => (b.price - a.price)));
      break;

      default : 
      applyFilter();
      break;
  }
}



// useEffect for catageory filter
useEffect(() => {
  applyFilter();
}, [category , subCategory, search, showSearch]);
// useEffect for sort
useEffect(() => {
  sortProducts()
}, [sortType]);


  return (
    <div className="flex flex-col sm:flex-row gap-q sm:gap-10 pt-10 border-t">
      {/* filters option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="myy-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATAGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                onChange={togglecategory}
                value={"Men"}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                onChange={togglecategory}
                value={"Women"}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                onChange={togglecategory}
                value={"Kids"}
              />
              Kids
            </p>
          </div>
        </div>
        {/* subcatageory filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={"Topwear"} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={"Bottomwear"} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={"Winterwear"} />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* products collections */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL "} text2={"COLLECTIONS"} />
          {/* products sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* products listings */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
          {noResults && <p>No result found</p>}
        </div>
      </div>
    </div>
  );
};

export default Collection;
