import React, { useEffect, useState } from "react";
import "./editProduct.css";
import AddProduct from "./addProduct";
import ProductUI from "../../Client-Side/Components/productUI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://outliers-clothing-api.vercel.app/products/${id}`
      );
      const { data } = await response.json();
      setProduct(data);
      console.log(data);
    };
    fetchProduct();
  }, []);

  const editProduct = async (product) => {
    const response = await fetch(
      `https://outliers-clothing-api.vercel.app/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );

    const { status, updatedProduct } = await response.json();

    if (status === "success") {
      console.log(updatedProduct);
      toast.success("Product Updated");
    } else {
      toast.error("Error Updating Product");
    }
  };

  return (
    <div className="editProductCompParent">
      <h1 className="edit-product-heading">Edit Product</h1>
      {product ? (
        <div id="editProductComp">
          <div className="editProductCard">
            <ProductUI
              productReviews={product.reviews}
              key={product._id}
              productId={product._id}
              productImg={product.thumbnail}
              productName={product.title}
              productPrice={product.price}
              productSizes={product.quantity}
            />
          </div>
          <div className="editProductForm">
            <AddProduct
              initialValues={{
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                category: product.category,
                images: [
                  product.images[0],
                  product.images[1],
                  product.images[2],
                  product.images[3],
                  product.images[4],
                ],
                quantity: [
                  product.quantity[0],
                  product.quantity[1],
                  product.quantity[2],
                  product.quantity[3],
                  product.quantity[4],
                ],
              }}
              handleSubmitFunction={editProduct}
            ></AddProduct>
          </div>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}

export default EditProduct;
