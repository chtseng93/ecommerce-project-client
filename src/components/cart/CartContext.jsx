import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children })=> {
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(
      localStorage.getItem(
        "botland-shopping-cart"
      )
    ) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "botland-shopping-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // const addToCart = (items) => {
  //   setCartItems([...cartItems, item]);
  // };

  const addToCart = (item) => {
    const newCartItems = cartItems.filter((i) => i.productId !== item.productId);
    setCartItems([
      ...newCartItems,
      item,
    ]);
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((i) => i.productId !== item.productId));
  };


  const refreshCart = (items) => {
    setCartItems(items);
  }

  const deleteAllCartItems = () =>{
    setCartItems([]);
    localStorage.removeItem("botland-shopping-cart"); 

  }

  return (
    <CartContext.Provider value={{ cartItems, refreshCart,removeFromCart,addToCart,deleteAllCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>{
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
