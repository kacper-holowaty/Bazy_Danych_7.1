import { useApp } from "../context/AppContext";

function NameFilter() {
  const { state, dispatch } = useApp();
  const { nameFilter } = state;

  const handleNameFilter = (e) => {
    dispatch({ type: "NAME_FILTER", payload: e.target.value });
  };

  return (
    <div>
      <label>Wyszukaj po nazwie:</label>
      <input
        type="text"
        placeholder="Wpisz nazwę"
        value={nameFilter}
        onChange={handleNameFilter}
      />
    </div>
  );
}

export default NameFilter;
