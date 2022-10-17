import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import CartContext from "../../context/cartContext";
import c from "./header.module.css";

function Aside({ isNotOpen, openHamburgerMenu }) {
  const isLoggedInContext = useContext(AuthContext);
  const { totalQuantity } = useContext(CartContext);

  let uid;
  let isAdmin;
  if (isLoggedInContext) {
    uid = isLoggedInContext.uid;
    isAdmin = isLoggedInContext.isAdmin;
  }

  return (
    <aside
      className={isNotOpen ? c.sideDrawer : `${c.sideDrawer}  ${c.active}`}
    >
      <nav>
        <ul>
          <li onClick={openHamburgerMenu}>
            <Link to="/">Home</Link>
          </li>

          {!isAdmin && (
            <li onClick={openHamburgerMenu}>
              <Link to="/cart" style={{ marginLeft: "1rem" }}>
                Cart
                <span className={c.badge}>{totalQuantity}</span>
              </Link>
            </li>
          )}
          {!isAdmin && (
            <li onClick={openHamburgerMenu}>
              <Link to="/orders">Orders</Link>
            </li>
          )}
          {isAdmin && (
            <li onClick={openHamburgerMenu}>
              <Link to="admin/all-products">Manage Products</Link>
            </li>
          )}
          {isAdmin && (
            <li onClick={openHamburgerMenu}>
              <Link to="/admin/orders"> Manage Orders</Link>
            </li>
          )}
          {!uid && (
            <li onClick={openHamburgerMenu}>
              <Link to="/users/signup">Signup</Link>
            </li>
          )}
          {!uid && (
            <li onClick={openHamburgerMenu}>
              <Link to="/users/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;
