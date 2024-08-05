import React from "react";
import { Form, Field, useFormik, Formik, FieldArray } from "formik";
import { addProductSchema } from "./formSchemas/addProductformSchema";
import { toast } from "react-toastify";
import "./addproduct.css";

AddProduct.defaultProps = {
  initialValues: {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    category: "",
    images: [],
    quantity: [],
  },

  handleSubmitFunction: async (product) => {
    const response = await fetch(
      "https://outliers-clothing-api.vercel.app/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );

    const { status } = await response.json();

    if (status === "success") {
      toast.success("Product Uploaded");
    } else {
      toast.error("Error Uploading Product");
    }
  },
};

function AddProduct({ initialValues, handleSubmitFunction }) {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addProductSchema,
      onSubmit: (values) => {
        console.log(values);
        handleSubmitFunction(values);
      },
    });

  return (
    <div id="addProductComp">
      <Formik>
        <Form action="" id="productdetails">
          <h1
            className="addProductFormHeading"
            style={{ marginBottom: "50px" }}
          >
            Add a Product
          </h1>

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

          <div id="productPriceDiv" className="inputFieldDiv">
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

          <div id="stock-quantity">
            <div id="product-quantity" className="inputFieldDiv">
              <p className="fieldHeading">XS :</p>
              <input
                id="productQuantity"
                onChange={handleChange}
                onBlur={handleBlur}
                name="quantity[0]"
                value={values.quantity[0]}
                type="number"
              />
            </div>

            <div id="product-quantity" className="inputFieldDiv">
              <p className="fieldHeading">S :</p>
              <input
                id="productQuantity"
                onChange={handleChange}
                onBlur={handleBlur}
                name="quantity[1]"
                value={values.quantity[1]}
                type="number"
              />
            </div>

            <div id="product-quantity" className="inputFieldDiv">
              <p className="fieldHeading">M :</p>
              <input
                id="productQuantity"
                onChange={handleChange}
                onBlur={handleBlur}
                name="quantity[2]"
                value={values.quantity[2]}
                type="number"
              />
            </div>

            <div id="product-quantity" className="inputFieldDiv">
              <p className="fieldHeading">L :</p>
              <input
                id="productQuantity"
                onChange={handleChange}
                onBlur={handleBlur}
                name="quantity[3]"
                value={values.quantity[3]}
                type="number"
              />
            </div>

            <div id="product-quantity" className="inputFieldDiv">
              <p className="fieldHeading">XL :</p>
              <input
                id="productQuantity"
                onChange={handleChange}
                onBlur={handleBlur}
                name="quantity[4]"
                value={values.quantity[4]}
                type="number"
              />
            </div>

            <p className="sizeError">
              {errors.size && touched.size ? errors.size[0] : null}
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
              maxLength="1500"
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

          <div
            id="extraImages"
            className="inputFieldDiv"
            style={{ height: "auto", marginBottom: "15px" }}
          >
            <p className="fieldHeading">Extra Images </p>
            <input
              id="extraImages"
              onChange={handleChange}
              onBlur={handleBlur}
              name="images[0]"
              value={values.images[0]}
              type="text"
              style={{ height: "35px" }}
            />
            <p className="errorMsg">
              {errors.images && touched.images ? errors.images : null}
            </p>
          </div>

          <div
            id="extraImages"
            className="inputFieldDiv"
            style={{ height: "35px", marginBottom: "15px" }}
          >
            <input
              id="extraImages"
              onChange={handleChange}
              onBlur={handleBlur}
              name="images[1]"
              value={values.images[1]}
              type="text"
              style={{ height: "100%" }}
            />
            <p className="errorMsg">
              {errors.images && touched.images ? errors.images : null}
            </p>
          </div>

          <div
            id="extraImages"
            className="inputFieldDiv"
            style={{ height: "35px", marginBottom: "15px" }}
          >
            <input
              id="extraImages"
              onChange={handleChange}
              onBlur={handleBlur}
              name="images[2]"
              value={values.images[2]}
              type="text"
              style={{ height: "100%" }}
            />
            <p className="errorMsg">
              {errors.images && touched.images ? errors.images : null}
            </p>
          </div>

          <div
            id="extraImages"
            className="inputFieldDiv"
            style={{ height: "35px", marginBottom: "15px" }}
          >
            <input
              id="extraImages"
              onChange={handleChange}
              onBlur={handleBlur}
              name="images[3]"
              value={values.images[3]}
              type="text"
              style={{ height: "100%" }}
            />
            <p className="errorMsg">
              {errors.images && touched.images ? errors.images : null}
            </p>
          </div>

          <div
            id="extraImages"
            className="inputFieldDiv"
            style={{ height: "35px", marginBottom: "25px" }}
          >
            <input
              id="extraImages"
              onChange={handleChange}
              onBlur={handleBlur}
              name="images[4]"
              value={values.images[4]}
              type="text"
              style={{ height: "100%" }}
            />
            <p className="errorMsg">
              {errors.images && touched.images ? errors.images : null}
            </p>
          </div>

          <div
            id="category"
            className="inputFieldDiv"
            style={{ height: "40px", marginBottom: "15px" }}
          >
            <p className="fieldHeading">Product Category</p>

            <Field
              as="select"
              onChange={handleChange}
              onBlur={handleBlur}
              id="category"
              className="category"
              style={{ height: "100%" }}
              name="category"
              value={values.category}
            >
              <option value="" label="Select an option" />
              <option value="Sneakers" label="Sneakers" />
              <option value="Tees" label="Tees" />
              <option value="Watches" label="Watches" />
              <option value="Casual" label="Casual" />
            </Field>
            <p className="errorMsg">
              {errors.category && touched.category ? errors.category : null}
            </p>
          </div>

          <button id="AddProductBtn" type="submit" onClick={handleSubmit}>
            Upload
          </button>
        </Form>
      </Formik>
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
