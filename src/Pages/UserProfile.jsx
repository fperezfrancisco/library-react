import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/init";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { query, collection, where, getDocs } from "firebase/firestore";

function UserProfile({ user, setUser, createCart, cart }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("setting open modal to true");
    setOpenModal(true);
  };

  const handleConfirmLogout = () => {
    setOpenModal(false);
    //logout user
    signOut(auth)
      .then((resp) => {
        setUser(null);
        alert("Signed out successfully.");
        navigate("/");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleCreateCart = () => {
    createCart();
  };

  const handleViewCart = () => {
    console.log("user id: " + user.uid);
    console.log("Entered call back function.");
    getCartByUid(user.uid);
  };

  async function getCartById(id) {
    const docRef = doc(db, "carts", id);
    const docSnap = await getDoc(docRef);
    console.log("Entered firebase function");
    if (docSnap.exists()) {
      console.log("Doc snap exists");
      const userCartObj = docSnap.data();
      console.log(userCartObj);
      setUserCart(userCartObj.cartList);
    }
  }

  async function getCartByUid(uid) {
    const cartCollectionRef = await query(
      collection(db, "carts"),
      where("userId", "==", uid)
    );
    const { docs } = await getDocs(cartCollectionRef);
    const dataCarts = docs.map((doc) => doc.data());
    if (dataCarts.length === 1) {
      console.log(dataCarts[0]);
      setUserCart(dataCarts[0]);
    } else {
      console.log("No cart to set for uesr cart");
    }
  }

  useEffect(() => {
    console.log(user);
    console.log(cart);
  }, [user, cart]);

  return (
    <main className="userProfileMain">
      <section className="userProfileHeader">
        <h1>User Profile</h1>
        <p className="userEmail">{user && user.email}</p>
        <p className="userCartItems">{cart && cart.length}</p>
      </section>
      <section className="userProfileOptions">
        <ul className="userProfileList">
          <li>
            <button className="primaryBtn btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
          <li>
            <button className="primaryBtn btn" onClick={handleCreateCart}>
              Create Cart
            </button>
          </li>
        </ul>
      </section>
      {openModal && (
        <div className="modal logoutModal">
          <h2>Are you sure you want to sign out?</h2>
          <div className="modalBtnContainer">
            <button className="btn" onClick={closeModal}>
              No, don't sign me out
            </button>
            <button className="btn confirmBtn" onClick={handleConfirmLogout}>
              Yes, sign me out
            </button>
          </div>
          <div className="cancelBtn" onClick={closeModal}>
            Cancel
          </div>
        </div>
      )}
    </main>
  );
}

export default UserProfile;
