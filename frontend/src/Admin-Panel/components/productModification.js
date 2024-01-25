import React, { useRef } from "react";
import "./productModification.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductModification() {
  const idRef = useRef();
  const navigate = useNavigate();

  const handleClick = (btn) => {
    if (btn === "delete") {
      const deleteProduct = async () => {
        const response = await fetch(
          `https://trend-flare-apparel-store-api.vercel.app/products/${idRef.current.value}`,
          {
            method: "DELETE",
          }
        );
        const { status } = await response.json();

        console.log(status);
        if (status === "success") {
          toast.success("Product Deleted");
        } else {
          toast.error("Error deleting product");
        }
      };
      deleteProduct();
    } else {
      navigate(`/admin/modifyproduct/editproduct/${idRef.current.value}`);
    }

    idRef.current.value = "";
  };

  return (
    <div id="productModificationComponent">
      <div className="productIdModificationForm">
        <div className="idField">
          <input ref={idRef} type="text" placeholder="Enter Product ID" />
        </div>
        <div className="actionBtns">
          <button
            className="updateBtns"
            onClick={() => {
              if (idRef.current.value.length > 0) {
                handleClick("delete");
              }
            }}
          >
            Delete Product
          </button>
          <button
            onClick={() => {
              if (idRef.current.value.length > 0) {
                handleClick("update");
              }
            }}
            className="updateBtns"
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModification;
