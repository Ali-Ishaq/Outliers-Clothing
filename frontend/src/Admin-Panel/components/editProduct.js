import React, { useEffect, useState } from "react";
import "./editProduct.css";
import AddProduct from "./addProduct";
import ProductUI from "../../Client-Side/Components/productUI";
import { toast} from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";



function EditProduct() {




  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const {id}=useParams()
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://192.168.0.129:3000/products/${id}`
      );
      const { data } = await response.json();
      setProduct(data);
      console.log(data);
    };
    fetchProduct();
  }, []);



  const editProduct=async (product) => {
    const response = await fetch(`http://192.168.0.129:3000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),

    });

    const {status,updatedProduct}=await response.json()
    
    if(status==='success'){
      console.log(updatedProduct)
      toast.success('Product Updated')
    }else{
      toast.error('Error Updating Product')
    }
  }


  return (
    
    <div className="editProductCompParent" >
    <h1 className="edit-product-heading">Edit Product</h1>
    {product ?(<div id="editProductComp">
      <div className="editProductCard">
         
          <ProductUI
            productReviews={product.reviews}
            key={product._id}
            productId={product._id}
            productImg={product.thumbnail}
            productName={product.title}
            productPrice={product.price}
          />
        
      </div>
      <div className="editProductForm">
        <AddProduct
          initialValues={{
            title :product.title,
            description:product.description ,
            price: product.price ,
            thumbnail: product.thumbnail,
            category: product.category,
          } }
          handleSubmitFunction={editProduct}

          
        ></AddProduct>
      </div>
    </div>):(<h1></h1>)}
    </div>
  );
}

export default EditProduct;
