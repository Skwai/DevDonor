'use strict'

// https://firebase.google.com/docs/functions/write-firebase-functions

const generateThumbnail = require('./src/generate-thumbnail')
const volunteerMessageEmail = require('./')

exports.generateThumbnail = generateThumbnail
exports.volunteerMessageEmail = volunteerMessageEmail
