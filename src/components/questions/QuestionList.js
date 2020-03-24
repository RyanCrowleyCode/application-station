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

class QuestionList extends Component {
    state = {
        questions: []
    }

    // gets questions for user
    getQuestions = () => {
        apiManager.get("questions")
            .then(questions => {
                this.setState({ questions: questions })
            })
    }

    componentDidMount() {
        this.getQuestions()
    }

    render() {
        return (
            <React.Fragment>
                <h2>Questions</h2>
                <QuestionForm
                    getQuestions={this.getQuestions}
                />
                <section className="application-list">
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