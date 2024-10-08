import { FC } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import Jumbotron from "./Jumbotron";
import { getCurrentUser, isAuthenticated, logout } from "../utils/auth";

const Header: FC = () => {
//   console.log()
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getFullName = () => {
    return `${user.email}`;
  };

  return (
    <header id="home" className="hero-area">
      <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
        <div className="container">
          <div className="theme-header clearfix d-flex justify-content-between align-items-center">
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main-navbar"
                aria-controls="main-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
                <span className="lni-menu" />
                <span className="lni-menu" />
                <span className="lni-menu" />
              </button>
              <NavLink className="navbar-brand" style={{ fontWeight: "bold" }} to="/">
                JobGo Web
              </NavLink>
            </div>

            {/* Wallet Button */}
            <div className="wallet-button-wrapper ml-auto">
              <WalletModalProvider>
                <WalletMultiButton />
              </WalletModalProvider>
            </div>

            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav mr-auto w-100 justify-content-end">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                </li>

                {!isAuthenticated() && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                  </>
                )}

                {isAuthenticated() && user.role === 'employee' && (
                  <>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Candidates
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink className="dropdown-item" to='/applied-jobs'>Applied jobs</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {getFullName()}
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink className="dropdown-item" to='/edit-profile'>Edit Profile</NavLink>
                        </li>
                        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                          <a className='dropdown-item'>Logout</a>
                        </li>
                      </ul>
                    </li>
                  </>
                )}

                {isAuthenticated() && user.role === "employer" && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Employers
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to='/employer/dashboard/'>Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to='/employer/applicants/'>Applicants</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to='/post-job'>Post a Job</NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" onClick={handleLogout}>Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                )}
                <li className="button-group">
                  <NavLink className="button btn btn-common" to='/post-job/'>Post a Job</NavLink>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Language
                  </a>
                  <ul className="dropdown-menu">
                    <li style={{ cursor: 'pointer' }}>
                      <a className="dropdown-item">English</a>
                    </li>
                    <li style={{ cursor: 'pointer' }}>
                      <a className="dropdown-item">Bengali</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {['/'].includes(window.location.pathname) ? <Jumbotron /> : ''}
    </header>
  );
};

export default Header;
