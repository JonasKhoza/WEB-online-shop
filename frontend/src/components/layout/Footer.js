import React from "react";
import { Link } from "react-router-dom";
import "./footer.module.css";
import c from "./footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={c.first_footer}>
        <h1 className={c.logo}>
          <Link to="/">WDE</Link>
        </h1>
        <p className={c.quote}>
          Customer service, <br />
          our priority
        </p>
      </div>
      <hr
        className={c.hr}
        style={{
          height: "2px",
          borderWidth: "0",
          color: "gray",
        }}
      />
      <address>
        <div className={c.time}>
          <h4>Whatsapp: +27 78 374 5889</h4>
          <p>Every Day: 08:00 - 16:00pm</p>
        </div>
        <div className={c.social_media}>
          <ul>
            <li>
              <Link to="">
                <img src="/images/facebook.png" alt="Facebook Icon" />
              </Link>
            </li>
            <li>
              <Link to="">
                <img src="/images/instagram.png" alt="Instagram Icon" />
              </Link>
            </li>
            <li>
              <Link to="">
                <img src="/images/linkedin.png" alt="LinkedIn Icon" />
              </Link>
            </li>
          </ul>
          <p className={c.privacy_statement}>
            &copy;{`WEB ${new Date().getFullYear()}`} -{" "}
            <a target="_blank" href="">
              Privacy Statement
            </a>
          </p>
        </div>
      </address>
    </footer>
  );
}

export default Footer;
