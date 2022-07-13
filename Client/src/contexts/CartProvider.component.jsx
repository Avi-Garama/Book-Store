import React, { useReducer, useContext, createContext } from "react";
import cartActionTypes from "../action/cart-action";

const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state, action) => {
  const { book, items, bookID } = action.payload;
  switch (action.type) {

    case cartActionTypes.INIT:{
      return [...items];
    }
    case cartActionTypes.ADD_TO_SHOP:{
      return [...state, book];
    }
    case cartActionTypes.REMOVE_FROM_SHOP:{
      const result = [...state];
      let bookIndex = result.findIndex((bookObject) => bookObject.bookID._id === bookID);
      result.splice(bookIndex, 1);
      return result;
    }
    case cartActionTypes.CHECKOUT:{
      return [...items];
}
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);