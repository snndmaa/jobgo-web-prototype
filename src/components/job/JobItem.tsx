/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { IJob } from "../../interfaces";

const JobItem = ({ job }: { job: IJob }) => {
    const randomIntFromInterval = () => {
        let n = Math.floor(Math.random() * 6 + 1);
        return `assets/img/features/img${n}.png`;
    };

    return (
        <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="job-featured">
                <div className="icon">
                    <img src={randomIntFromInterval()} alt="" />
                </div>
                <div className="content">
                    <h3>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </h3>
                    <p className="brand">{job.employer}</p>
                    <div className="tags">
                        <span><i className="lni-map-marker"/> {job.location || 'Location Not Available'}</span>
                        <br/>
                        <span><i className="lni-user"/>{job.employer}</span>
                    </div>
                    <span className="badge bg-warning text-dark mt-2">
                        Featured
                    </span>
                    <div className="mt-2">
                        <span className="badge bg-secondary">
                            Category: {job.category || 'No Category Available'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobItem;
