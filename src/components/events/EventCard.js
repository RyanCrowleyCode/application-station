/*
    EventCard.js

    Purpose:    This component is responsible for displaying the information
                for a single event in the event list. Each card will have 
                buttons to edit or delete this specific event.
        
    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// COMPONENTS
import EditEventForm from './EditEventForm'

// DATA
import apiManager from '../../modules/apiManager'

// STYLES
import './EventCard.css'

class EventCard extends Component {
    now = new Date().toISOString()

    event = this.props.event
    eventId = this.props.event.id

    state = {
        details: this.event.details,
        startTime: this.event.start_time,
        endTime: this.event.end_time,
        jobId: this.event.job_id,
        jobTitle: '',
        companyName: '',
        loadingStatus: false
    }

    // get job, update state
    getJobUpdateState = () => {
        apiManager.get(`jobs/${this.state.jobId}`)
            .then(job => {
                this.setState({
                    jobTitle: job.title,
                    companyName: job.company.name
                })
            })
    }

    // get own even, update state
    getEventUpdateState = () => {
        apiManager.get(`events/${this.eventId}`)
            .then(event => {
                this.setState({
                    details: event.details,
                    startTime: event.start_time,
                    endTime: event.end_time,
                    jobId: event.job_id,
                })
            })
    }

    // handle delete
    handleDeleteEvent = () => {
        this.setState({ loadingStatus: true })
        let confirmation = window.confirm(
            "Are you sure you want to delete this event?"
        )
        if (confirmation) {
            apiManager.delete("events", this.eventId)
                .then(() => {
                    this.props.getEvents()
                })
        } else {
            this.setState({ loadingStatus: false })
        }
    }

    componentDidMount() {
        this.getJobUpdateState()
    }

    render() {
        return (
            <div className={`event-card 
                ${this.state.endTime < this.now ? "past-event" : null}`}>
                <div className="event-card-content">
                    <div className="event-card-content-top">
                        <div className="event-left">
                            <div className="event-job">
                                <p>{this.state.companyName.toUpperCase()}</p>
                                <p>{this.state.jobTitle}</p>
                            </div>
                        </div>
                        <div className="event-right">
                            <p>Start: {this.state.startTime}</p>
                            <p>End: {this.state.endTime}</p>
                        </div>
                    </div>
                    <div className="event-card-content-bottom">
                        <h5>** {this.state.details} **</h5>
                        <div className="buttons">
                            <EditEventForm
                                jobs={this.props.jobs}
                                key={`event_${this.eventId}`}
                                getJobUpdateState={this.getJobUpdateState}
                                getEventUpdateState={this.getEventUpdateState}
                                eventId={this.eventId}
                            />
                            <button
                                type="button"
                                className="btn btn-danger delete-list btn-sm"
                                onClick={() => this.handleDeleteEvent()}
                                disabled={this.state.loadingStatus}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventCard