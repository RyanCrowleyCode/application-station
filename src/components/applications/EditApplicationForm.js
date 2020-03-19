/*
    EditApplicationForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to edit an existing Application. Once the form is filled 
                out and submitted, the updated Application will post to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'

class EditApplicationForm extends Component {
    appId = this.props.appId

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


    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
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
                    loadingStatus: false,
                    open: false
                })
                console.log(this.state)
            })
        // Get Statuses
        apiManager.get("statuses")
            .then(statuses => this.setState({ statuses: statuses }))
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
                        <h1>Edit Application</h1>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                id="companyName"
                                type="text"
                                value={this.state.companyName}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditApplicationForm