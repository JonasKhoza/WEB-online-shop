import { useEffect, useState, useContext } from "react";
import OrdersContext from "../../context/OrdersContext";
import OrderItem from "../../components/orders/OrdersItem";

function OrdersPlaced() {
  const { refresh } = useContext(OrdersContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/orders/all-orders");
        setLoading(false);

        if (res.ok) {
          const orders = await res.json();
          if (orders && orders.orders.length > 0) {
            setOrders(orders.orders);
          }
        }
      } catch (error) {
        setError(error.message);
      }
    }
    fetchOrders();
  }, [refresh]);

  return (
    <main>
      <h1>All your orders</h1>
      {loading ? (
        <p style={{ marginTop: "3rem" }}>Loading...</p>
      ) : error ? (
        <p style={{ marginTop: "3rem" }}>{error}</p>
      ) : (
        <OrderItem order={orders} />
      )}
    </main>
  );
}

export default OrdersPlaced;
