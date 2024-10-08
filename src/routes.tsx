import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployerPrivateRoute from "./commons/EmployerPrivateRoute";
import PostJobPage from "./pages/employer/PostJobPage";
import AppliedJobsPage from "./pages/employee/AppliedJobsPage";
import EmployeePrivateRoute from "./commons/EmployeePrivateRoute";
import EditProfilePage from "./pages/employee/EditProfilePage";
import DashboardPage from "./pages/employer/DashboardPage";
import ApplicantsPage from "./pages/employer/ApplicantsPage";
import ApplicantsPerJobPage from "./pages/employer/ApplicantsPerJobPage";
import Test from "./pages/Test";

const BaseRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<Test />}/>
        
        {/* Employer routes */}
        <Route element={<EmployerPrivateRoute />}>
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/employer/dashboard" element={<DashboardPage />} />
          <Route path="/employer/applicants" element={<ApplicantsPage />} />
          <Route path="/employer/applicants/:job_id" element={<ApplicantsPerJobPage />} />
        </Route>

        {/* Employee routes */}
        <Route element={<EmployeePrivateRoute />}>
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/applied-jobs" element={<AppliedJobsPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default BaseRouter;
