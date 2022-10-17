import OrderListItem from "./OrderListItem";
import c from "./orders.module.css";
function OrderItem(props) {
  const ordersLength = props.order && props.order.length > 0;

  return (
    <ol className={c.ordered_list}>
      {ordersLength &&
        props.order.map((order) => {
          return <OrderListItem key={order._id} order={order} />;
        })}
    </ol>
  );
}

export default OrderItem;
