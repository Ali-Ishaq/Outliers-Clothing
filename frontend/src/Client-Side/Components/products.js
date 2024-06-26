import "./products.css";
import ShoesData from "../Datafiles/shoesData";
import ProductUI from "./productUI";
import { useEffect, useRef, useState } from "react";
import ProductUISkeleton from "./productUISkeleton";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";

function Products({ productsDb }) {
  const [products, setProducts] = useState(null);
  const productSkeleton = ["", "", "", "", "", "", "", ""];
  const { category } = useParams();
  const productListRef = useRef();
  const productFilterRef = useRef();
  const sortArrowDirection = useRef(false);
  const arrowRef = useRef();
  const sortDrawerRef = useRef();
  const[sortValue,setSortValue]=useState('Best selling')
  // experiment

  useEffect(() => {
    const handleScroll = () => {
      if (productListRef.current.getBoundingClientRect().top - 163 <= 0) {
        productFilterRef.current.style.position = "fixed";
      } else {
        productFilterRef.current.style.position = "static";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // experiment

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

  const toggleSortArrow = (e) => {
    if (sortArrowDirection.current){
      arrowRef.current.style.transform = "";
    sortDrawerRef.current.style.display='';
    }else {
      arrowRef.current.style.transform = "rotateZ(180deg)";
      sortDrawerRef.current.style.display='flex'
    }
    sortArrowDirection.current = !sortArrowDirection.current;
  };

  const handleProductSort=(e)=>{
    setSortValue(e.target.value);

  }
  // setTimeout(()=>{
  //      setProducts(productsDb)
  //    },500)

  // console.log(products)

  return (
    <div id="products">
      <h1 className="product-category-heading">{category}</h1>

      {/* <div className="product-category">
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
      </div> */}

      <div ref={productListRef} className="products-list">
        <div className="product-list-filter-container">
          <div ref={productFilterRef} className="product-list-filter-wrapper">
            <div className="filter-container-heading">
              <h1>Filters</h1>
            </div>

            <div className="filter-types">
              <h1>Price</h1>
              <div className="price-range">
                <input type="range" />

              </div>
            </div>
            <div className="filter-types">
              <h1>Product type</h1>
            </div>
            <div className="filter-types">
              <h1>Size</h1>
            </div>
          </div>
        </div>

        <div className="product-list-items">
          <div className="product-count-sort-container">
            <h1>{products != null ? products.length : 0} products</h1>


            <div className="product-sort-container">

            <h1 onClick={toggleSortArrow} style={{color:'#1a1a1aB3'}}>
              Sort by
              <button  className="sort-btn"> {sortValue}</button>
              <svg
              ref={arrowRef}
                focusable="false"
                width="12"
                height="8"
                class="icon icon--chevron icon--inline  "
                viewBox="0 0 12 8"
              >
                <path
                  fill="none"
                  d="M1 1l5 5 5-5"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
              <div className="product-sort-drawer" ref={sortDrawerRef}>

              <button onClick={handleProductSort} value={'Featured'} className="product-sort-btns">Featured</button>
              <button onClick={handleProductSort} value={'Best selling'} className="product-sort-btns">Best selling</button>
              <button onClick={handleProductSort} value={'Alphabetically, A-Z'} className="product-sort-btns">Alphabetically, A-Z</button>
              <button onClick={handleProductSort} value={'Alphabetically, Z-A'} className="product-sort-btns">Alphabetically, Z-A</button>
              <button onClick={handleProductSort} value={'Price, low to high'} className="product-sort-btns">Price, low to high</button>
              <button onClick={handleProductSort} value={'Price, high to low'} className="product-sort-btns">Price, high to low</button>
              <button onClick={handleProductSort} value={'Date, old to new'} className="product-sort-btns">Date, old to new</button>
              <button onClick={handleProductSort} value={'Date, new to old'} className="product-sort-btns">Date, new to old</button>
              </div>
            </h1>
            </div>
          </div>

          <div className="product-card-container">
            {products
              ? products.map((details, index) => (
                  <ProductUI
                    productReviews={details.reviews}
                    key={details._id}
                    productId={details._id}
                    productImg={details.thumbnail}
                    productName={details.title}
                    productPrice={details.price}
                    productSizes={details.quantity}
                  ></ProductUI>
                ))
              : productSkeleton.map((details, index) => <ProductUISkeleton />)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
