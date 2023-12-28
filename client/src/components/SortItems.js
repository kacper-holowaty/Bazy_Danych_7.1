import { useApp } from "../context/AppContext";

function SortItems() {
  const { state, dispatch } = useApp();
  const { sortField, sortOrder } = state;

  const handleSortFieldChange = (e) => {
    dispatch({ type: "SET_SORT_FIELD", payload: e.target.value });
  };

  const handleSortOrderChange = (e) => {
    dispatch({ type: "SET_SORT_ORDER", payload: e.target.value });
  };

  return (
    <div>
      <label>Sortuj po:</label>
      <select value={sortField} onChange={handleSortFieldChange}>
        <option value="">Wybierz...</option>
        <option value="name">Nazwa</option>
        <option value="price">Cena</option>
        <option value="quantity">Ilość</option>
      </select>

      <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="">Wybierz...</option>
        <option value="asc">Rosnąco</option>
        <option value="desc">Malejąco</option>
      </select>
    </div>
  );
}

export default SortItems;
