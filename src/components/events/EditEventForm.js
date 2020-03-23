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

class EditEventForm extends Component {
    render() {
        return(
            <React.Fragment>
                <button
                    type="button"
                    className="edit-application-button btn btn-success delete-list btn-sm"
                >
                    Edit
                </button>
            </React.Fragment>
        )
    }
}

export default EditEventForm