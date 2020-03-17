/*
    ApplicationStation.js

    Welcome to Application Station! Application Station is a user-based 
    single-page application that allows a user to track their job search. 
    Users can add job applications they are interested in or applying to,
    track the status of those applications, and list events related to those
    applications. Users can also save practice questions and answers to prepare
    for the interview process.

    Backend:    This application uses an API built with Python/Django to interact
                with the database. The GitHub repository is at: 
                https://github.com/RyanCrowleyCode/application-station-api

    Purpose:    This component is responsible for 

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// STYLES
import 'bootstrap/dist/css/bootstrap.min.css'

// COMPONENTS
import NavBar from './navigation/NavBar'
import ApplicationViews from './ApplicationViews'


class ApplicationStation extends Component {
    state = {
        isLoggedIn: false
    }

    isAuthenticated = () => Boolean(localStorage.getItem("appStationCred"))


    /*  adds user info into local storage, calls isAuthenticated, and updates 
        state with user information. */
    setUser = (authObj) => {
        localStorage.setItem("appStationCred", true)
        localStorage.setItem("appStationToken", authObj.token)
        this.setState({
            isLoggedIn: this.isAuthenticated()
        })
    }


    // handles logout functionality
    clearUser = () => {
        localStorage.removeItem('appStationCred')
        this.setState({ isLoggedIn: this.isAuthenticated() })
    }


    // check for logged in user on re-render
    componentDidMount() {
        this.setState({ isLoggedIn: this.isAuthenticated() })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar
                    isLoggedIn={this.state.isLoggedIn}
                    clearUser={this.clearUser}
                />
                <ApplicationViews
                    isLoggedIn={this.state.isLoggedIn}
                />
            </React.Fragment>
        )
    }
}

export default ApplicationStation