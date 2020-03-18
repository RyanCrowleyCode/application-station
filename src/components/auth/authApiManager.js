/*
    authApiManager.js

    Purpose:    This module contains authorization specific fetch calls to the
                database. This module leverages the power of apiManager.js.

    Author(s): Ryan Crowley
*/


const baseUrl = "http://localhost:8000"

export default {
    login(credentials) {
        /*
        example login credentials:
            {
                "username": "emailname@email.com",
                "password": "myAwesomePassword3#3029"
            }
        */
        return fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(response => {
                if ("valid" in response && response.valid && "token" in response) {
                    localStorage.setItem("appStationToken", response.token)
                    localStorage.setItem("appStationCred", true)
                } else {
                    alert("Username or password is incorrect.")
                }
            })
    },

    register(credentials) {
        /*
        example register credentials:
            {
                "email": "007@mi6.gov",
                "password": "shakennotstirred",
                "first_name": "James",
                "last_name": "Bond"
            }
        */
        return fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(response => {
                if ("token" in response) {
                    // place token in local storage and log in the user
                    localStorage.setItem("appStationToken", response.token)
                    localStorage.setItem("appStationCred", true)
                } else {
                    alert("That email address is already registered.")
                }
            })

    }
}