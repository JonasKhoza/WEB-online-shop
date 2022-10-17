import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductsContext from "../../context/ManageProductsContext";
import c from "./product.module.css";

function ProductItem(props) {
  const productsContxt = useContext(ProductsContext);
  const deleteProduct = productsContxt.deleteProduct;
  return (
    <li>
      <article className={c.product_details}>
        <img
          src={`http://localhost:5000/${props.product.image}`}
          alt={props.product.title}
        />
        <div className={c.product_item_content}>
          <h2>{props.product.title}</h2>
          <div className={c.product_items_actions}>
            <Link
              to={`/admin/all-products/${props.product._id}`}
              className={`button ${c.edit}`}
            >
              View & Edit
            </Link>

            <button
              className={`button ${c.edit}`}
              onClick={() => {
                deleteProduct(props.product._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}

export default ProductItem;
