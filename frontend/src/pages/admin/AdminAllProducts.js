import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import ProductsContext from "../../context/ManageProductsContext";
import AuthContext from "../../context/authContext";

//add an error component
function AdminAllProducts() {
  const { isAdmin } = useContext(AuthContext);
  const productsContxt = useContext(ProductsContext);
  const deleteProduct = productsContxt.deleteProduct;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAuth() {
      try {
        const res = await fetch("http://localhost:5000/users/isAuth", {
          headers: {
            accept: "*/*",
          },
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();

          if (data.message) return;
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getAuth();
  }, []);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/admin/all-products", {
          headers: {
            accept: "*/*",
          },
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        setLoading(false);
        if (res.ok) {
          const products = await res.json();
          setProducts(products.products);
        } else {
          const error = await res.json();
          setError(error.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getProducts();
  }, [deleteProduct]);

  return isAdmin ? (
    <div>
      <h1>Products Admnistration</h1>
      <section>
        <h2>Manage Products</h2>
        <p>
          <Link to="/admin/all-products/new" className="btn">
            Add product
          </Link>
        </p>
      </section>

      <section>
        {loading ? (
          <p style={{ marginTop: "3rem" }}>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ProductCard products={products} />
        )}
      </section>
    </div>
  ) : (
    <div>
      <h1 id="heading">Not Authorized!</h1>
      <p>Need to be admin to access this page!</p>
    </div>
  );
}

export default AdminAllProducts;
