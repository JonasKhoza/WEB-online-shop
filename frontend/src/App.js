import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminAllProducts from "./pages/admin/AdminAllProducts";
import AddNewProduct from "./pages/admin/AddNewProduct";
import UpdateProduct from "./components/product/updateProduct";
import OrdersPlaced from "./pages/admin/OrdersPlaced";
import Home from "./pages/client/Home";
import ProductDetails from "./pages/client/product/ProductDetails";
import Signup from "./pages/client/Signup";
import Login from "./pages/client/Login";
import Cart from "./pages/client/cart";
import Orders from "./pages/client/Orders";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/all-products" element={<AdminAllProducts />} />
        <Route path="/admin/all-products/new" element={<AddNewProduct />} />
        <Route path="/admin/all-products/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<OrdersPlaced />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
      </Routes>
    </Layout>
    // <header>

    // </header>
  );
}

export default App;
