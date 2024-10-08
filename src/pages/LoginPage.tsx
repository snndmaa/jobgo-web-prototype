import React, { useState, useRef, useEffect, FC } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { isAuthenticated } from "../utils/auth"; // Use helper functions for auth

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToasts();
  const _isMounted = useRef(true);
  const navigate = useNavigate();  // useNavigate replaces history.push

  useEffect(() => {
    return () => { // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setSubmitted(true);

    if (!email || !password) {
      setSubmitted(false);
      alert('All fields are required');
      return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (user) {
      // Store the currently logged-in user
      localStorage.setItem('currentUser', JSON.stringify(user));

      addToast('Logged in successfully', { appearance: 'success', autoDismiss: true });
      setSubmitted(false);
      if (_isMounted.current) {
        navigate('/');  // Redirect using navigate
      }
    } else {
      addToast('Login failed: Invalid credentials', { appearance: 'error', autoDismiss: true });
      setSubmitted(false);
    }
  };

  // If already authenticated, redirect to home page
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <h3>Login</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="content" className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 col-xs-12">
              <div className="page-login-form box">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-icon">
                      <i className="lni-user" />
                      <input
                        type="email"
                        id="sender-email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-icon">
                      <i className="lni-lock" />
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Keep Me Signed In
                    </label>
                  </div>
                  <button type="submit" hidden={submitted} className="btn btn-primary log-btn">
                    Login
                  </button>
                  <button type="submit" hidden={!submitted} className="btn btn-primary log-btn">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    Loading...
                  </button>
                </form>
                <ul className="form-links">
                  <li className="text-center">
                    <NavLink to="/register">Don't have an account?</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LoginPage;
