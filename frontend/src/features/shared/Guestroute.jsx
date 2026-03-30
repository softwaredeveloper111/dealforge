import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
 import useAuth from "../auth/hooks/useAuth";

// Opposite of Protected — only for unauthenticated users
// If logged-in user tries to visit /auth/login or /auth/register → redirect to home
const GuestRoute = ({ children }) => {

const { user, isAuthChecked } = useAuth();

  // Wait until getMe resolves before making any routing decision
  if (!isAuthChecked) return <Loader />;

  // Already logged in → redirect to home
  if (user) return <Navigate to="/" replace />;

  return children;
};

export default GuestRoute;