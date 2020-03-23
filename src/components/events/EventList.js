/*
    EventList.js

    Purpose:    This component is responsible for rendering the EventList component.
                This component will render a list EventCard child components.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// COMPONENTS
import EventCard from './EventCard'
import EventForm from './EventForm'

// DATA
import apiManager from '../../modules/apiManager'

class EventList extends Component {
    state = {
        events: [],
        jobs: []
    }

    // gets events for user
    getEvents = () => {
        apiManager.get("events")
            .then(events => {
                this.setState({ events: events })
            })
    }

    componentDidMount() {
        apiManager.get("jobs")
        .then(jobs => {
            this.setState({ jobs: jobs})
            this.getEvents()
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>My Events</h1>
                <EventForm 
                    getEvents={this.getEvents}
                />
                <section className="event-list">
                    {this.state.events.map(event =>
                        <EventCard
                            jobs={this.state.jobs}
                            key={event.id}
                            event={event}
                            getEvents={this.getEvents}
                        />
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default EventList