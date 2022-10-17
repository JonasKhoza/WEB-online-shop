import { useState, useContext } from "react";

import CartContext from "../../context/cartContext";
import c from "./cart.module.css";

function CartItem(props) {
  const { updateProduct } = useContext(CartContext);

  const product = props.product;
  const [newQuantity, setNewQuantity] = useState(product.quantity);
  function onChange(event) {
    const { value } = event.target;
    setNewQuantity(value);
  }

  const productTotalPrice = product.totalPrice.toFixed(2);
  const productPrice = product.product.price.toFixed(2);
  function updateCartItems() {
    updateProduct(product.product._id, newQuantity);
  }
  return (
    <li>
      <article className={c.cart_item}>
        <div className={c.cart_item_info}>
          <h2>{product.product.title}</h2>
          <p>
            R{productTotalPrice}
            <span className={c.item_price}>({productPrice})</span>
          </p>
        </div>
        <div className={c.cart_item_management}>
          <input
            type="number"
            onChange={onChange}
            value={newQuantity}
            required
          />
          <button className="btn alt-reset" onClick={updateCartItems}>
            Update
          </button>
        </div>
      </article>
    </li>
  );
}

export default CartItem;
