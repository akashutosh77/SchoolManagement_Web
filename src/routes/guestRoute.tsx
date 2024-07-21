import React from 'react';
import { IGuestRouteProps } from './IRoutes';



export const GuestRoute: React.FC<IGuestRouteProps> = ({ component: Component }) => {
  return <Component />;
};


