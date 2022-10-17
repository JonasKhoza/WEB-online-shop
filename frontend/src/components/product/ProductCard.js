import ProductItem from "./ProductItem";
import c from "./product.module.css";

function ProductCard(props) {
  return (
    props.products && (
      <ul className={c.products_grid}>
        {props.products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </ul>
    )
  );
}

export default ProductCard;
