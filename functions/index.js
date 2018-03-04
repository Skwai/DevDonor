'use strict'

// https://firebase.google.com/docs/functions/write-firebase-functions

const generateThumbnail = require('./src/generate-thumbnail')
const volunteerMessageEmail = require('./src/volunteer-message-email')

module.exports = {
  generateThumbnail,
  volunteerMessageEmail
}
