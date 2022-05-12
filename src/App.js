import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./router/ProtectedRoutes";
import { PublicRoutes } from "./router/PublicRoutes";

import { Login } from "./components/login/Login";
import { Main } from "./components/main/Main";

function App() {
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

  const [uid, setUid] = useState(() =>
    getCookie("uid") ? getCookie("uid") : null
  );

  const [verificationCode, setVerificationCode] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicRoutes uid={uid} />}>
          <Route
            path="/"
            element={
              <Login
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
