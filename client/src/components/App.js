import { useState, useEffect } from "react";
import axios from "axios";
import AddProductForm from "./AddProductForm";
import Report from "./Report";
import ProductsList from "./ProductsList";
import PriceFilter from "./PriceFilter";
import { useApp } from "../context/AppContext";
import NameFilter from "./NameFilter";
import SortItems from "./SortItems";

function App() {
  const { state, dispatch } = useApp();
  const {
    sortField,
    sortOrder,
    minPrice,
    maxPrice,
    nameFilter,
    reportUpdateTrigger,
  } = state;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/products", {
          params: { sortField, sortOrder, minPrice, maxPrice, nameFilter },
        });

        dispatch({ type: "SET_PRODUCTS", payload: response.data });
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [
    sortField,
    sortOrder,
    minPrice,
    maxPrice,
    nameFilter,
    reportUpdateTrigger,
    dispatch,
  ]);

  return (
    <>
      {isLoading ? (
        <p>Trwa ładowanie danych...</p>
      ) : (
        <>
          <AddProductForm />
          <NameFilter />
          <SortItems />
          <PriceFilter />
          <ProductsList />
          <Report />
        </>
      )}
    </>
  );
}

export default App;
