/*
    defaultQuestions.js

    Purpose:    This module exports a function to create default questions
                when a new user is created.

    Author(s): Ryan Crowley
*/

// DATA
import apiManager from './apiManager'

const post = (question) => apiManager.post("questions", question)

// creates default questions in database for user
export default function createDefaultQuestions() {
    Promise.all([
        
        post({ 
            question: "Describe a difficult work situation or project and how you overcame it.",
            is_from_interviewer: true
        }),

        post({ 
            question: "How do you handle stress and pressure?",
            is_from_interviewer: true
        }),

        post({ 
            question: "What are you expecting in terms of salary or compensation?",
            is_from_interviewer: true
        }),

        post({ 
            question: "If you finished all your tasks early for the day, what would you do with the extra time?",
            is_from_interviewer: true
        }),
        post({ 
            question: "Why do you want this job?",
            is_from_interviewer: true
        }),

        post({ 
            question: "How are differences of opinions resolved between team members or management?",
            is_from_interviewer: false
        }),

        post({ 
            question: "Why do you want to leave (or have left) your current job?",
            is_from_interviewer: true
        }),

        post({ 
            question: "How does this team handle remote / work from home days?",
            is_from_interviewer: false
        }),

        post({ 
            question: "Will there be any expected travel for work?",
            is_from_interviewer: false
        }),

        post({ 
            question: "What are the expected work hours / days for this role? Is there any on-call or overtime?",
            is_from_interviewer: false
        }),

        post({ 
            question: "What was a time you had a disagreement with a team or team member, and how did you handle it?",
            is_from_interviewer: true
        }),

        post({ 
            question: "What does the on boarding process look like for my position?",
            is_from_interviewer: false
        }),


        post({ 
            question: "What is your greatest weakness?",
            is_from_interviewer: true
        }),

        post({ 
            question: "How would you define success for the role that I’m applying for?",
            is_from_interviewer: false
        }),

        post({ 
            question: "What is your greatest strength?",
            is_from_interviewer: true
        }),

        post({ 
            question: "What is your favorite thing about working for (this company)?",
            is_from_interviewer: false
        }),

        post({ 
            question: "Tell me about yourself.",
            is_from_interviewer: true
        })
    ])
}
    