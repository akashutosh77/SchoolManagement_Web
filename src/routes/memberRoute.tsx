import React from 'react';
import { Navigate } from 'react-router-dom';
import { IMemberRouteProps } from './IRoutes';



export const MemberRoute: React.FC<IMemberRouteProps> = ({ component: Component }) => {
  const isAuthenticated = true /* your authentication logic here */

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

