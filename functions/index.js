'use strict'

// https://firebase.google.com/docs/functions/write-firebase-functions

const generateThumbnail = require('./src/generate-thumbnail')
const newVolunteerEmail = require('./src/new-volunteer-email')

module.exports = {
  generateThumbnail,
  newVolunteerEmail
}
