import React, { FC, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IApplicant } from "../../interfaces";

interface Props {
    show: boolean
    onHide: () => any
    type: string
    applicant: IApplicant
}

const AcceptRejectModal: FC<Props> = ({ show, onHide, type, applicant }) => {
    const [comment, setComment] = useState('');
    let title = '';
    let variant = '';

    // Define modal title and button variant based on the action type
    if (type === 'accept') {
        title = 'Accept the applicant';
        variant = 'success';
    } else if (type === 'reject') {
        title = 'Reject the applicant';
        variant = 'danger';
    }

    useEffect(() => {
        setComment(applicant.comment || '');
    }, [applicant]);

    const onSubmit: React.MouseEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // Load applicants from local storage
        let applicants = JSON.parse(localStorage.getItem('applicants') || '[]');

        // Find the current applicant in the storage data
        const updatedApplicants = applicants.map((app: IApplicant) => {
            if (app.id === applicant.id) {
                return {
                    ...app,
                    status: type === 'accept' ? 'Accepted' : 'Rejected',
                    comment: comment,
                };
            }
            return app;
        });

        // Update local storage with the new applicant data
        localStorage.setItem('applicants', JSON.stringify(updatedApplicants));

        // Close the modal after updating
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>

            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="comment">Comment (Optional)</label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows={5}
                            className="form-control"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                    <Button type="submit" variant={variant}>Submit</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default AcceptRejectModal;
