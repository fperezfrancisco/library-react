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
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import UserProfile from "./Pages/UserProfile";
import { auth, db } from "./firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

function App() {
  const [userCartObj, setUserCartObj] = useState();
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getCartByUid(uid) {
    const cartCollectionRef = await query(
      collection(db, "carts"),
      where("userId", "==", uid)
    );
    const { docs } = await getDocs(cartCollectionRef);
    const dataCarts = docs.map((doc) => doc.data());
    if (dataCarts.length === 1) {
      console.log(dataCarts[0]);
      setUserCartObj(dataCarts[0]);
    } else {
      console.log("No cart to set for user cart");
    }
  }

  function createCart() {
    const currCart = {
      itemTotal: totalQuantity,
      cartList: cart,
      userId: user.uid,
    };
    addDoc(collection(db, "carts"), currCart);
  }

  function addToCart(book) {
    console.log("add to cart: " + book.title);
    console.log(cart);
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
    console.log(user);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
    });

    if (user) {
      getCartByUid(user.uid);
    }

    if (userCartObj) {
      setCart(userCartObj.cartList);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [cart, user, loading]);

  return (
    <>
      <BrowserRouter basename="/library-react/">
        <Nav
          cartItems={totalQuantity}
          user={user}
          loading={loading}
          setLoading={setLoading}
        />
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
          <Route
            path="/register"
            element={
              <SignUp user={user} setUser={setUser} createCart={createCart} />
            }
          />
          <Route
            path="/login"
            element={
              <LogIn
                user={user}
                setUser={setUser}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/userprofile"
            element={
              <UserProfile
                user={user}
                cart={cart}
                setUser={setUser}
                createCart={createCart}
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
