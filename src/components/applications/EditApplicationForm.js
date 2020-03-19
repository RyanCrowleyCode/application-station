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
                    onHide={() => this.close()}
                >
                    
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditApplicationForm