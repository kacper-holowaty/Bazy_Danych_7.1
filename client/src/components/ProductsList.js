import ProductItem from "./ProductItem";
import { useApp } from "../context/AppContext";

export default function ProductsList() {
  const { state } = useApp();
  const { products } = state;
  return (
    <>
      <h2>Produkty w sklepie z elektroniką:</h2>
      <ul>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </ul>
    </>
  );
}
