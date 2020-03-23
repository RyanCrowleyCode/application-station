/*
    EditEventForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to edit an existing Event. Once the form is filled 
                out and submitted, the updated Event will post to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'

// MODULES
import toDTL from '../../modules/helper'

class EditEventForm extends Component {
    eventId = this.props.eventId

    state = {
        details: '',
        startTime: '',
        endTime: '',
        jobId: null,
        applications: this.props.jobs,
        newApp: '',
        open: false,
        loadingStatus: false
    }

    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // update jobId in state with corresponding form value
    updateJob = (e) => {
        let aId, app
        // loop through applications to see which job was selected
        this.state.applications.forEach(function (a) {
            if (e.target.value.includes(a.title)
                && e.target.value.toLowerCase().includes(a.company.name)) {
                // if this is the right job is found, update jId to a.id
                aId = a.id
                app = `${a.title} at ${a.company.name.toUpperCase()}`
            }
        })
        // update state
        this.setState({
            jobId: aId,
            newApp: app
        })
    }

    // get event, update state
    getThenUpdateState = () => {
        // Get event
        apiManager.get(`events/${this.eventId}`)
            .then(event => {
                this.setState({
                    details: event.details,
                    startTime: toDTL(event.start_time),
                    endTime: toDTL(event.end_time),
                    jobId: event.job_id,
                    loadingStatus: false,
                    open: false
                })
            }).then(() => {
                apiManager.get(`jobs/${this.state.jobId}`)
                    .then(job => {
                        this.setState({ newApp: `${job.title} at ${job.company.name.toUpperCase()}` })
                    })
            })
    }

    // handle PUT of updated event
    handleUpdate = e => {
        e.preventDefault()
        const { details, startTime, endTime, jobId } = this.state

        // confirm fields are complete out
        if (details && startTime && endTime && jobId) {
            // confirm the start time is not later than the end time
            if (startTime <= endTime) {
                this.setState({ loadingStatus: true })

                // create an updatedEvent object
                const updatedEvent = {
                    details: details,
                    start_time: startTime,
                    end_time: endTime,
                    job_id: jobId,
                    id: this.eventId
                }

                // Post to the database
                apiManager.update("events", updatedEvent)
                    .then(r => {
                        // close modal, update state for EventCard
                        this.getThenUpdateState()
                        this.props.getJobUpdateState()
                        this.props.getEventUpdateState()
                    })

            } else {
                window.alert("This event cannot end before it begins")
            }
        } else {
            window.alert("Please complete all fields")
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
                    className="edit-application-button btn btn-success delete-list btn-sm"
                    onClick={() => this.setState({ open: true })}
                    disabled={this.state.loadingStatus}
                >
                    Edit
                </button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.getThenUpdateState()}
                >
                    <Form >
                        <h1>Edit Event</h1>
                        <Form.Group>
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                id="details"
                                type="text"
                                value={this.state.details}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start</Form.Label>
                            <Form.Control
                                id="startTime"
                                type="datetime-local"
                                value={this.state.startTime}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End</Form.Label>
                            <Form.Control
                                id="endTime"
                                type="datetime-local"
                                value={this.state.endTime}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Application</Form.Label>
                            <Form.Control
                                id="jobId"
                                as="select"
                                value={this.state.newApp}
                                onChange={this.updateJob}
                                required
                            >
                                <option>...</option>
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
                                onClick={this.handleUpdate}
                                disabled={this.state.loadingStatus}
                            >
                                Submit
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

export default EditEventForm