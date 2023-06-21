import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  return <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>{children}</CartContext.Provider>;
};
