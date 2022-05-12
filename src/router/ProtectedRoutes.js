import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ uid }) => {
  const useAuth = () => {
    return uid ? true : false;
  };

  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};
