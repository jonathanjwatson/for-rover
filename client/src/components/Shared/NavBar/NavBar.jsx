import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {props.isLoggedIn ? (
            <li onClick={props.logOutUser}>
              <a href="#">Sign Out</a>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
