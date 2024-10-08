import React, { FC, useEffect, useState } from "react";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import AcceptRejectModal from "../../components/modals/AcceptRejectModal";
import { IApplicant, IUser } from "../../interfaces";
import { Grid } from 'react-loader-spinner';

// Utility function to get applicants from local storage
const getApplicantsFromStorage = (jobId: string): IApplicant[] => {
    const storedApplicants = localStorage.getItem("applicants");
    if (storedApplicants) {
        const applicants: IApplicant[] = JSON.parse(storedApplicants);
        return applicants.filter(applicant => applicant.job_id.toString() === jobId);
    }
    return [];
};

// Dummy data for applicants
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
        job_id: 101,
        applied_user: { first_name: "Jane", last_name: "Smith" } as IUser,
        job: { id: 101, title: "Software Engineer", location: "Remote" },
        status: "Accepted",
        comment: "Looking forward to joining the team",
        created_at: new Date(),
    },
    // Add more dummy applicants as needed
];

const ApplicantsPerJobPage: FC = () => {
    const [applicants, setApplicants] = useState<IApplicant[]>([]);
    const [loading, setLoading] = useState(true);
    const [acceptModalShow, setAcceptModalShow] = useState(false);
    const [type, setType] = useState('');
    const [applicant, setApplicant] = useState<IApplicant>({} as IApplicant);
    const { job_id } = useParams<{ job_id: string }>();

    useEffect(() => {
        // Retrieve applicants from local storage or use dummy data
        const storedApplicants = getApplicantsFromStorage(job_id);
        setApplicants(storedApplicants.length > 0 ? storedApplicants : dummyApplicants.filter(app => app.job_id.toString() === job_id));
        setLoading(false);
    }, [job_id]);

    const getFullname = (user: IUser) => `${user.first_name} ${user.last_name}`;

    const onUpdateApplicant = (applicant: IApplicant, type: string) => () => {
        setAcceptModalShow(true);
        setType(type);
        setApplicant(applicant);
    };

    return (
        <BaseLayout title={'Applicants Per Job'}>
            <EmployerSidebarLayout title={'Applicants Per Job'}>
                {loading && (
                    <div className="col-lg-9 col-md-9 col-xs-12">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <Grid height="100" width="100" color="#00BFFF" ariaLabel="loading" />
                            </div>
                        </div>
                    </div>
                )}

                {!loading && (
                    <div className="col-lg-9 col-md-9 col-xs-12">
                        <div className="job-alerts-item candidates">
                            <h3 className="alerts-title">Manage Applicants for the Job</h3>
                            <div className="alerts-list">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-xs-12"><p>Name</p></div>
                                    <div className="col-lg-3 col-md-5 col-xs-12"><p>Job Title</p></div>
                                    <div className="col-lg-2 col-md-2 col-xs-12"><p>Status</p></div>
                                    <div className="col-lg-2 col-md-2 col-xs-12"><p>Applied At</p></div>
                                    <div className="col-lg-2 col-md-2 col-xs-12"><p>Actions</p></div>
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
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                <AcceptRejectModal
                    show={acceptModalShow}
                    type={type}
                    applicant={applicant}
                    onHide={() => setAcceptModalShow(false)}
                />
            </EmployerSidebarLayout>
        </BaseLayout>
    );
};

export default ApplicantsPerJobPage;
