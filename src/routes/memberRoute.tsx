import React from 'react';
import { Navigate } from 'react-router-dom';
import { IMemberRouteProps } from './IRoutes';



export const MemberRoute: React.FC<IMemberRouteProps> = ({ component: Component, isUserLoggedIn }) => {
  return isUserLoggedIn ? <Component /> : <Navigate to="/login" />;
};

