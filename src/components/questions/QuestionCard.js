/*
    QuestionCard.js

    Purpose:    This component is responsible for displaying the information
                for a single question in the question list. Each card 
                will have a button that will take the user to the details view
                of that specific question.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class QuestionCard extends Component {
    question = this.props.question

    render() {
        return (
            <React.Fragment>
                <div className="question-card-top">
                    from {this.question.is_from_interviewer ? 'Interviewer' : 'Me'}
                </div>
                <p className="question-card-question">
                    {this.question.question}
                </p>
                <div className="question-card-bottom">
                    <Link to={`/questions/${this.question.id}`}>
                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                        >
                            Details
                        </button>
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default QuestionCard