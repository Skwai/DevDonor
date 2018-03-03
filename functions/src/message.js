'use strict'

const functions = require('firebase-functions')
const sendgrid = require('@sendgrid/mail')
const config = functions.config()

const mail = sendgrid.setApiKey(config.sendgrid.apikey)

const message = {
  to: 'test@example.com',
  from: 'noreply@devdonor.com',
  subject: 'New notification',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
}

mail.send(message).then(() => {
  console.log('Sendgrid email sent')
})
