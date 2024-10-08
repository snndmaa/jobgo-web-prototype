import React, { useState, useEffect, FC } from 'react';
import Header from '../../components/Header';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ClapSpinner } from 'react-spinners-kit';
import styled from "styled-components";
import { IJob } from "../../interfaces";
import { getAppliedJobsFromLocalStorage } from '../../utils/job'; // Utility to fetch jobs from local storage

const LoadingStyle = styled.div`
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: center;
    margin-top: 25%;
  }
`;

const AppliedJobsPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<IJob[]>([]); // All jobs
  const [filteredJobs, setFilteredJobs] = useState<IJob[]>([]); // Filtered jobs
  const [status, setStatus] = useState(""); // Job status

  useEffect(() => {
    setLoading(true);
    // Fetch jobs from local storage instead of the server
    const appliedJobs = getAppliedJobsFromLocalStorage();
    setJobs(appliedJobs);
    setFilteredJobs(appliedJobs);
    setLoading(false);
  }, []);

  // Filter jobs based on the selected status
  const onFilter = () => {
    setLoading(true);
    if (["1", "2", "3"].includes(status)) {
      const filtered = jobs.filter((job: IJob) => job.applicant?.status === status);
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
    setTimeout(() => setLoading(false), 1000);
  };

  // Clear the filter and show all jobs
  const onClearFilter = () => {
    setStatus("");
    setFilteredJobs(jobs);
  };

  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>Applied Jobs</title> {/* Static page title */}
      </Helmet>

      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <h3>Applied Jobs</h3> {/* Static page heading */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="job-listings" className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xs-12">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <select className="form-control" onChange={event => setStatus(event.target.value)}>
                      <option defaultValue="">Select status</option> {/* Static filter dropdown */}
                      <option value="1">Pending</option>
                      <option value="2">Accepted</option>
                      <option value="3">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <button className="btn btn-success" onClick={onFilter}>Filter</button>
                    <button className="btn btn-primary" onClick={onClearFilter}>Clear Filter</button>
                  </div>
                </div>
              </div>

              {loading && (
                <div className="row">
                  <div className="col-md-12">
                    <LoadingStyle>
                      <h2>
                        <ClapSpinner size={160} color="#686769" loading={loading} />
                      </h2>
                    </LoadingStyle>
                  </div>
                </div>
              )}

              {!loading && filteredJobs.length === 0 && <h2>No jobs found</h2>} {/* Static no jobs message */}

              {!loading && filteredJobs.length > 0 && (
                filteredJobs.map((job: IJob) => (
                  <Link className="job-listings" to={`/jobs/${job.id}`} key={job.id}>
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-xs-12">
                        <div className="job-company-logo">
                          <img src="assets/img/features/img1.png" alt="" />
                        </div>
                        <div className="job-details">
                          <h3>{job.title}</h3>
                          <span className="company-name">{job.company_name}</span>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-12 text-center">
                        {job.filled ? (
                          <span className="btn-open">Position filled</span> /* Static message */
                        ) : (
                          <span className="btn-open">Position open</span> /* Static message */
                        )}
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                        <div className="location">
                          <i className="lni-map-marker" /> {job.location}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-12 text-right">
                        {job.type === "1" && <span className="btn-full-time">Full Time</span>}
                        {job.type === "2" && <span className="btn-full-time">Part Time</span>}
                        {job.type === "3" && <span className="btn-full-time">Internship</span>}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AppliedJobsPage;
