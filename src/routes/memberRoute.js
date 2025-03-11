import React from "react"
import { Navigate } from "react-router-dom"
import { useInactivityTimer } from "../hooks/useInactivityTimer"

export const MemberRoute = ({ component: Component, isUserLoggedIn }) => {
  // Initialize inactivity timer for authenticated routes
  useInactivityTimer();
  
  return isUserLoggedIn ? <Component /> : <Navigate to="/login" />
}
