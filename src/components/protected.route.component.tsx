import React from "react";
import { Navigate } from "react-router-dom";

// Define a custom component for protected routes
interface ProtectedRouteProps {
  children: React.ReactNode; // Or a more specific type based on your app's needs
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expires_at");

  if (!token || (expiresAt && new Date(expiresAt) < new Date())) {
    // Token is not present or has expired
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("expires_at"); // Remove expiration date
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
