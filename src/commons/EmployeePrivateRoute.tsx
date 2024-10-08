import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../utils/auth';

const EmployeePrivateRoute: FC = () => {

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!getCurrentUser() || getCurrentUser().role !== 'employee') {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Render the child route component
};

export default EmployeePrivateRoute;
