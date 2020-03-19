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


    componentDidMount() {
        apiManager.get("statuses")
            .then(statuses => this.setState({ statuses: statuses }))
    }

    render() {
        console.log(this.state)
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
                    <Form >
                        <h1>New Application</h1>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                id="companyName"
                                type="text"
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                id="jobTitle"
                                type="text"
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                id="jobDescription"
                                as="textarea"
                                rows="10"
                                onChange={this.handleFieldChange} />
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