/*
    EventForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to create a new Event. Once the form is filled out
                and submitted, a new Event will be posted to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'


class EventForm extends Component {
    // We are going to need to have a dropdown menu with jobs to choose from
    state = {
        details: '',
        startTime: '',
        endTime: '',
        jobId: null,
        applications: [],
        open: false,
        loadingStatus: false
    }

    // close modal and reset state
    close() {
        this.setState({
            details: '',
            startTime: '',
            endTime: '',
            jobId: null,
            open: false,
            loadingStatus: false
        })
    }

    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // update jobId in state with corresponding form value
    updateJob = (e) => {
        let aId
        // loop through applications to see which job was selected
        this.state.applications.forEach(function (a) {
            if (e.target.value.includes(a.title)
                && e.target.value.toLowerCase().includes(a.company.name)) {
                // if this is the right job is found, update jId to a.id
                aId = a.id
            }
        })
        // update state
        this.setState({ jobId: aId })
    }


    componentDidMount() {
        apiManager.get("jobs")
            .then(jobs => this.setState({ applications: jobs }))
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    variant="success"
                    className="new-event-button"
                    onClick={() => this.setState({ open: true })}
                >
                    New Event
                </Button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.close()}
                >
                    <Form >
                        <h1>New Event</h1>
                        <Form.Group>
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                id="details"
                                type="text"
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start</Form.Label>
                            <Form.Control
                                id="startTime"
                                type="datetime-local"
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End</Form.Label>
                            <Form.Control
                                id="endTime"
                                type="datetime-local"
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Application</Form.Label>
                            <Form.Control
                                id="jobId"
                                as="select"
                                onChange={this.updateJob}
                                required
                            >
                                {this.state.applications.map(application =>
                                    <option
                                        key={`application_${application.id}`}
                                        id={`${application.id}`}
                                    >
                                        {application.title} at {application.company.name.toUpperCase()}

                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <div className="form-buttons">
                            <Button
                                variant="success"
                                type="submit"
                            >
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

export default EventForm