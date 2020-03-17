/*
    Login.js

    Purpose:    This component is responsible for rendering the login form
                for returning users.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// API
import authApiManager from './authApiManager'

// STYLES


class Login extends Component {
    state = {
        loginName: '',
        password: ''
    }

    // update email and password in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // Login the user when they press the login button
    handleLogin = e => {
        e.preventDefault()

        const credentials = {
            "username": this.state.loginName,
            "password": this.state.password
        }

        authApiManager.login(credentials)
            .then(() => {
                if (this.props.isAuthenticated()) {
                    this.props.loginUser()
                    this.props.history.push("/")
                }
            })
    }


    render() {
        return (
            <React.Fragment>
                <div className="jumbotron text-center welcome-view">
                    <header className="welcome-header">
                        <h1 className="font-weight-light text-center">Application Station</h1>
                    </header>
                    <form
                        id="login-form"
                        onSubmit={this.handleLogin}>
                        <input
                            id="loginName"
                            type="text"
                            placeholder="email"
                            onChange={this.handleFieldChange}
                            required
                        />
                        <br />
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            onChange={this.handleFieldChange}
                            required
                        />
                        <br />
                        <button
                            type="submit"
                            value="Submit"
                            className="btn-primary">
                            Login
                    </button>
                    </form>
                </div>

            </React.Fragment>
        )
    }
}

export default Login