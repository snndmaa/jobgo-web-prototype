/* eslint-disable */
import React, { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../utils/auth";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const EmployerSidebarLayout: FC<Props> = ({ children, title = "Dashboard" }) => {
  const navigate = useNavigate();

  // const user = getCurrentUser();
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    logout()

    setRedirect(true);
  };

  // Navigation logic
  const getActiveClass = (url: string) => {
    return window.location.pathname === url ? "active" : "";
  };

  if (redirect) {
    navigate('/')
  }

  return (
    <React.Fragment>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <h3>{title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-xs-12">
              <div className="right-sidebar">
                <h4>Manage Account</h4>
                <ul className="list-item">
                  <li>
                    <NavLink
                      className={getActiveClass("/employer/dashboard/")}
                      to="/employer/dashboard/"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={getActiveClass("/employer/applicants/")}
                      to="/employer/applicants/"
                    >
                      Applicants
                    </NavLink>
                  </li>
                  <li>
                    <a href="#!">Change Password</a>
                  </li>
                  <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <a>Sign Out</a>
                  </li>
                </ul>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployerSidebarLayout;
