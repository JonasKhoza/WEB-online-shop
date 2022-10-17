import { useState, useEffect, createContext, useContext } from "react";

import OrdersContext from "./OrdersContext";

const CartContext = createContext({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
});
export function AddProductToCartContext(props) {
  const { addOrder } = useContext(OrdersContext);

  const [cart, setCart] = useState({});
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = {
    loading: loading,
    error: error,
    cart: cart.items,
    totalQuantity: cart.totalQuantity,
    totalPrice: cart.totalPrice,
    setCart: setCart,
    addProductToCart: addProductToCart,
    updateProduct: updateProduct,
  };

  async function addProductToCart(id) {
    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    if (res.ok) {
      const cartItem = await res.json();
      console.log(cartItem);
    }
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }

  useEffect(() => {
    setLoading(true);

    try {
      async function getCart() {
        const res = await fetch("http://localhost:5000/cart/items", {
          headers: {
            accept: "*/*",
          },
          method: "GET",
          mode: "cors",
          credentials: "include",
        });
        setLoading(false);
        if (res.ok) {
          const cart = await res.json();

          if (cart.cartItem) {
            setCart(cart.cartItem);
          } else {
            setCart({ items: [], totalQuantity: 0, totalPrice: 0 });
          }
        }
      }
      getCart();
    } catch (error) {
      setError(error.message);
    }
  }, [count, update, addOrder]);

  async function updateProduct(id, newQuantity) {
    const res = await fetch("http://localhost:5000/cart", {
      method: "PATCH",
      body: JSON.stringify({ productId: id, newQuantity: newQuantity }),
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setUpdate((prevV) => {
      return prevV + 1;
    });
  }

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
