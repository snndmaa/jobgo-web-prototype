/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";
import { Link } from "react-router-dom";
import moment from 'moment';
import { IApplicant, IUser } from "../../interfaces";
import { Grid } from "react-loader-spinner";
import { getApplicantsFromStorage } from "../../utils/job";

const ApplicantsPage: FC = () => {
  const [applicants, setApplicants] = useState<IApplicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use dummy data if no applicants are found in local storage
    const dummyApplicants: IApplicant[] = [
      {
        id: 1,
        job_id: 101,
        applied_user: { first_name: "John", last_name: "Doe" } as IUser,
        job: { id: 101, title: "Software Engineer", location: "Remote" },
        status: "Pending",
        comment: "Excited about this opportunity",
        created_at: new Date(),
      },
      {
        id: 2,
        job_id: 102,
        applied_user: { first_name: "Jane", last_name: "Smith" } as IUser,
        job: { id: 102, title: "Product Manager", location: "New York" },
        status: "Accepted",
        comment: "Looking forward to joining the team",
        created_at: new Date(),
      },
    ];

    // Check local storage for applicants, else use dummy data
    const storedApplicants = getApplicantsFromStorage();
    setApplicants(storedApplicants.length > 0 ? storedApplicants : dummyApplicants);
    setLoading(false);
  }, []);

  const getFullname = (user: IUser) => `${user.first_name} ${user.last_name}`;

  const onUpdateApplicant = (applicant: IApplicant, type: string) => (event: React.MouseEvent) => {
    const updatedApplicants = applicants.map(a =>
      a.id === applicant.id ? { ...a, status: type === "accept" ? "Accepted" : "Rejected" } : a
    );
    setApplicants(updatedApplicants);
    localStorage.setItem("applicants", JSON.stringify(updatedApplicants)); // Update local storage
  };

  return (
    <BaseLayout title={'Applicants'}>
      <EmployerSidebarLayout title={'Applicants'}>
        {loading && (
          <div className="col-lg-9 col-md-9 col-xs-12">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <Grid color="#00BFFF" height={100} width={100} />
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <div className="col-lg-9 col-md-9 col-xs-12">
            <div className="job-alerts-item candidates">
              <h3 className="alerts-title">Manage Applicants</h3>
              <div className="alerts-list">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-xs-12">
                    <p>Name</p>
                  </div>
                  <div className="col-lg-3 col-md-5 col-xs-12">
                    <p>Job title</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-xs-12">
                    <p>Status</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-xs-12">
                    <p>Applied at</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-xs-12">
                    <p>Actions</p>
                  </div>
                </div>
              </div>
              {applicants.map(applicant => (
                <React.Fragment key={applicant.id}>
                  <div className="alerts-content">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-xs-12">
                        <h3>
                          <Link to={`/jobs/${applicant.job_id}`}>{getFullname(applicant.applied_user)}</Link>
                        </h3>
                      </div>
                      <div className="col-lg-3 col-md-3 col-xs-12">
                        <h3>
                          <Link to={`/jobs/${applicant.job_id}`}>{applicant.job.title}</Link>
                        </h3>
                        <span className="location">
                          <i className="lni-map-marker" /> {applicant.job.location}
                        </span>
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-12">
                        <p>{applicant.status}</p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-12">
                        <p>{moment(applicant.created_at).format('DD-MM-YYYY hh:mm:ss A')}</p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-12">
                        {applicant.status === 'Pending' && (
                          <>
                            <button onClick={onUpdateApplicant(applicant, "accept")} className="btn btn-primary btn-xs mr-2">
                              <i className="fa fa-check" aria-hidden="true" />
                            </button>
                            <button onClick={onUpdateApplicant(applicant, "reject")} className="btn btn-danger btn-xs">
                              <i className="fa fa-window-close" aria-hidden="true" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <p><strong>Comment:</strong> {applicant.comment}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </EmployerSidebarLayout>
    </BaseLayout>
  );
};

export default ApplicantsPage;
