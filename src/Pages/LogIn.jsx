import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init";

function LogIn({ user, setUser }) {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userEmail && userPassword) {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          console.log(userCredential.user);
          setUser(userCredential.user);
          navigate("/");
          alert("Signed in!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          alert("Failed sign in: " + errorMessage);
        });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <main className="registerMain">
      <section className="pageSection loginFormContainer">
        <form
          className="loginForm formContainer"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className="sectionTitle formTitle">Returning User Log In</h2>
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
              Log In
            </button>
            <button
              className="formBtn formBtnSecondary"
              type="button"
              onClick={handleRegister}
            >
              Sign up
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LogIn;
