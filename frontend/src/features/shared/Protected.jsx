import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
  import useAuth from "../auth/hooks/useAuth";

const Protected = ({ children }) => {

  const { user, isAuthChecked } = useAuth();

  // Wait until getMe resolves before making any routing decision
  if (!isAuthChecked) return <Loader />;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default Protected;