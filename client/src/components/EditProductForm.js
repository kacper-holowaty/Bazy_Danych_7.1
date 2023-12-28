import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const EditProductForm = ({ productId, onEditProduct, onCancelEdit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      unit: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Pole wymagane"),
      price: Yup.number().required("Pole wymagane"),
      description: Yup.string().required("Pole wymagane"),
      quantity: Yup.number().required("Pole wymagane"),
      unit: Yup.string().required("Pole wymagane"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:5000/products/${productId}`, values);

        onEditProduct();
      } catch (error) {
        console.error("Błąd podczas edycji produktu:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>Edytuj produkt</h3>
      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <span style={{ color: "red" }}>{formik.errors.name}</span>
        )}
      </div>

      <div>
        <label>Cena:</label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price && (
          <span style={{ color: "red" }}>{formik.errors.price}</span>
        )}
      </div>

      <div>
        <label>Opis:</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description && (
          <span style={{ color: "red" }}>{formik.errors.description}</span>
        )}
      </div>

      <div>
        <label>Ilość:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
        />
        {formik.touched.quantity && formik.errors.quantity && (
          <span style={{ color: "red" }}>{formik.errors.quantity}</span>
        )}
      </div>

      <div>
        <label>Jednostka miary:</label>
        <input
          type="text"
          id="unit"
          name="unit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.unit}
        />
        {formik.touched.unit && formik.errors.unit && (
          <span style={{ color: "red" }}>{formik.errors.unit}</span>
        )}
      </div>

      <button type="submit">Zapisz zmiany</button>
      <button type="button" onClick={onCancelEdit}>
        Anuluj
      </button>
    </form>
  );
};

export default EditProductForm;
