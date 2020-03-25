/*
    ApplicationCard.js

    Purpose:    This component is responsible for displaying the information
                for a single application in the application list. Each card 
                will have a button that will take the user to the details view
                of that specific application.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


// DATA
import apiManager from '../../modules/apiManager'

// STYLES
import './ApplicationCard.css'



class ApplicationCard extends Component {
    job = this.props.job
    now = new Date().toISOString()

    state = {
        previousEvent: null,
        nextEvent: null,
        pastEvents: [],
        futureEvents: []
    }


    // sort events into past and future
    sortEvents = (events) => {
        this.setState({
            pastEvents: events.filter(e => e.start_time < this.now),
            futureEvents: events.filter(e => e.start_time > this.now)
        })
    }

    // find previousEvent and nextEvent
    setAdjacentEvents = (pastEvents, futureEvents) => {
        // if any past events, choose last as previousEvent
        if (pastEvents.length > 0) {
            this.setState({ previousEvent: pastEvents[pastEvents.length - 1] })
        }
        // if any future events, choose first as nextEvent
        if (futureEvents.length > 0) {
            this.setState({ nextEvent: futureEvents[0] })
        }
    }

    componentDidMount() {
        // get events for this job
        apiManager.get("events", `?job_id=${this.job.id}`)
            .then(events => {
                // sort events into past and future
                this.sortEvents(events)

                // assign previousEvent and nextEvent
                this.setAdjacentEvents(this.state.pastEvents, this.state.futureEvents)
            })
    }

    render() {
        const { previousEvent, nextEvent } = this.state
        return (
            <div className="app-card">
                <div className="app-card-top">
                    <h5>{(this.job.company.name).toUpperCase()} | {this.job.title}</h5>
                </div>
                <div className="app-card-middle">
                    <p><strong>Status:</strong> {this.job.status.status}</p>
                    {this.job.link ?
                        <p><a href={this.job.link} target="_blank" rel="noopener noreferrer">View External Job Description</a></p>
                        : null
                    }
                    <div className="app-card-events">
                        <Link to={'/events'}>
                            {previousEvent ?
                                <p>
                                    <strong>Previous Event:</strong> ({previousEvent.start_time})
                            {previousEvent.details}
                                </p>
                                : null
                            }
                        </Link>
                        <Link to={'/events'}>
                            {nextEvent ?
                                <p>
                                    <strong>Next Event:</strong> ({nextEvent.start_time})
                            {nextEvent.details}
                                </p>
                                : null
                            }
                        </Link>

                    </div>
                </div>
                <div className="app-card-bottom">
                    <Link to={`/applications/${this.job.id}`}>
                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                        >
                            Details
                        </button>
                    </Link>
                </div>

            </div >
        )
    }

}

export default ApplicationCard