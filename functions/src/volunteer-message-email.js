'use strict'

const functions = require('firebase-functions')
const sendgridMail = require('@sendgrid/mail')

const mailer = sendgridMail.setApiKey(functions.config().sendgrid.apikey)

module.exports = functions.firestore.document('volunteers/{volunteerId}').onCreate((event) => {
  const newValue = event.data.data()
  console.log(newValue)

  console.log('Sendgrid email started')

  const message = {
    to: 'cjensen89@gmail.com',
    from: 'noreply@devdonor.com',
    subject: 'New notification',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  }

  sendgridMail
    .send(message)
    .then(() => {
      console.log('Sendgrid email sent')
    })
    .catch((err) => {
      console.error(err)
    })
})
