/*
    EventCard.js

    Purpose:    This component is responsible for displaying the information
                for a single event in the event list. Each card will have 
                buttons to edit or delete this specific event.
        
    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// DATA
import apiManager from '../../modules/apiManager'

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
    }

    // get job, update state
    getJobUpdateState = () => {
        apiManager.get(`jobs/${this.state.jobId}`)
            .then(job => {
                console.log(job)
                this.setState({
                    jobTitle: job.title,
                    companyName: job.company.name
                })
                console.log(this.state)
            })
    }

    componentDidMount() {
        this.getJobUpdateState()
    }

    render() {
        return (
            <React.Fragment>
                <div className="event-left">
                    <div className="event-job">
                        <h5><span>{this.state.companyName.toUpperCase()}</span> <span>{this.state.jobTitle}</span></h5>
                        <p>{this.state.details}</p>
                    </div>
                </div>
                <div className="event-right">
                    <p>Start: {this.state.startTime}</p>
                    <p>End: {this.state.endTime}</p>
                </div>
            </React.Fragment>
        )
    }
}

export default EventCard