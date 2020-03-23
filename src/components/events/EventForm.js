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


    componentDidMount() {

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