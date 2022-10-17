import { useState, useContext } from "react";

import AuthContext from "../../context/authContext";
import OrdersContext from "../../context/OrdersContext";

import c from "./orders.module.css";

function OrderListItem(props) {
  const { isAdmin } = useContext(AuthContext);
  const { setRefresh } = useContext(OrdersContext);

  const order = props.order;

  const [value, setValue] = useState({
    status: order.status,
  });

  const date = new Date(order.date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function onChange(event) {
    const { name, value } = event.target;
    setValue({ [name]: value });
  }

  async function updateStatus(event) {
    event.preventDefault();
    await fetch(`http://localhost:5000/admin/orders/${order._id}`, {
      method: "PATCH",
      body: JSON.stringify({ newStatus: value.status }),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });

    setRefresh((prevV) => {
      return prevV + 1;
    });
  }

  //   async function updateStatus(event) {
  //     event.preventDefault();
  //     const res = await fetch(`/admin/orders/${order._id}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({ newStatus: value.status }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     if (data.success) {
  //       setRefresh((prevV) => {
  //         return prevV + 1;
  //       });

  //       Navigate("/admin/orders");
  //     }
  //   }

  return (
    <li>
      <article className={c.order_Item}>
        <header className={c.order_summary}>
          <h2>
            <span className={c.order_item_summary}>
              R{order.productData.totalPrice.toFixed(2)} -
            </span>
            {date}
          </h2>
          <p>
            <span className={c.badge}>{order.status.toUpperCase()}</span>
          </p>
        </header>

        <section className={c.order_details}>
          {isAdmin && (
            <address>
              <p>
                <a href={`maito:${order.userData.email}`}>
                  {order.userData.fullName}
                </a>
              </p>
              <p>
                {order.userData.address.street}({order.userData.address.postal}
                )(
                {order.userData.address.city})
              </p>
            </address>
          )}

          <ul>
            {
              //not admin
            }
            {order.productData.items.map((product) => {
              return (
                <li key={product.product._id}>
                  {product.product.title}
                  (R{product.totalPrice}) (R{product.product.price} x
                  {product.quantity})
                </li>
              );
            })}
          </ul>
        </section>
        {isAdmin && (
          <section className={c.order_actions}>
            <form id="form">
              {
                // to be used when submitting this form to update(PATCH) the order
              }
              <select onChange={onChange} value={value.status} name="status">
                <option value="pending">Pending</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="btn alt-reset" onClick={updateStatus}>
                Update
              </button>
            </form>
          </section>
        )}
      </article>
    </li>
  );
}

export default OrderListItem;
