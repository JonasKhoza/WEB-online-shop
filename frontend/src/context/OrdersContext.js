import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrdersContext = createContext({
  orders: [],
});

export function ManageOrdersContext(props) {
  const [refresh, setRefresh] = useState(0);

  const Navigate = useNavigate();
  async function addOrder() {
    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    if (res.ok) {
      Navigate("/orders");
    }
  }

  const context = {
    refresh: refresh,
    setRefresh: setRefresh,
    addOrder: addOrder,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export default OrdersContext;
