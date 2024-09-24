import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/init";
import { useNavigate } from "react-router-dom";

function UserProfile({ user, setUser }) {
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

  return (
    <main className="userProfileMain">
      <section className="userProfileHeader">
        <h1>User Profile</h1>
        <p className="userEmail">{user.email}</p>
      </section>
      <section className="userProfileOptions">
        <ul className="userProfileList">
          <li>
            <button className="primaryBtn btn" onClick={handleLogout}>
              Logout
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
