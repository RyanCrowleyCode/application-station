/*
    QuestionForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to create a new Question. Once the form is filled out
                and submitted, a new Question will be posted to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import apiManager from '../../modules/apiManager'

class QuestionForm extends Component {
    state = {
        question: '',
        isFromInterviewer: false,
        loadingStatus: false,
        open: false
    }

    // close modal and reset state
    close() {
        this.setState({
            question: '',
            isFromInterviewer: false,
            loadingStatus: false,
            open: false
        })
    }

    // update values in state with corresponding form values
    handleFieldChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // update boolean value of isFromInterviewer in state
    handleQuestioner = (e) => {
        if (e.target.value === 'Me') {
            this.setState({ isFromInterviewer: false })
        } else {
            this.setState({ isFromInterviewer: true })
        }
    }

    // handle POST of new question
    handleSubmit = e => {
        e.preventDefault()
        const { question, isFromInterviewer } = this.state
        
        // confirm required fields are filled out
        if (question) {
            this.setState({ loadingStatus: true})

            // create a newQuestion object
            const newQuestion = {
                question: question,
                is_from_interviewer: isFromInterviewer
            }

            // POST newQuestion
            apiManager.post("questions", newQuestion)
            .then(r => {
                // close modal, update state for QuestionsList
                this.close()
                this.props.getQuestions()
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    variant="success"
                    className="new-application-button"
                    onClick={() => this.setState({ open: true })}>
                    New Question
                </Button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.close()}
                >
                    <Form>
                        <h2>New Question</h2>
                        <Form.Group>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                id="question"
                                type="text"
                                onChange={this.handleFieldChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Who is asking?</Form.Label>
                            <Form.Control
                                id="isFromInterviewer"
                                as="select"
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
                                onClick={this.handleSubmit}
                                disabled={this.state.loadingStatus}>
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

export default QuestionForm
