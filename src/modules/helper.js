/*
    helper.js

    Purpose:    This module exports helper functions that can be imported into
                components. 

    Author(s): Ryan Crowley
*/

// modifies ISO String of datetime to populate datetime-local field
export function toDTL(dateString) {
    // 2020-03-10T09:30:00Z
    // 2020-03-10T09:30
    // get date in correct order
    return dateString.slice(0,16)
}

// converts ISO String of datetime to a more pleasant UI date
export function printableDate(dateString) {
    // 2020-03-10T09:30:00Z
    // 01234567890123456789
    // formatting the date
    const month = dateString.slice(5, 7)
    const day = dateString.slice(8, 10)
    const year = dateString.slice(0, 4)
    const date = `${month}/${day}/${year}`

    // formatting the time
    let hour = dateString.slice(11, 13)
    const minutes = dateString.slice(14, 16)
    let amOrPm = "AM"

    if (parseInt(hour) >= 12) {
        amOrPm = "PM"
        if (parseInt(hour) > 12) {
            hour = (parseInt(hour) - 12).toString()
        }
    } else if (hour[0] === "0") {
        hour = hour[1]
    }

    const time = `${hour}:${minutes} ${amOrPm}`

    let newDateString = `${date} ${time}`

    return newDateString
}