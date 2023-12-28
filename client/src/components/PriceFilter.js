import { useApp } from "../context/AppContext";

function PriceFilter() {
  const { state, dispatch } = useApp();
  const { minPrice, maxPrice } = state;

  const handleSetMinPrice = (e) => {
    dispatch({ type: "SET_MIN_PRICE", payload: e.target.value });
  };

  const handleSetMaxPrice = (e) => {
    dispatch({ type: "SET_MAX_PRICE", payload: e.target.value });
  };

  return (
    <div>
      <label>Wyszukaj po cenie:</label>
      <input
        type="number"
        placeholder="Min cena"
        value={minPrice}
        onChange={handleSetMinPrice}
      />
      <input
        type="number"
        placeholder="Max cena"
        value={maxPrice}
        onChange={handleSetMaxPrice}
      />
    </div>
  );
}

export default PriceFilter;
