import { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import Landing from "./Components/Landing";
import Highlights from "./Components/Highlights";
import Featured from "./Components/Featured";
import Discounted from "./Components/Discounted";
import Explore from "./Components/Explore";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import { books } from "./data";
import BookInfo from "./Pages/BookInfo";
import Cart from "./Pages/Cart";

function App() {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  function addToCart(book) {
    console.log("add to cart: " + book.title);
    const newCart = cart;
    if (cart === undefined || cart.length === 0) {
      const newElement = { id: book.id, book: book, quantity: 1 };
      newCart.push(newElement);
      setCart(newCart);
    } else {
      const foundElement = cart.find((element) => +element.id === book.id);
      if (foundElement) {
        foundElement.quantity += 1;
        console.log(foundElement);
        const filteredCart = newCart.filter(
          (element) => +element.id !== +book.id
        );
        filteredCart.push(foundElement);
        setCart(filteredCart);
      } else {
        const newElement = { id: book.id, book: book, quantity: 1 };
        newCart.push(newElement);
        setCart(newCart);
      }
    }
    const newQuantity = totalQuantity + 1;
    console.log("new quantity is: " + newQuantity);
    updateQuantity(newQuantity);
    console.log(cart);
  }

  function updateQuantity(total) {
    setTotalQuantity(total);
    console.log(totalQuantity);
  }

  function updateCart(removedId) {
    console.log(removedId);
    const newCart = cart.filter((element) => +element.id !== +removedId);
    const newNumber = newCart
      .map((element) => element.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    console.log(newCart);
    console.log(newNumber);
    updateQuantity(newNumber);
    setCart(newCart);
  }

  function updateItemInCart(itemQuantity, id) {
    const updatedCart = cart.map((element) => {
      if (+element.id === +id) {
        return { ...element, quantity: +itemQuantity };
      } else {
        return element;
      }
    });
    console.log(updatedCart);
    const newNumber = updatedCart
      .map((element) => element.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    console.log(newNumber);
    updateQuantity(newNumber);
    console.log(updatedCart);
    setCart(updatedCart);
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <BrowserRouter basename="/library-react/">
        <Nav cartItems={totalQuantity} />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={<BookInfo books={books} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                books={books}
                cart={cart}
                updateCart={updateCart}
                updateQuantity={updateQuantity}
                updateItemCart={updateItemInCart}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
