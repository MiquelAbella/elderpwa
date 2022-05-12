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

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const [uid, setUid] = useState(() => (storedValue ? storedValue : null));

  const [verificationCode, setVerificationCode] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicRoutes uid={uid} />}>
          <Route
            path="/"
            element={
              <Login
                setValue={setValue}
                setUid={setUid}
                setVerificationCode={setVerificationCode}
              />
            }
          />
        </Route>
        <Route path="/main" element={<ProtectedRoutes uid={uid} />}>
          <Route
            path="/main"
            element={<Main verificationCode={verificationCode} uid={uid} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
