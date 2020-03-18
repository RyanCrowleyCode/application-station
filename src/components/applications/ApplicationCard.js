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

// DATA
import apiManager from '../../modules/apiManager'



class ApplicationCard extends Component {
    job = this.props.job
    now = new Date().toISOString()

    state = {
        lastEvent: null,
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

    // find lastEvent and nextEvent
    setAdjacentEvents = (pastEvents, futureEvents) => {
        // if any past events, choose last as lastEvent
        if (pastEvents.length > 0) {
            this.setState({ lastEvent: pastEvents[pastEvents.length - 1] })
        }
        // if any future events, choose first as nextEvent
        if (futureEvents.length > 0) {
            this.setState({ nextEvent: futureEvents[0] })
        }
    }

    componentDidMount() {
        // get events for this job
        apiManager.get("events", `job_id=${this.job.id}`)
            .then(events => {
                // sort events into past and future
                this.sortEvents(events)

                // assign lastEvent and nextEvent
                this.setAdjacentEvents(this.state.pastEvents, this.state.futureEvents)
            })
    }

    render() {
        const { lastEvent, nextEvent } = this.state
        return (
            <React.Fragment>
                <div className="app-card-top">
                    <h5><span>{(this.job.company.name).toUpperCase()}</span> | <span>{this.job.title}</span></h5>
                </div>
                <div className="app-card-middle">
                    <p>Status: {this.job.status.status}</p>
                    <p>Link: <a href={this.job.link} target="_blank" rel="noopener noreferrer">{this.job.link}</a></p>

                    {lastEvent ?
                        <p>
                            Last Event: ({lastEvent.start_time})
                            <br />{lastEvent.details}
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

            </React.Fragment>
        )
    }

}

export default ApplicationCard