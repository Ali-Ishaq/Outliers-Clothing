import React from "react";
import { useFormik } from "formik";
import { addProductSchema } from "./formSchemas/addProductformSchema";
import "./addproduct.css";
function AddProduct() {
  const uploadProduct = async (product) => {
    const response = await fetch(
      "https://outliers-clothing-api.vercel.app/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );

    console.log(response);
  };

  const initialValues = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {
        console.log(values);
        uploadProduct(values);
      },
    });

  console.log(errors);

  return (
    <div id="addProductComp">
      <form action="" id="productdetails">
        <h1 style={{ marginBottom: "50px" }}>Add a Product</h1>
        <div id="productTitle" className="inputFieldDiv">
          <p className="fieldHeading">Product Title</p>
          <input
            id="productTitleInput"
            onChange={handleChange}
            onBlur={handleBlur}
            name="title"
            value={values.title}
            type="text"
          />
          <p className="errorMsg">
            {errors.title && touched.title ? errors.title : null}
          </p>
        </div>

        <div id="productPrice" className="inputFieldDiv">
          <p className="fieldHeading">Product Price</p>
          <input
            id="productPriceInput"
            onChange={handleChange}
            onBlur={handleBlur}
            name="price"
            value={values.price}
            type="number"
          />
          <p className="errorMsg">
            {" "}
            {errors.price && touched.price ? errors.price : null}
          </p>
        </div>

        <div id="productDescription" className="inputFieldDiv">
          <p className="fieldHeading">Product Description</p>
          {/* <input
            id="productDescriptionInput"
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
            value={values.description}
            type="text"
          /> */}

          <textarea
            id="productDescriptionInput"
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
            value={values.description}
            maxLength="200"
            placeholder="Write Something ..."
          ></textarea>

          <p className="errorMsg">
            {errors.description && touched.description
              ? errors.description
              : null}
          </p>
        </div>

        <div id="productThumbnail" className="inputFieldDiv">
          <p className="fieldHeading">Product Thumbnail</p>
          <input
            id="productThumbnailInput"
            onChange={handleChange}
            onBlur={handleBlur}
            name="thumbnail"
            value={values.thumbnail}
            type="text"
          />
          <p className="errorMsg">
            {errors.thumbnail && touched.thumbnail ? errors.thumbnail : null}
          </p>
        </div>

        <button id="AddProductBtn" type="submit" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

// title: { type: String, required: true },
// description: String,
// price: Number,
// discountPercentage: Number,
// brand: String,
// category: String,
// thumbnail: { type: String, required: true },
