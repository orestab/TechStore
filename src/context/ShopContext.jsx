import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ShopContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem('tech_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('tech_wishlist')) || [],
};

function shopReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
      let updatedCart;
      if (existingIndex > -1) {
        updatedCart = state.cart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      return { ...state, cart: updatedCart };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      const updatedCart = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      return { ...state, cart: updatedCart };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.some(item => item.id === action.payload.id);
      const updatedWishlist = exists
        ? state.wishlist.filter(item => item.id !== action.payload.id)
        : [...state.wishlist, action.payload];
      return { ...state, wishlist: updatedWishlist };
    }
    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    localStorage.setItem('tech_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('tech_wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);