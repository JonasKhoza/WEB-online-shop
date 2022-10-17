import { useContext, useState } from "react";
import OrdersContext from "../../context/OrdersContext";
import { useEffect } from "react";
import OrdersItem from "../../components/orders/OrdersItem";

function Orders() {
  const { refresh, addOrder } = useContext(OrdersContext);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    try {
      async function fetchUserOrders() {
        const res = await fetch("http://localhost:5000/orders/user", {
          method: "GET",
          headers: {
            accept: "*/*",
          },
          mode: "cors",
          credentials: "include",
        });
        setLoading(false);
        if (res.ok) {
          const orders = await res.json();
          setOrder(orders.orders);
        }
      }
      fetchUserOrders();
    } catch (error) {
      setError(error.message);
    }
  }, [refresh, addOrder]);

  return loading ? (
    <p style={{ marginTop: "3rem" }}>Loading...</p>
  ) : error ? (
    <p style={{ marginTop: "3rem" }}>{error}</p>
  ) : (
    <main>
      <h1>All your orders</h1>
      {order && order.length > 0 ? (
        <OrdersItem order={order} />
      ) : (
        <p>You have zero order history</p>
      )}
    </main>
  );
}

export default Orders;
