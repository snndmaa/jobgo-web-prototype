import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import moment from "moment";
import swal from "sweetalert";
import { checkIfApplied, applyForJob } from "../utils/job";
import { getCurrentUser, isAuthenticated } from "../utils/auth";
import { IJob } from "../interfaces";

const JobDetailsPage: React.FC = () => {
    const [job, setJob] = useState<IJob | null>(null);  // Job data state
    const [isApplied, setIsApplied] = useState<boolean>(false);  // Job application state

    const { id } = useParams<{ id: string }>();  // Get job ID from route params
    const navigate = useNavigate();  // Navigation hook

    useEffect(() => {
        if (id) {
            loadJobDetails(id);  // Load job details when the component mounts
        }
    }, [id]);

    // Load job details from localStorage
    const loadJobDetails = (jobId: string) => {
        const jobData = localStorage.getItem("jobs"); // Assuming jobs are stored as a JSON string
        if (jobData) {
            const jobs: IJob[] = JSON.parse(jobData);
            const foundJob = jobs.find((job) => job.id === Number(jobId));
            if (foundJob) {
                setJob(foundJob);
                if (isAuthenticated()) {
                    const hasApplied = checkIfApplied(jobId);  // Check if user has already applied
                    setIsApplied(hasApplied);
                }
            } else {
                swal("Job not found", { icon: "error" });
            }
        }
    };

    // Handle job application process
    const applyJobHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (isAuthenticated()) {
            swal({
                title: "Are you sure?",
                text: "Once applied, you cannot undo this!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((apply) => {
                if (apply) {
                    applyForJob(id!);  // Apply for job using utility function
                    setIsApplied(true);
                    swal("Successfully applied for this position", { icon: "success" });
                }
            });
        } else {
            navigate('/login');  // Redirect to login page if not authenticated
        }
    };

    if (!job) return <div>Loading...</div>;  // Loading state

    return (
        <React.Fragment>
            <Header />
            <Helmet>
                <title>Job Details</title>
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 col-xs-12">
                            <div className="breadcrumb-wrapper">
                                <div className="img-wrapper">
                                    <img src="/assets/img/about/company-logo.png" alt="Company Logo" />
                                </div>
                                <div className="content">
                                    <h3 className="product-title">{job.title}</h3>
                                    <p className="brand">{job.employer}</p>
                                    <div className="tags">
                                        <span><i className="lni-map-marker" /> {job.location}</span>
                                        <span><i className="lni-calendar" /> Posted {moment(job.created_at).format('MM-DD-YY')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="month-price">
                                <span className="year">Monthly</span>
                                <div className="price">{job.salary} Tk</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="job-detail section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            <div className="content-area">
                                <h4>Job Description</h4>
                                <p>{job.description}</p>

                                { getCurrentUser().email === job.employer ? '' :
                                !isApplied ? (
                                    <>
                                        <h5>How To Apply</h5>
                                        <p>Click the button below to apply</p>
                                        <button onClick={applyJobHandle} className="btn btn-common">Apply job</button>
                                    </>
                                ) : (
                                    <a href="#!" className="btn btn-primary">Already applied</a>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            {/* Sidebar and Map */}
                        </div>
                    </div>
                </div>
            </section>

            <section id="featured" className="section bg-gray pb-45">
                <div className="container">
                    <h4 className="small-title text-left">Similar Jobs</h4>
                    <div className="row">
                        {/* Similar Jobs */}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default JobDetailsPage;
