import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "REPORT_UPDATE_TRIGGER":
      return { ...state, reportUpdateTrigger: !state.reportUpdateTrigger };
    case "SET_MIN_PRICE":
      return { ...state, minPrice: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };
    case "NAME_FILTER":
      return { ...state, nameFilter: action.payload };
    case "SET_SORT_FIELD":
      return { ...state, sortField: action.payload };

    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    sortField: "",
    sortOrder: "",
    minPrice: "",
    maxPrice: "",
    nameFilter: "",
    reportUpdateTrigger: false,
  });

  const handleAddProduct = async (newProduct) => {
    try {
      await axios.post("http://localhost:5000/products", newProduct);

      const updatedProducts = await axios.get("http://localhost:5000/products");
      dispatch({ type: "SET_PRODUCTS", payload: updatedProducts.data });
      dispatch({ type: "REPORT_UPDATE_TRIGGER" });
      console.log("Produkt został dodany");
    } catch (error) {
      console.error("Błąd podczas dodawania produktu:", error);
    }
  };

  const handleEditProduct = async () => {
    const updatedProducts = await axios.get("http://localhost:5000/products");
    dispatch({ type: "SET_PRODUCTS", payload: updatedProducts.data });
    dispatch({ type: "REPORT_UPDATE_TRIGGER" });
    console.log("Produkt został zaktualizowany");
  };

  const contextValue = {
    state,
    dispatch,
    handleAddProduct,
    handleEditProduct,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Nieprawidłowe użycie kontekstu!");
  }
  return context;
};
