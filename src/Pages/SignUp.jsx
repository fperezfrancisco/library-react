import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/init";
import { query, collection, where, getDocs } from "firebase/firestore";

function SignUp({ user, setUser, createCart }) {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userEmail && userPassword) {
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed up
          console.log(userCredential.user);
          setUser(userCredential.user);
          navigate("/userprofile");
          alert("New User Created!");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Oops! Something went wrong: " + errorMessage);
          console.log(errorMessage);
          // ..
        });
    }
  };

  const handleCreateCart = () => {
    createCart();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    console.log("user: " + user);
  }, []);

  return (
    <main className="registerMain">
      <section className="pageSection registerFormContainer">
        <form
          className="registerForm formContainer"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className="sectionTitle formTitle">New User Sign Up</h2>
          <ul className="formList">
            <li className="formLi">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                className="formInput emailInput"
                required
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </li>
            <li className="formLi">
              <label htmlFor="password">Password: </label>
              <input
                required
                type="password"
                id="password"
                className="formInput passwordInput"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </li>
          </ul>
          <div className="formBtnContainer">
            <button className="formBtn formBtnPrimary" type="submit">
              Sign Up
            </button>
            <button
              className="formBtn formBtnSecondary"
              type="button"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
