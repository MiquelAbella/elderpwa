import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PublicRoutes = ({ uid }) => {
  const useAuth = () => {
    return uid ? true : false;
  };

  const auth = useAuth();

  return auth ? <Navigate to="/main" /> : <Outlet />;
};
