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
        statusId: null,
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
            statusId: null,
            loadingStatus: false,
            open: false
        })
    }

    // update values in state with corresponding form values
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // componentDidMount() {
    //     this.setState({
    //         open: this.props.open
    //     })
    // }

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
                    <Form >
                        <h1>New Application</h1>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                id="companyName"
                                type="text"
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }


}

export default ApplicationForm