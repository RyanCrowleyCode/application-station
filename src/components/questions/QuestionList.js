/*
    QuestionList.js

    Purpose:    This component is responsible for rendering the QuestionList component. 

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// DATA
import apiManager from '../../modules/apiManager'

// COMPONENTS
import QuestionCard from './QuestionCard'
import QuestionForm from './QuestionForm'

// STYLES
import './QuestionList.css'

class QuestionList extends Component {
    state = {
        questions: []
    }

    // gets questions for user
    getQuestions = () => {
        apiManager.get("questions")
            .then(questions => {
                let reverseQuestions = []
                for (let i = questions.length -1; i >= 0; i--) {
                    reverseQuestions.push(questions[i])
                }
                this.setState({ questions: reverseQuestions })
            })
    }

    componentDidMount() {
        this.getQuestions()
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="page-title">Questions</h2>
                <QuestionForm
                    getQuestions={this.getQuestions}
                />
                <section className="question-list">
                    {this.state.questions.map(question =>
                        <QuestionCard
                            key={question.id}
                            question={question}
                        />
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default QuestionList