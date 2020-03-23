/*
    helper.js

    Purpose:    This module exports helper functions that can be imported into
                components. 

    Author(s): Ryan Crowley
*/

// modifies ISO String of datetime to populate datetime-local field
export default function toDTL(dateString) {
    // 2020-03-10T09:30:00Z
    // 2020-03-10T09:30
    // get date in correct order
    return dateString.slice(0,16)
}