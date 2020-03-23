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
            <div className="event-card">
                <div className="event-left">
                    <div className="event-job">
                        <h5><span>{this.state.companyName.toUpperCase()}</span> <span>{this.state.jobTitle}</span></h5>
                        <p>{this.state.details}</p>
                    </div>
                </div>
                <div className="event-right">
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
                    <p>Start: {this.state.startTime}</p>
                    <p>End: {this.state.endTime}</p>
                </div>
            </div>
        )
    }
}

export default EventCard