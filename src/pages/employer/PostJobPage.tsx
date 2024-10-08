/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseLayout from "../../components/BaseLayout";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { useToasts } from "react-toast-notifications";
import { IJob } from "../../interfaces";


interface ICustomTag {
    label: string;
    value: string;  // Change value to string
}

const PostJobPage: React.FC = () => {
    const navigate = useNavigate();
    const [tags] = useState<ICustomTag[]>([
        { value: "Programming", label: "Programming" },
        { value: "Marketing", label: "Marketing" },
        { value: "Labor", label: "Labor" },
    ]);
    const [types] = useState([
        { value: "Full Time", label: "Full Time" },
        { value: "Part Time", label: "Part Time" },
        { value: "Freelance", label: "Freelance" },
    ]);
    const [categories] = useState([
        { value: "web-design", label: "Web design" },
        { value: "graphic-design", label: "Graphic design" },
        { value: "web-development", label: "Web development" },
    ]);
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [salary, setSalary] = useState<number | undefined>();
    const [jobTags, setJobTags] = useState<ICustomTag[]>([]);
    const [location, setLocation] = useState<string>("");
    const [type, setType] = useState<string | number>("");
    const [category, setCategory] = useState<string>("");
    const [lastDate, setLastDate] = useState<Date | undefined>(new Date());
    const [website, setWebsite] = useState<string | undefined>("");

    const { addToast } = useToasts();

    // Get the current employer's info from localStorage
    const employer = JSON.parse(localStorage.getItem("currentUser") || "{}")?.email || "Unknown Employer";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        const newJob: IJob = {
            id: Math.floor(Math.random() * 1000),  // Generate a random ID
            title,
            description,
            location,
            type,
            category,
            last_date: lastDate!,
            employer, // Automatically assigned from localStorage
            created_at: new Date(),
            filled: false,
            salary: salary || 0, // Default to 0 if not provided
            applicant: undefined,
            website
        };

        // Save job to localStorage
        const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
        localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));

        addToast('Job posted successfully!', { appearance: 'success' });
        navigate('/');
    };

    const handleSkillsChange = (selectedOptions: readonly ICustomTag[]) => {
        setJobTags([...selectedOptions]);
    };

    return (
        <BaseLayout title="Post new job">
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Post A Job</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-12 col-xs-12">
                            <div className="post-job box">
                                <h3 className="job-title">Post a new Job</h3>
                                <form className="form-ad" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="control-label">Job Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            placeholder="Write job title"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Job Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Write job description"
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            rows={4}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Salary</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    onChange={(e) => setSalary(Number(e.target.value))}
                                                    placeholder="Salary (Optional for negotiable)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Required skills</label>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={makeAnimated()}
                                                    isMulti
                                                    options={tags}
                                                    className="React"
                                                    classNamePrefix="select"
                                                    onChange={handleSkillsChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                            placeholder="e.g. London"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Type</label>
                                                <Select
                                                    className="React"
                                                    classNamePrefix="select"
                                                    name="type"
                                                    onChange={(selectedType: any) => setType(selectedType.value)} // Changed to .value
                                                    required
                                                    options={types}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Category</label>
                                                <Select
                                                    className="React"
                                                    classNamePrefix="select"
                                                    name="category"
                                                    onChange={(selectedCategory: any) => setCategory(selectedCategory.value)} // Changed to .value
                                                    required
                                                    options={categories}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={submitted} className="btn btn-primary log-btn">
                                        {submitted ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit your job'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default PostJobPage;
