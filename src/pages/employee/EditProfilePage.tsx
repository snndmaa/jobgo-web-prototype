import React, { FC, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";
import { useToasts } from "react-toast-notifications"; // Toast notification for success/failure messages
import { getProfileFromLocalStorage, updateProfileInLocalStorage } from '../../utils/profile'; // Utility functions for profile handling
import { getCurrentUser } from "../../utils/auth"

const EditProfilePage: FC = () => {
  const [gender, setGender] = useState(''); // Gender field state
  const [firstName, setFirstName] = useState(''); // First name field state
  const [lastName, setLastName] = useState(''); // Last name field state
  const [submitted, setSubmitted] = useState(false); // Flag to show submission status
  const user = getCurrentUser(); 
  const { addToast } = useToasts(); // Notification for success/error messages

  // Fetch and set the user profile data from local storage
  useEffect(() => {
    const profile = getProfileFromLocalStorage(user.id);
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setGender(profile.gender);
    }
  }, [user.id]);

  // Handle form submission to update profile in local storage
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSubmitted(true); // Set form submission state to true

    if (!firstName || !lastName || !gender) {
      alert('All fields are required'); // Display alert if fields are missing
      setSubmitted(false);
      return;
    }

    const updatedProfile = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
    };

    // Update the profile in local storage
    try {
      updateProfileInLocalStorage(updatedProfile);
      addToast('Profile updated successfully', { appearance: 'success' }); // Show success message
    } catch (err) {
      addToast('Error updating profile', { appearance: 'error' }); // Show error message
    } finally {
      setSubmitted(false); // Reset submission state
    }
  };

  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>Edit Profile</title> {/* Page title */}
      </Helmet>

      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <h3>Edit Profile</h3> {/* Page heading */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="job-listings" className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 col-xs-12">
              <div className="page-login-form box">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        placeholder="First name"
                        value={firstName} // First name input field
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Last name"
                        value={lastName} // Last name input field
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-icon">
                      <select
                        className="form-control"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender} // Gender select dropdown
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" hidden={submitted} className="btn btn-primary log-btn">
                    Update profile
                  </button>
                  <button type="submit" hidden={!submitted} className="btn btn-primary log-btn">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    Loading...
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default EditProfilePage;
