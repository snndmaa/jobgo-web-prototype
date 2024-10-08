/* eslint-disable */
import React, { useEffect, useState } from "react";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";
import { Link } from "react-router-dom";
import { IJob } from "../../interfaces";
import { Grid } from "react-loader-spinner";
import { getCurrentUser } from "../../utils/auth";
const DashboardPage = () => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [loading, setLoading] = useState(true);

    // Dummy data to simulate jobs
    const dummyJobs: IJob[] = [
        {
            id: 1,
            title: "Software Engineer",
            location: "New York, NY",
            type: "1",
            job_tags: [{ id: 1, name: "JavaScript" }, { id: 2, name: "React" }],
            total_candidates: 5,
        },
        {
            id: 2,
            title: "Data Scientist",
            location: "San Francisco, CA",
            type: "2",
            job_tags: [{ id: 3, name: "Python" }, { id: 4, name: "Machine Learning" }],
            total_candidates: 10,
        },
        // Add more dummy jobs as needed
    ];

    useEffect(() => {
        // Simulate fetching data from local storage or set dummy data directly
        const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");

        if (storedJobs.length > 0) {
            setJobs(storedJobs);
        } else {
            // If local storage is empty, set the dummy data
            localStorage.setItem("jobs", JSON.stringify(dummyJobs));
            setJobs(dummyJobs);
        }

        setLoading(false);
    }, []);

    const get_type = (type: string) => {
        const types: any = {
            "1": "Full Time",
            "2": "Part Time",
            "3": "Internship",
        };
        return types[type];
    };

    const get_class = (type: string) => {
        const class_name: any = {
            "1": "Full Time",
            "2": "Part Time",
            "3": "Internship",
        }[type];

        return class_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };

    return (
        <BaseLayout title={'Dashboard'}>
            <EmployerSidebarLayout>
                {
                    loading && (
                        <div className="col-lg-9 col-md-9 col-xs-12">
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <Grid
                                        color="#00BFFF"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    !loading && (
                        <div className="col-lg-9 col-md-9 col-xs-12">
                            <div className="job-alerts-item candidates">
                                <h3 className="alerts-title">Manage Jobs</h3>
                                <div className="alerts-list">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Type</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Tags</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                            <p>Total candidates</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    jobs.map(job => {
                                        return (
                                            <React.Fragment key={job.id}>
                                                <div className="alerts-content">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-5 col-xs-12">
                                                            <h3>
                                                                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                                                            </h3>
                                                            <span className="location"><i className="lni-map-marker" /> {job.location}</span>
                                                        </div>
                                                        <div className="col-lg-3 col-md-3 col-xs-12">
                                                            <p><span
                                                                className={get_class(String(job.type))}>{get_type(String(job.type))}</span>
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-3 col-md-2 col-xs-12">
                                                            <div className="can-img">
                                                                {
                                                                    job.job_tags?.map(tag => {
                                                                        return (
                                                                            <span key={tag.id}
                                                                                  style={{ color: '#fff', backgroundColor: '#000' }}
                                                                                  className="full-time">{tag.name}</span>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-2 col-xs-12">
                                                            <p>
                                                                <Link to={`/employer/applicants/${job.id}`}>
                                                                    {job.total_candidates} candidates
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <br />
                            </div>
                        </div>
                    )
                }
            </EmployerSidebarLayout>
        </BaseLayout>
    )
}

export default DashboardPage;
