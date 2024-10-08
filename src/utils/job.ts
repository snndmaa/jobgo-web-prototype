// jobUtils.ts
import { IJob, IApplicant } from "../interfaces";

export const getJobById = (jobId: number) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    return jobs.find((job: IJob) => job.id === jobId);
};

export const checkIfApplied = (jobId: string) => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    return appliedJobs.includes(jobId);
};

export const applyForJob = (jobId: string) => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    if (!appliedJobs.includes(jobId)) {
        appliedJobs.push(jobId);
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }
};

export const updateApplicantStatusInLocalStorage = (applicantId: number, statusId: number, comment: string) => {
    const applicants = JSON.parse(localStorage.getItem('applicants') || '[]');

    // Find the applicant by their ID
    const applicantIndex = applicants.findIndex((app: IApplicant) => app.id === applicantId);

    if (applicantIndex !== -1) {
        // Update the applicant's status and comment
        applicants[applicantIndex].status = statusId === 2 ? 'Accepted' : 'Rejected';
        applicants[applicantIndex].comment = comment;

        // Save the updated applicants array back to localStorage
        localStorage.setItem('applicants', JSON.stringify(applicants));
    }
};

export const getAppliedJobsFromLocalStorage = (): IJob[] => {
    const jobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    return jobs;
};

export const getApplicantsFromStorage = (): IApplicant[] => {
    const storedApplicants = localStorage.getItem("applicants");
    return storedApplicants ? JSON.parse(storedApplicants) : [];
};