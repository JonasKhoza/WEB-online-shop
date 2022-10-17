import { useContext } from "react";
import CartContext from "../../context/cartContext";
import AuthContext from "../../context/authContext";
import OrdersContext from "../../context/OrdersContext";
import CartItem from "./cartItem";

import c from "./cart.module.css";

function Cart() {
  const OrderContxt = useContext(OrdersContext);

  const { uid } = useContext(AuthContext);
  const CartContxt = useContext(CartContext);
  const { cart, totalPrice, loading, error } = CartContxt;

  const TotalPrice = totalPrice && totalPrice.toFixed(2);

  return loading ? (
    <p style={{ marginTop: "3rem" }}>Loading...</p>
  ) : error ? (
    <p style={{ marginTop: "3rem" }}>{error}</p>
  ) : (
    <main className={c.main}>
      <h1>Your Cart</h1>

      <ul className={c.cart_items}>
        {cart &&
          cart.map((product) => {
            return <CartItem key={product.product._id} product={product} />;
          })}
      </ul>
      <div className={c.cart_total}>
        <p>Total: {TotalPrice}</p>
        {uid && cart && cart.length > 0 ? (
          <button className="btn" onClick={OrderContxt.addOrder}>
            Buy Products
          </button>
        ) : (
          <p className={c.login}>
            Login to proceed or add items to your cart first if logged in
          </p>
        )}
      </div>
    </main>
  );
}

export default Cart;
