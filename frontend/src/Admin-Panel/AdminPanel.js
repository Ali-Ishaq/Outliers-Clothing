import "./AdminPanel.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/addProduct";
import ViewOrders from "./components/viewOrders";
import OrderDetails from "./components/orderDetails";
import AdminLogIn from "./components/adminLogIn";
import { useEffect, useState } from "react";
import NavigationPage from "./components/navigationPage";
import { ToastContainer } from "react-toastify";
import EditProduct from "./components/editProduct";
import ProductModification from "./components/productModification";

function AdminPanel() {
  const [access, setAccess] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(
        "https://outliers-clothing-api.vercel.app/users/checkauthadmin",
        { credentials: "include" }
      );
      const { permission, status } = await response.json();

      setAccess(permission);
      console.log(permission, status);
    };

    checkAuth();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
      {access != null ? (
        <Routes>
          <Route
            exact
            path="/"
            element={
              access ? (
                <NavigationPage
                  acess={access}
                  setAccess={setAccess}
                ></NavigationPage>
              ) : (
                <h1>ACCESS DENIED</h1>
              )
            }
          />
          <Route
            exact
            path="/addproduct"
            element={
              access ? (
                <AddProduct acess={access}></AddProduct>
              ) : (
                <h1>ACCESS DENIED</h1>
              )
            }
          />
          <Route
            exact
            path="/vieworders"
            element={
              access ? (
                <ViewOrders acess={access}></ViewOrders>
              ) : (
                <h1>ACCESS DENIED</h1>
              )
            }
          />
          <Route
            exact
            path="/vieworders/:id"
            element={
              access ? (
                <OrderDetails acess={access}></OrderDetails>
              ) : (
                <h1>ACCESS DENIED</h1>
              )
            }
          />
          <Route
            exact
            path="/modifyproduct/editproduct/:id"
            element={
              access ? (
                <EditProduct acess={access}></EditProduct>
              ) : (
                <h1>ACCESS DENIED</h1>
              )
            }
          />
          <Route
            exact
            path="/modifyproduct"
            element={
              access ? (
                <ProductModification acess={access}></ProductModification>
              ) : (
                <h1>ACCESS DENIED</h1>
              )
            }
          />
        </Routes>
      ) : (
        <h1>Loading</h1>
      )}
      <ToastContainer />
    </div>
  );
}

export default AdminPanel;
