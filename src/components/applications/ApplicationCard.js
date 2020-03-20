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
            <React.Fragment>
                <div className="app-card-top">
                    <h5><span>{(this.job.company.name).toUpperCase()}</span> | <span>{this.job.title}</span></h5>
                </div>
                <div className="app-card-middle">
                    <p>Status: {this.job.status.status}</p>
                    <p>Link: <a href={this.job.link} target="_blank" rel="noopener noreferrer">{this.job.link}</a></p>

                    {previousEvent ?
                        <p>
                            Previous Event: ({previousEvent.start_time})
                            <br />{previousEvent.details}
                        </p>
                        : null
                    }
                    {nextEvent ?
                        <p>
                            Next Event: ({nextEvent.start_time})
                            <br />{nextEvent.details}
                        </p>
                        : null
                    }
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

            </React.Fragment>
        )
    }

}

export default ApplicationCard