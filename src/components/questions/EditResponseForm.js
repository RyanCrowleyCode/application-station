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
    questionId = this.props.questionId

    state = {
        question: '',
        isFromInterviewer: false,
        response: '',
        buttonLabel: "Add Response",
        loadingStatus: false,
        open: false
    }

    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // get Statuses and Job, update state
    getThenUpdateState = () => {
        apiManager.get(`questions/${this.questionId}`)
            .then(question => {
                question.answer !== undefined
                    && question.answer !== null
                    && question.answer !== "" ?
                    this.setState({
                        question: question.question,
                        isFromInterviewer: question.is_from_interviewer,
                        response: question.answer,
                        buttonLabel: "Update Response",
                        loadingStatus: false,
                        open: false
                    })
                    : this.setState({
                        question: question.question,
                        isFromInterviewer: question.is_from_interviewer,
                        buttonLabel: "Add Response",
                        loadingStatus: false,
                        open: false
                    })
            })
    }

    // handle PUT of updated response
    handleUpdate = e => {
        e.preventDefault()
        const { question, isFromInterviewer, response } = this.state

        // create updatedQuestion object
        const updatedQuestion = {
            question: question,
            is_from_interviewer: isFromInterviewer,
            answer: response,
            id: this.questionId
        }

        // update database
        apiManager.updateResponse(updatedQuestion)
            .then(r => {
                this.getThenUpdateState()
                this.props.getQuestion()
            })
    }


    componentDidMount() {
        this.getThenUpdateState()
    }

    render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="edit-response-button btn btn-success btn-sm"
                    onClick={() => this.setState({ open: true })}
                    disabled={this.state.loadingStatus}
                >{this.state.buttonLabel}
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
                        <div className="form-buttons">
                            <Button
                                variant="success"
                                type="submit"
                                onClick={this.handleUpdate}
                                disabled={this.state.loadingStatus}>
                                Update
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

export default EditResponseForm