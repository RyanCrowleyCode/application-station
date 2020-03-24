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

    // handle POST of new event
    handleSubmit = e => {
        e.preventDefault()
        const { details, startTime, endTime, jobId } = this.state

        // confirm fields are complete out
        if (details && startTime && endTime && jobId) {
            // confirm the start time is not later than the end time
            if (startTime <= endTime) {
                this.setState({ loadingStatus: true })

                // create a newEvent object
                const newEvent = {
                    details: details,
                    start_time: startTime,
                    end_time: endTime,
                    job_id: jobId
                }

                // Post to the database
                apiManager.post("events", newEvent)
                .then(r => {
                    // close modal, update state for EventList
                    this.close()
                    this.props.getEvents()
                })

            } else {
                window.alert("This event cannot end before it begins")
            }
        } else {
            window.alert("Please complete all fields")
        }
    }


    componentDidMount() {
        apiManager.get("jobs")
            .then(jobs => this.setState({ applications: jobs }))
    }

    render() {
        console.log(this.state.startTime)
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
                        <h2>New Event</h2>
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
                                onClick={this.handleSubmit}
                                disabled={this.state.loadingStatus}
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