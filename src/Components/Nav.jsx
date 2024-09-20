import {
  faBars,
  faCartShopping,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibraryLogo from "../assets/Library.svg";
import React from "react";
import { Link } from "react-router-dom";

function Nav({ cartItems }) {
  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
    <div className="nav__container">
      <Link to="/">
        <img src={LibraryLogo} alt="" className="logo" />
      </Link>
      <ul className="nav__links">
        <li className="nav__list">
          <Link to="/" className="nav__link">
            Home
          </Link>
        </li>
        <li className="nav__list">
          <Link to="/books" className="nav__link">
            Books
          </Link>
        </li>
        <button className="btn__menu" onClick={openMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <li className="nav__icon">
          <Link className="nav__link" to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          {cartItems > 0 && <span className="cart__length">{cartItems}</span>}
        </li>
      </ul>
      <div className="menu__backdrop">
        <button className="btn__menu btn__menu--close" onClick={closeMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <ul className="menu__links">
          <li className="menu__list">
            <Link href="/cart" className="menu__link">
              Home
            </Link>
          </li>
          <li className="menu__list">
            <Link href="/books" className="menu__link">
              Books
            </Link>
          </li>
          <li className="menu__list">
            <Link to="/cart" className="menu__link">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
