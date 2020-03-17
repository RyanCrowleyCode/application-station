/*
    apiManager.js

    Purpose:    This module is responsible for making fetch calls to the
                database. This module is leveraged by other ApiManager 
                modules, as this apiManager.js is the template by which
                the other API Managers are created. Other API Managers will
                pass paramaters to apiManager.js for their own specific requests.

    Author(s): Ryan Crowley
*/

const baseUrl = 'http://localhost:8000'

export default {
    get(endpoint, params = "") {
        return fetch(`${baseUrl}/${endpoint}?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("appStationToken")}`
            }
        })
            .then(result => result.json())
    },

    post(endpoint, newObject) {
        return fetch(`${baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("appStationToken")}`
            },
            body: JSON.stringify(newObject)
        })
            .then(response => response.json())
    },

    update(endpoint, updatedObject) {
        return fetch(`${baseUrl}/${endpoint}/${updatedObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("appStationToken")}`
            },
            body: JSON.stringify(updatedObject)
        })
            .then(response => response.json())
    },

    delete(endpoint, id) {
        return fetch(`${baseUrl}/${endpoint}/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("appStationToken")}`
        },
        }).then((result) => result.json());
      }
}