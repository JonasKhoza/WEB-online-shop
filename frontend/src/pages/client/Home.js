import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import c from "../../components/product/product.module.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const AuthContxt = useContext(AuthContext);

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

          AuthContxt.setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getAuth();
  }, [AuthContxt.refresh]);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/", {
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
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getProducts();
  }, []);

  return (
    <main>
      <h1>All products</h1>
      <p>A list of all products</p>
      {loading ? (
        <p style={{ marginTop: "3rem" }}>Loading...</p>
      ) : error ? (
        <p style={{ marginTop: "3rem" }}>{error}</p>
      ) : (
        <ul className={c.products_grid}>
          {products.map((product) => {
            return (
              <li key={product._id}>
                <article className={c.product_details}>
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.title}
                  />
                  <div className={c.product_item_content}>
                    <h2>{product.title}</h2>
                    <div className={c.product_items_actions}>
                      <Link to={`/${product._id}`} className="btn alt-reset">
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Home;
