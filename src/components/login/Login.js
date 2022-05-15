import React, { useState } from "react";

import axios from "axios";
import "./login.css";
import Swal from "sweetalert2";

export const Login = ({ setUid, setVerificationCode, setValue }) => {
  const [loginValues, setLoginValues] = useState({
    lemail: "",
    lpassword: "",
  });
  const [registerValues, setRegisterValues] = useState({
    remail: "",
    rpassword: "",
  });

  const [showLogin, setShowLogin] = useState(true);

  const handleLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://elderpalmira.herokuapp.com/api/auth/loginUser",
        loginValues
      )
      .then((res) => {
        if (res.data.ok === true) {
          console.log(res.data.user);
          setValue(res.data.user.uid);
          document.cookie = `uid=${res.data.user.uid}`;
          setVerificationCode(res.data.user.verificationCode);
          setTimeout(() => {
            setUid(res.data.user.uid);
          }, 1000);
        } else {
          Swal.fire(res.data.msg, "", "info");
        }
      });
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://elderpalmira.herokuapp.com/api/auth/createUser",
        registerValues
      )
      .then((res) => {
        if (res.data.ok === true) {
          document.cookie = `uid=${res.data.uid}`;
          setVerificationCode(res.data.verificationCode);
          setTimeout(() => {
            setUid(res.data.uid);
          }, 500);
        } else {
          Swal.fire(res.data.msg, "", "info");
        }
      });
  };

  return (
    <div className="elder-login">
      <h1 className="app-name">Palmira</h1>
      <h1 className="app-slogan">
        El teu assistent el teu suport <br />
        fet pels teus pels qui t'estimen
      </h1>
      {showLogin ? (
        <form className="elder-form" onSubmit={handleLoginSubmit}>
          <h1>Entra</h1>
          <input
            autoComplete="username"
            type="text"
            name="lemail"
            value={loginValues.lemail}
            onChange={handleLoginChange}
            placeholder="Email del cuidador"
          />
          <input
            autoComplete="current-password"
            type="password"
            name="lpassword"
            value={loginValues.lpassword}
            onChange={handleLoginChange}
            placeholder="Clau"
          />
          <button type="submit">Entra</button>
          <p
            onClick={() => {
              setShowLogin(!showLogin);
            }}
          >
            No tens compte?
          </p>
        </form>
      ) : (
        <form className="elder-form" onSubmit={handleRegisterSubmit}>
          <h1>Registra't</h1>
          <input
            type="text"
            name="remail"
            value={registerValues.remail}
            onChange={handleRegisterChange}
            placeholder="Email del cuidador"
          />
          <input
            type="password"
            name="rpassword"
            value={registerValues.rpassword}
            onChange={handleRegisterChange}
            placeholder="Clau"
          />
          <button type="submit">Registra't</button>
          <p
            onClick={() => {
              setShowLogin(!showLogin);
            }}
          >
            Ja tens compte?
          </p>
        </form>
      )}
    </div>
  );
};
