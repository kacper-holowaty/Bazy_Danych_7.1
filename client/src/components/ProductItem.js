import React, { useState } from "react";
import axios from "axios";
import EditProductForm from "./EditProductForm";
import { useApp } from "../context/AppContext";

export default function ProductItem({ product }) {
  const { handleEditProduct } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    handleEditProduct();
  };

  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/${product._id}`
      );
      console.log(response.data.message);
      handleEditProduct();
    } catch (error) {
      console.error("Błąd podczas usuwania produktu:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <EditProductForm
          productId={product._id}
          onEditProduct={handleEditSuccess}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>Cena: {product.price}</p>
          <p>Opis: {product.description}</p>
          <p>Ilość: {product.quantity}</p>
          <p>Jednostka miary: {product.unit}</p>
          <button onClick={handleEditClick}>Edytuj</button>
          <button onClick={handleDeleteClick}>Usuń</button>
        </>
      )}
    </div>
  );
}
