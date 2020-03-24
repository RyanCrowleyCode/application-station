/*
    QuestionDetail.js

    Purpose:    This component is responsible for rendering the QuestionDetail component.
                QuestionDetail will allow users to edit or delete a question, as
                well as update a response to a question. 

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// DATA
import apiManager from '../../modules/apiManager'


class QuestionDetail extends Component {
    questionId = this.props.match.params.questionId

    state = {
        question: '',
        isFromInterviewer: false,
        response: '',
        loadingStatus: false
    }

    // get question
    getQuestion = () => {
        apiManager.get(`questions/${this.questionId}`)
            .then(question => {
                this.setState({
                    question: question.question,
                    isFromInterviewer: question.is_from_interviewer,
                    response: question.answer
                })
            })
    }

    componentDidMount() {
        this.getQuestion()
    }

    render() {
        return (
            <div className="question-details">
                <div className="question-detail-top">
                    <p className="question-detail-question">
                        "{this.state.question}"
                    </p>
                    <p className="question-detail-author">
                        - {this.state.isFromInterviewer
                            ? "Interviewer to Me"
                            : "Me to the Interviewer"}
                    </p>
                </div>
            </div>
        )
    }
}

export default QuestionDetail