import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import CartContext from "../../context/cartContext";
import c from "./header.module.css";

function Navigation(props) {
  const Navigate = useNavigate();
  const isLoggedInContext = useContext(AuthContext);
  const { totalQuantity } = useContext(CartContext);
  const { isNotOpen, openHamburgerMenu } = props;

  let uid;
  let isAdmin;
  if (isLoggedInContext) {
    uid = isLoggedInContext.uid;
    isAdmin = isLoggedInContext.isAdmin;
  }

  return (
    <header>
      <h1 className={c.logo}>
        <Link to="/">WDE</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {!isAdmin && (
            <li>
              <Link to="/cart">
                Cart
                <span className={c.badge}>{totalQuantity}</span>
              </Link>
            </li>
          )}
          {!isAdmin && (
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link to="admin/all-products">Manage Products</Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link to="/admin/orders"> Manage Orders</Link>
            </li>
          )}
          {!uid && (
            <li>
              <Link to="/users/signup">Signup</Link>
            </li>
          )}
          {!uid && (
            <li>
              <Link to="/users/login">Login</Link>
            </li>
          )}
          {uid && (
            <li>
              <Link to="/" onClick={isLoggedInContext.logout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <Link
        href="#"
        className={isNotOpen ? c.hamburger : `${c.hamburger} ${c.active}`}
        onClick={openHamburgerMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </Link>
    </header>
  );
}

export default Navigation;
