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
        events: []
    }

    // gets events for user
    getEvents = () => {
        apiManager.get("events")
            .then(events => {
                this.setState({ events: events })
            })
    }

    componentDidMount() {
        this.getEvents()
    }

    render() {
        return (
            <React.Fragment>
                <h1>My Events</h1>
                <EventForm />
                <section className="event-list">
                    {this.state.events.map(event =>
                        <EventCard
                            key={event.id}
                            event={event}
                        />
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default EventList