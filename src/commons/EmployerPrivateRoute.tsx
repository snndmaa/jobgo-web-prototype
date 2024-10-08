import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../utils/auth';

const EmployerPrivateRoute: FC = () => {

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!getCurrentUser() || getCurrentUser().role !== 'employer') {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Renders the child route component
};

export default EmployerPrivateRoute;
