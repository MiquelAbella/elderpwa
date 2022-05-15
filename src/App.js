import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./router/ProtectedRoutes";
import { PublicRoutes } from "./router/PublicRoutes";

import { Login } from "./components/login/Login";
import { Main } from "./components/main/Main";

function App() {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem("uid");

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem("uid", JSON.stringify(""));
        return "";
      }
    } catch (err) {
      return "";
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem("uid", JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  const [storedPhone, setStoredPhone] = useState(() => {
    try {
      const value = window.localStorage.getItem("phone");

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem("phone", JSON.stringify(""));
        return "";
      }
    } catch (err) {
      return "";
    }
  });

  const setPhoneValue = (newValue) => {
    try {
      window.localStorage.setItem("phone", JSON.stringify(newValue));
    } catch (err) {}
    setStoredPhone(newValue);
  };

  const [uid, setUid] = useState(() => (storedValue ? storedValue : null));

  const [verificationCode, setVerificationCode] = useState(null);

  const [phone, setPhone] = useState(() => (storedPhone ? storedPhone : null));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicRoutes uid={uid} />}>
          <Route
            path="/"
            element={
              <Login
                setPhone={setPhone}
                setValue={setValue}
                setPhoneValue={setPhoneValue}
                setUid={setUid}
                setVerificationCode={setVerificationCode}
              />
            }
          />
        </Route>
        <Route path="/main" element={<ProtectedRoutes uid={uid} />}>
          <Route
            path="/main"
            element={
              <Main
                verificationCode={verificationCode}
                uid={uid}
                phone={phone}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
