import { useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Aside from "./Aside";

function Layout(props) {
  const [isNotOpen, setIsNotOpen] = useState(true);
  function openHamburgerMenu() {
    setIsNotOpen((prev) => !prev);
  }

  const layout = {
    height: "100%",
  };
  return (
    <div style={layout}>
      <Navigation openHamburgerMenu={openHamburgerMenu} isNotOpen={isNotOpen} />
      <Aside isNotOpen={isNotOpen} openHamburgerMenu={openHamburgerMenu} />
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
