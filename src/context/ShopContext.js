import { createContext, useEffect, useState } from "react";
import { products } from './../components/assets/website/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
// for cart 
  const [cartItems, setCartItems] = useState({})
// for navigate placeorder in cart page
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if(!size) {
      toast.error('Select Product Size');
      return;
    }
    let CartData = structuredClone(cartItems);
    if(CartData[itemId]) {
      if(CartData[itemId][size]) {
        CartData[itemId][size] += 1;
      }
      else{
        CartData[itemId][size] = 1;
      }
    }
    else{
      CartData[itemId] = {};
      CartData[itemId][size] =1;

    }
    setCartItems(CartData);
  }

// cart count 
const getCartCount = () => {
  let totalCount = 0;
  for(const items in cartItems) {
    for (const item in cartItems [items]) {
      try{
        if(cartItems[items][item] > 0 ) {
          totalCount += cartItems[items][item]
        }
      } catch (error) {

      }
    }
  }
  return totalCount;
}
// delete products in cart

const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);
cartData[itemId][size] = quantity;
setCartItems(cartData)
}
// get cart amount
const getCartAmount =() => {
  let totalAmount = 0;
  for(const items in cartItems) {
    let itemInfo = products.find((products)=> products._id === items);
    for(const item in cartItems[items]) {
      try{
        if(cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item]
        }
      }catch (error) {

      }
    }
  }
  return totalAmount;
}

  const value = {
    products , currency, delivery_fee, search, 
    setSearch, showSearch, setShowSearch,
    cartItems, addToCart, getCartCount, updateQuantity,
    navigate, getCartAmount
  }
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
};


export default ShopContextProvider;