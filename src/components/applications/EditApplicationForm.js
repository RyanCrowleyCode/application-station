/*
    EditApplicationForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to edit an existing Application. Once the form is filled 
                out and submitted, the updated Application will post to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'

class EditApplicationForm extends Component {
    appId = this.props.appId

    state = {
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        link: '',
        statusId: null,
        status: '',
        statuses: [],
        loadingStatus: false,
        open: false
    }


    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // update statusId in state with corresponding form value
    updateStatus = (e) => {
        let sId, newStatus
        // loop through statuses to see which status was selected
        this.state.statuses.forEach(function (s) {
            if (s.status === e.target.value) {
                // if this right status is found, update sId to s.id
                sId = s.id
                newStatus = s.status
            }
        })
        // update state
        this.setState({ 
            statusId: sId,
            status: newStatus
        })
    }

    // get Statuses and Job, update state
    getThenUpdateState = () => {
        // Get Job
        apiManager.get(`jobs/${this.appId}`)
            .then(app => {
                this.setState({
                    companyName: app.company.name,
                    jobTitle: app.title,
                    jobDescription: app.description,
                    link: app.link,
                    statusId: parseInt(app.status.url[app.status.url.length - 1]),
                    status: app.status.status,
                    loadingStatus: false,
                    open: false
                })
            })
        // Get Statuses
        apiManager.get("statuses")
            .then(statuses => this.setState({ statuses: statuses }))
    }

    // handle PUT of updated application
    handleUpdate = e => {
        e.preventDefault()
        const { companyName, jobTitle, jobDescription, link, statusId } = this.state

        // confirm required fields are filled out
        if (companyName && jobTitle) {
            this.setState({ loadingStatus: true })

            // create an updatedApplication object with a placeholder for company_id
            const updatedApplication = {
                title: jobTitle,
                description: jobDescription,
                link: link,
                company_id: null,
                status_id: statusId,
                id: this.appId
            }

            /* 
                check to see if company exists in database. If so, get ID for 
                application object. If not, create a new company, and get ID
                for application object
            */
            apiManager.get("companies", `?name=${companyName.toLowerCase()}`)
                .then(companies => {
                    if (companies.length > 0) {
                        updatedApplication.company_id = companies[0].id
                        apiManager.update("jobs", updatedApplication)
                            .then(r => {
                                // close modal, update state for ApplicationList
                                this.getThenUpdateState()
                                this.props.getApplication()
                            })

                    } else {
                        apiManager.post("companies", { "name": companyName })
                            .then(company => {
                                updatedApplication.company_id = company.id
                                apiManager.update("jobs", updatedApplication)
                                    .then(r => {
                                        // close modal, update state for ApplicationList
                                        this.getThenUpdateState()
                                        this.props.getApplication()
                                    })
                            })
                    }
                })

        }
    }

    componentDidMount() {
        this.getThenUpdateState()
    }

    render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="edit-application-button btn btn-success btn-sm"
                    onClick={() => this.setState({ open: true })}
                    disabled={this.state.loadingStatus}
                >
                    Edit
                </button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.getThenUpdateState()}
                >
                    <Form className="modal-form">
                        <h2>Edit Application</h2>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                id="companyName"
                                type="text"
                                value={this.state.companyName}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                id="jobTitle"
                                type="text"
                                value={this.state.jobTitle}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                id="jobDescription"
                                as="textarea"
                                value={this.state.jobDescription}
                                rows="10"
                                onChange={this.handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                id="link"
                                type="text"
                                value={this.state.link}
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                id="statusId"
                                as="select"
                                value={this.state.status}
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
                                onClick={this.handleUpdate}
                                disabled={this.state.loadingStatus}>
                                Update
                            </Button>
                            <Button
                                onClick={() => this.getThenUpdateState()}
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

export default EditApplicationForm