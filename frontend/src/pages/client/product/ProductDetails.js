import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CartContext from "../../../context/cartContext";
import AuthContext from "../../../context/authContext";
import c from "./productDetails.module.css";

function ProductDetails() {
  const CartContxt = useContext(CartContext);
  const { isAdmin } = useContext(AuthContext);
  const Navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    setLoading(true);
    async function getProduct() {
      try {
        const res = await fetch(`http://localhost:5000/${params.id}`);
        setLoading(false);
        if (res.ok) {
          const product = await res.json();
          setProduct(product.product);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
    getProduct();
  }, [params.id]);

  function addToCart() {
    CartContxt.addProductToCart(product._id);
    Navigate(`/${params.id}`);
  }

  return loading ? (
    <p style={{ marginTop: "3rem" }}>Loading...</p>
  ) : error ? (
    <p style={{ marginTop: "3rem" }}>{error}</p>
  ) : (
    <main className={c.product_details}>
      <header>
        <img
          src={product.image && `http://localhost:5000/${product.image}`}
          alt={product.title}
        />
        <div className={c.product_info}>
          <h1>{product.title}</h1>
          <p>R{product.price}</p>
          {!product.instock ? (
            <p className={c.out_of_stock}>Out Of Stock</p>
          ) : (
            !isAdmin && (
              <button className="btn alt-reset" onClick={addToCart}>
                Add to cart
              </button>
            )
          )}
        </div>
      </header>
      <p className={c.product_description}>{product.description}</p>
    </main>
  );
}

export default ProductDetails;
