import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ManageProductsContext } from "./context/ManageProductsContext";
import { UserAuthContext } from "./context/authContext";
import { AddProductToCartContext } from "./context/cartContext";
import { ManageOrdersContext } from "./context/OrdersContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContext>
        <ManageOrdersContext>
          <ManageProductsContext>
            <AddProductToCartContext>
              <App />
            </AddProductToCartContext>
          </ManageProductsContext>
        </ManageOrdersContext>
      </UserAuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
