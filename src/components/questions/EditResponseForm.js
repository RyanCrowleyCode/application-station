/*
    EditResponseForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to edit an existing response to a question. Once the form 
                is filled out and submitted, the updated Question object will post
                to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'

class EditResponseForm extends Component {
    responseId = this.props.responseId

    state = {
        response: '',
        loadingStatus: false,
        open: false
    }

    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // get Statuses and Job, update state
    getThenUpdateState = () => {
        apiManager.get(`questions/${this.responseId}`)
            .then(question => {
                {
                question.response != undefined ?
                    this.setState({
                        response: question.response,
                        loadingStatus: false,
                        open: false
                    })
                    : this.setState({
                        loadingStatus: false,
                        open: false
                    })
                }
            })
    }

    componentDidMount() {
        this.getThenUpdateState()
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="edit-response-button btn btn-success btn-sm"
                    onClick={() => this.setState({ open: true })}
                    disabled={this.state.loadingStatus}
                >
                    Update
                </button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.getThenUpdateState()}
                >
                    <Form>
                        <h2>Update Response</h2>
                        <Form.Group>
                            <Form.Label>Response</Form.Label>
                            <Form.Control
                                id="response"
                                type="text"
                                value={this.state.response}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }

}

export default EditResponseForm