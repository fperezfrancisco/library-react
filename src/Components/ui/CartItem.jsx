import React, { useState } from "react";

function CartItem({ bookObj, itemRemoved, idRemove, itemUpdate }) {
  const [currBook, setCurrBook] = useState(bookObj.book);
  const [currQuantity, setCurrQuantity] = useState(bookObj.quantity);

  const handleQuantityUpdate = (newNumber) => {
    //update cart quantity
    itemUpdate(newNumber, bookObj.id);
    setCurrQuantity(newNumber);
  };

  const handleRemove = () => {
    console.log("Item removed.");
    itemRemoved(true);
    idRemove(currBook.id);
  };

  return (
    <div className="cart__item">
      <div className="cart__book">
        <img src={currBook.url} alt="" className="cart__book--img" />
        <div className="cart__book--info">
          <span className="cart__book--title">{currBook.title}</span>
          <span className="cart__book--price">
            ${(currBook.salePrice || currBook.originalPrice).toFixed(2)}
          </span>
          <button className="cart__book--remove" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
      <div className="cart__quantity">
        <input
          type="number"
          min={1}
          max={99}
          className="cart__input"
          value={currQuantity}
          onChange={(e) => handleQuantityUpdate(e.target.value)}
        />
      </div>
      <div className="cart__total">
        $
        {(
          (currBook.salePrice || currBook.originalPrice) * currQuantity
        ).toFixed(2)}
      </div>
    </div>
  );
}

export default CartItem;
