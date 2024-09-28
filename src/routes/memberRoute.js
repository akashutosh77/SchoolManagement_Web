import React from "react"
import { Navigate } from "react-router-dom"

export const MemberRoute = ({ component: Component, isUserLoggedIn }) => {
  return isUserLoggedIn ? <Component /> : <Navigate to="/login" />
}
