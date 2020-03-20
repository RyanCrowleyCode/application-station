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

    }


    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <Button
                    variant="success"
                    className="new-event-button"
                >
                    New Event
                </Button>
                <Modal

                >
                    <Form >
                        <h1>New Event</h1>

                        <div className="form-buttons">
                            <Button
                                variant="success"
                                type="submit"
                                Submit
                            >
                            </Button>
                            <Button
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