/*
    NavBar.js

    Purpose:    This component is responsible for rendering the NavBar.
                NavBar will render dynamically based on whether a user is
                logged in or not. NavBar handles the logout functionality.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// STYLES
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar flex-md-nowrap p-0 shadow">
                <div className="brand">
                    <img className="train-logo" src={require("../../images/application-station-logo.png")} alt="Train Logo" />
                    <h4>Application Station</h4>
                </div>
                {this.props.isLoggedIn ?
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Applications</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/questions">Questions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.props.clearUser} to="/login">Logout</Link>
                        </li>
                    </ul>
                    :
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                }
            </nav>
        )
    }
}

export default NavBar