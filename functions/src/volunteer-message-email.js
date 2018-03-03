'use strict'

const functions = require('firebase-functions')
const sengridMail = require('@sendgrid/mail')
const config = functions.config()
const mailer = sengridMail.setApiKey(config.sendgrid.apikey)

module.exports = firestore.document('volunteers/{volunteerId}').onCreate((event) => {
  const newValue = event.data.data()

  console.log('Sendgrid email started')

  const message = {
    to: 'cjensen89@gmail.com',
    from: 'noreply@devdonor.com',
    subject: 'New notification',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  }

  mailer.send(message).then(() => {
    console.log('Sendgrid email sent')
  })
})
