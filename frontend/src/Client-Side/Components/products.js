import "./products.css";
import ShoesData from "../Datafiles/shoesData";
import ProductUI from "./productUI";
import { useEffect, useState } from "react";
import ProductUISkeleton from "./productUISkeleton";
import { useParams } from "react-router-dom";

function Products({ productsDb }) {
  const [products, setProducts] = useState(null);
  const productSkeleton = ["", "", "", "", "", "", "", ""];
  const { category } = useParams();

  useEffect(() => {
    console.log();
    const getProductsFromDb = async () => {
      try {
        const res = await fetch(
          `http://192.168.0.129:3000/products/category/${category}`
        );
        const { fetchedProducts } = await res.json();
        console.log(fetchedProducts);

        setProducts(fetchedProducts);
        console.log(fetchedProducts[0].reviews);
      } catch (err) {
        console.log("Error Fetching your Data");
      }
    };
    getProductsFromDb();
  }, []);

  const handleSort = (e) => {
    console.log(e);
    switch (e.target.value) {
      case "alphabetically":
        setProducts((prev) => {
          const sortedProducts = [...prev];
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
          return sortedProducts;
        });
        break;
      case "ascending":
        setProducts((prev) => {
          const sortedProducts = [...prev];
          sortedProducts.sort((a, b) => a.price - b.price);
          return sortedProducts;
        });
        break;

      case "descending":
        console.log(e.target.value);
        setProducts((prev) => {
          const sortedProducts = [...prev];
          sortedProducts.sort((a, b) => b.price - a.price);
          // console.log(products.reviews.rating)
          return sortedProducts;
        });
        break;

      case "review":
        setProducts((prev) => {
          const sortedProducts = [...prev];
          sortedProducts.sort((a, b) => b.reviews.rating - a.reviews.rating);
          return sortedProducts;
        });
        break;

      default:
        console.log("no case matched");
        break;
    }
  };

  // setTimeout(()=>{
  //      setProducts(productsDb)
  //    },500)

  // console.log(products)

  return (
    <div id="products">
      <div className="product-category">
        <h1>{category}</h1>

        <select
          name="sort"
          id="sort"
          onChange={(e) => {
            if (products) {
              handleSort(e);
            }
          }}
        >
          <option value="alphabetically">Alphabetically : A-Z</option>
          <option value="ascending">Price : Low to High</option>
          <option value="descending">Price : High to Low</option>
          <option value="review">Best Rated</option>
        </select>
      </div>

      <div className="products-list">
        {products
          ? products.map((details, index) => (
              <ProductUI
                productReviews={details.reviews}
                key={details._id}
                productId={details._id}
                productImg={details.thumbnail}
                productName={details.title}
                productPrice={details.price}
              ></ProductUI>
            ))
          : productSkeleton.map((details, index) => <ProductUISkeleton />)}
      </div>
    </div>
  );
}
export default Products;
