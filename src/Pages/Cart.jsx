import React, { useEffect, useState } from "react";
import CartItem from "../Components/ui/CartItem";
import emptyCart from "../assets/empty_cart.svg";
import { Link } from "react-router-dom";

function Cart({ books, cart, updateCart, updateItemCart }) {
  const [itemRemoved, setItemRemoved] = useState(false);
  const [idRemove, setIdRemove] = useState();
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  //const [currCart, setCurrCart] = useState(cart);

  useEffect(() => {
    if (itemRemoved) {
      updateCart(idRemove);
      setItemRemoved(false);
    }
    //total amounts
    updatePrices();
  }, [itemRemoved, cart]);

  function updatePrices() {
    //update subtotal based on cart
    let newSubtotal = 0;
    if (cart.length > 0) {
      const cartTotals = cart.map(
        (element) =>
          element.quantity *
          (element.book.salePrice || element.book.originalPrice)
      );
      newSubtotal = cartTotals.reduce((acc, curr) => acc + curr);
    }
    console.log(newSubtotal);
    setCartSubtotal(newSubtotal);
    setTaxes(newSubtotal * 0.105);
    setCartTotal(newSubtotal + newSubtotal * 0.105);
  }

  function itemUpate(number, id) {
    return updateItemCart(number, id);
  }

  return (
    <div id="books__body">
      <main className="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Total</span>
              </div>
              {cart.length > 0 ? (
                <div className="cart__body">
                  {cart &&
                    cart.map((bookObj) => (
                      <CartItem
                        bookObj={bookObj}
                        itemRemoved={setItemRemoved}
                        idRemove={setIdRemove}
                        itemUpdate={itemUpate}
                        key={bookObj.id}
                      />
                    ))}
                </div>
              ) : (
                <div className="cart__empty">
                  <img src={emptyCart} alt="" className="cart__empty--img" />
                  <h2>You don't have any books in your cart! </h2>
                  <Link to="/books">
                    <button className="btn">Browse books</button>
                  </Link>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="total">
                <div className="total__item total__sub-total">
                  <span>Subtotal</span>
                  <span>$ {cartSubtotal.toFixed(2)} </span>
                </div>
                <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="btn btn__checkout no-cursor">
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;
