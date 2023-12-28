import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "../context/AppContext";

const AddProductForm = () => {
  const { handleAddProduct } = useApp();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      unit: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nazwa produktu jest wymagana"),
      price: Yup.number()
        .required("Cena jest wymagana")
        .positive("Cena musi być dodatnia"),
      description: Yup.string().required("Opis nie może być pusty"),
      quantity: Yup.number()
        .required("Pole ilość jest wymagane")
        .positive("Ilość musi być dodatnia"),
      unit: Yup.string().required("Pole jest wymagane!"),
    }),
    onSubmit: (values) => {
      handleAddProduct(values);
      formik.handleReset();
      console.log("Produkt został dodany");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div>
        <label>Nazwa produktu:</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <span style={{ color: "red" }}>{formik.errors.name}</span>
        )}
      </div>
      <div>
        <label>Cena:</label>
        <input
          type="number"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.price && formik.errors.price && (
          <span style={{ color: "red" }}>{formik.errors.price}</span>
        )}
      </div>
      <div>
        <label>Opis:</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && (
          <span style={{ color: "red" }}>{formik.errors.description}</span>
        )}
      </div>
      <div>
        <label>Ilość:</label>
        <input
          type="number"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.quantity && formik.errors.quantity && (
          <span style={{ color: "red" }}>{formik.errors.quantity}</span>
        )}
      </div>
      <div>
        <label>Jednostka miary:</label>
        <input
          type="text"
          name="unit"
          value={formik.values.unit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.unit && formik.errors.unit && (
          <span style={{ color: "red" }}>{formik.errors.unit}</span>
        )}
      </div>
      <div>
        <button type="submit">Dodaj produkt</button>
        <button type="reset">Zresetuj</button>
      </div>
    </form>
  );
};

export default AddProductForm;
