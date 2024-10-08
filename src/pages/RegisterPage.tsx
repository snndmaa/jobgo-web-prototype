import React, { useState } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { addToast } = useToasts();
  const navigate = useNavigate();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setSubmitted(true);

    if (!email || !password || !password2 || !gender || !role) {
      alert("All fields are required");
      setSubmitted(false);
      return;
    }

    if (password !== password2) {
      alert("Passwords do not match");
      setSubmitted(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user: any) => user.email === email);

    if (userExists) {
      alert("User with this email already exists");
      setSubmitted(false);
      return;
    }

    const newUser = { email, password, gender, role };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // Store the currently logged-in user
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setSubmitted(false);
    addToast("Registered successfully", { appearance: "success" });
    if (newUser.role) navigate('/employer/dashboard')
    navigate("/"); // Redirect to dashboard or a protected route
  };

  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <h3>Register</h3>
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
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-icon">
                      <i className="lni-lock" />
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-icon">
                      <select
                        className="form-control"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-icon">
                      <select
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="">Select role</option>
                        <option value="employee">Employee</option>
                        <option value="employer">Employer</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary log-btn" disabled={submitted}>
                    {submitted ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        Loading...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
                <ul className="form-links">
                  <li className="text-center">
                    <NavLink to="/login">Already have an account?</NavLink>
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

export default RegisterPage;
