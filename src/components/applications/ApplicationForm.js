/*
    ApplicationForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to create a new Application. Once the form is filled out
                and submitted, a new Application will be posted to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'


class ApplicationForm extends Component {
    state = {
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        link: '',
        statusId: 1,
        statuses: [],
        loadingStatus: false,
        open: false
    }

    // close modal and reset state
    close() {
        this.setState({
            companyName: '',
            jobTitle: '',
            jobDescription: '',
            link: '',
            statusId: 1,
            loadingStatus: false,
            open: false
        })
    }

    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // update statusId in state with corresponding form value
    updateStatus = (e) => {
        let sId
        // loop through statuses to see which status was selected
        this.state.statuses.forEach(function (s) {
            if (s.status === e.target.value) {
                // if this right status is found, update sId to s.id
                sId = s.id
            }
        })
        // update state
        this.setState({ statusId: sId })
    }

    // handle POST of new application
    handleSubmit = e => {
        e.preventDefault()
        const { companyName, jobTitle, jobDescription, link, statusId } = this.state

        // confirm required fields are filled out
        if (companyName && jobTitle) {
            this.setState({ loadingStatus: true })

            // create a newApplication object with a placeholder for company_id
            const newApplication = {
                title: jobTitle,
                description: jobDescription,
                link: link,
                company_id: null,
                status_id: statusId
            }

            /* 
                check to see if company exists in database. If so, get ID for 
                application object. If not, create a new company, and get ID
                for application object
            */
            apiManager.get("companies", `?name=${companyName.toLowerCase()}`)
                .then(companies => {
                    if (companies.length > 0) {
                        newApplication.company_id = companies[0].id
                        apiManager.post("jobs", newApplication)
                            .then(r => {
                                // close modal, update state for ApplicationList
                                this.close()
                                this.props.getApplications()
                            })

                    } else {
                        apiManager.post("companies", { "name": companyName })
                            .then(company => {
                                newApplication.company_id = company.id
                                apiManager.post("jobs", newApplication)
                                    .then(r => {
                                        // close modal, update state for ApplicationList
                                        this.close()
                                        this.props.getApplications()
                                    })
                            })
                    }
                })

        }
    }


    componentDidMount() {
        apiManager.get("statuses")
            .then(statuses => this.setState({ statuses: statuses }))
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    variant="success"
                    className="new-application-button"
                    onClick={() => this.setState({ open: true })}
                >
                    New Application
                </Button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.close()}
                >
                    <Form className="modal-form">
                        <h2>New Application</h2>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                id="companyName"
                                type="text"
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                id="jobTitle"
                                type="text"
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                id="jobDescription"
                                as="textarea"
                                rows="10"
                                onChange={this.handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                id="link"
                                type="text"
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                id="statusId"
                                as="select"
                                onChange={this.updateStatus}
                            >
                                {this.state.statuses.map(status =>
                                    <option
                                        key={`status_${status.id}`}
                                        id={`${status.id}`}
                                    >
                                        {status.status}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <div className="form-buttons">
                            <Button
                                variant="success"
                                type="submit"
                                onClick={this.handleSubmit}
                                disabled={this.state.loadingStatus}>
                                Submit
                            </Button>
                            <Button
                                onClick={() => this.close()}
                                variant="dark">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }


}

export default ApplicationForm