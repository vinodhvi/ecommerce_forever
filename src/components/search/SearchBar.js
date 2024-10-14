import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../assets/website/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
    const [visible, setVisible] = useState(false)
const location = useLocation();

useEffect(()=> {
  if(location.pathname.includes('collection') ) {
    setVisible(true);
  }
  else{
    setVisible(false)
  }
}, [location])

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 my-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input value={search}
         onChange={(e)=> setSearch(e.target.value)}
          type="text" placeholder="Search" 
          className="flex-1 outline-none bg-inherit text-sm "/>
          <img className="w-3" src={assets.search_icon} alt="search"/>
         
        </div>
        
        <img onClick={()=> setShowSearch(false)} className="w-2 inline cursor-pointer" src={assets.cross_icon} alt="cross"/>
    </div>
  ) : null;
};

export default SearchBar;
