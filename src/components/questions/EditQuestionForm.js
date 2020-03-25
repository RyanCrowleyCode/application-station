/*
    EditQuestionForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to edit an existing question. Once the form is filled
                out and submitted, the updated Question object will post to the
                database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'

class EditQuestionForm extends Component {
    questionId = this.props.questionId

    state = {
        question: '',
        author: '',
        isFromInterviewer: false,
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
                question.is_from_interviewer ?
                    this.setState({
                        question: question.question,
                        author: "Interviewer",
                        isFromInterviewer: true,
                        loadingStatus: false,
                        open: false
                    })
                    :
                    this.setState({
                        question: question.question,
                        author: "Me",
                        isFromInterviewer: false,
                        loadingStatus: false,
                        open: false
                    })
            })
    }

    // update boolean value of isFromInterviewer in state
    handleQuestioner = (e) => {
        if (e.target.value === 'Me') {
            this.setState({
                isFromInterviewer: false,
                author: "Me"
            })
        } else {
            this.setState({
                isFromInterviewer: true,
                author: "Interviewer"
            })
        }
    }


    // handle PUT of updated question
    handleUpdate = e => {
        e.preventDefault()
        const { question, isFromInterviewer } = this.state

        // create updatedQuestion object
        const updatedQuestion = {
            question: question,
            is_from_interviewer: isFromInterviewer,
            id: this.questionId
        }

        // update database
        apiManager.update("questions", updatedQuestion)
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
            <React.Fragment >
                <button
                    type="button"
                    className="edit-response-button btn btn-success btn-sm"
                    onClick={() => this.setState({ open: true })}
                    disabled={this.state.loadingStatus}
                >
                    Edit
                </button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.getThenUpdateState()}
                >
                    <Form className="modal-form">
                        <h2>Edit Question</h2>
                        <Form.Group>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                id="question"
                                type="text"
                                value={this.state.question}
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Who is asking?</Form.Label>
                            <Form.Control
                                id="isFromInterviewer"
                                as="select"
                                value={this.state.author}
                                onChange={this.handleQuestioner}
                            >
                                <option
                                    key={`asker_me`}
                                    id={'me'}
                                >
                                    Me
                            </option>
                                <option
                                    key={`asker_interviewer`}
                                    id={'interviewer'}
                                >
                                    Interviewer
                            </option>

                            </Form.Control>
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
            </React.Fragment >
        )
    }

}

export default EditQuestionForm