/*
    helper.js

    Purpose:    This module exports helper functions that can be imported into
                components. 

    Author(s): Ryan Crowley
*/

// gets token for logged in user
export function getToken() {
    return localStorage.getItem("appStationToken")
}