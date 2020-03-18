/*
    Register.js

    Purpose:    This component is responsible for rendering the Registration form

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// API
import authApiManager from './authApiManager'

// STYLES

class Register extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: '',
        loadingStatus: false
    }

    // update properties in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // if user has completed all fields and all fields meet the requirements,
    // then register new user and log in new user
    handleRegister = e => {
        e.preventDefault()
        const { password1, password2 } = this.state

        // check if passwords match and are not blank
        if (password1 === password2 && password1 !== "") {
            this.setState({ loadingStatus: true })
            const newUser = {
                email: this.state.email.toLowerCase(),
                password: password1,
                first_name: this.state.firstName,
                last_name: this.state.lastName
            }

            //  Post to database
            authApiManager.register(newUser)
                .then(() => {
                    if (this.props.isAuthenticated()) {
                        this.props.loginUser()
                        this.props.history.push("/")
                    } else {
                        this.setState({ loadingStatus: false })
                    }
                })

        } else {
            window.alert("Please make sure your passwords match")
            this.setState({ loadingStatus: false })
        }
    }


    render() {
        return (
            <div className="jumbotron text-center welcome-view">
                <header className="welcome-header">
                    <h1 className="font-weight-light text-center">Application Station</h1>
                    <h3 className="font-weight-light text-center">New to Application Station? Sign up. It's free!</h3>
                </header>
                <form
                    id="register-form"
                    onSubmit={this.handleRegister}>
                    <div className="input-field-container">
                        <div className="register-category">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Jimi"
                                onChange={this.handleFieldChange}
                                required
                            />
                        </div>
                        <div className="register-category">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Hendrix"
                                onChange={this.handleFieldChange}
                                required
                            />
                        </div>
                        <div className="register-category">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="purple@email.com"
                                onChange={this.handleFieldChange}
                                required
                            />
                        </div>
                        <div className="register-category">
                            <label htmlFor="password1">Password</label>
                            <input
                                id="password1"
                                type="password"
                                placeholder="password"
                                onChange={this.handleFieldChange}
                                required
                            />
                        </div>
                        <div className="register-category">

                            <label htmlFor="password2">Password Again</label>
                            <input
                                id="password2"
                                type="password"
                                placeholder="confirm password"
                                onChange={this.handleFieldChange}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        value="Submit"
                        className="btn-primary"
                        disabled={this.state.loadingStatus}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default Register