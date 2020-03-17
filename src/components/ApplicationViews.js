/*
    ApplicationViews.js

    Purpose: This component is responsible for rendering components based on the url path.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

// AUTH
import Login from './auth/Login'
import Register from './auth/Register'

// LOGGED IN VIEWS
import ApplicationList from './applications/ApplicationList'
import ApplicationDetail from './applications/ApplicationDetail'
import EventList from './events/EventList'
import QuestionList from './questions/QuestionList'
import QuestionDetail from './questions/QuestionDetail'


class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/login" render={props => {
                    return !this.props.isLoggedIn ?
                        <Login
                            setUser={this.props.setUser}
                            {...props} />
                        :
                        <Redirect to="/" />
                }} />
                <Route exact path="/register" render={props => {
                    return !this.props.isLoggedIn ?
                        <Register
                            setUser={this.props.setUser}
                            {...props} 
                        />
                        :
                        <Redirect to="/" />
                }} />
                <Route exact path="/" render={props => {
                    return this.props.isLoggedIn ?
                        <ApplicationList
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/applications" render={props => {
                    return this.props.isLoggedIn ?
                        <ApplicationList
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/applications/:applicationId(\d+)" render={props => {
                    return this.props.isLoggedIn ?
                        <ApplicationDetail
                            applicationId={props.match.params.applicationId}
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/events" render={props => {
                    return this.props.isLoggedIn ?
                        <EventList
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/questions" render={props => {
                    return this.props.isLoggedIn ?
                        <QuestionList
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/questions/:questionId(\d+)" render={props => {
                    return this.props.isLoggedIn ?
                        <QuestionDetail
                            questionId={props.match.params.questionId}
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                
            </React.Fragment>
        )
    }
}

export default ApplicationViews