'use strict'

const functions = require('firebase-functions')
const sendgridMail = require('@sendgrid/mail')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const mailer = sendgridMail.setApiKey(functions.config().sendgrid.apikey)

module.exports = functions.firestore.document('volunteers/{volunteerId}').onCreate((event) => {
  const volunteerData = event.data.data()
  const { projectId } = volunteerData

  console.log('Sendgrid email started')

  if (!volunteerData.message) {
    console.error('Volunteer message missing')
    return null
  }

  if (!volunteerData.email) {
    console.error('Volunteer email missing')
    return null
  }

  return db
    .collection('projects')
    .doc(projectId)
    .get()
    .then((snapshot) => {
      const projectData = snapshot.data()

      if (!projectData.email) {
        console.error('Project is missing email')
        return null
      }

      const subject =
        'New project volunteer' + volunteerData.displayName
          ? ` - ${volunteerData.displayName}`
          : null

      const html = `
        <strong>You have a new volunteer for your project:</strong>
        <strong>${projectData.title}</strong>
        <br>
        <br>
        ${volunteerData.message}
      `

      const text = `
        You have a new volunteer for your project:
        ${projectData.title}

        ${volunteerData.message}
      `

      const message = {
        subject,
        to: projectData.email,
        from: 'noreply@devdonor.com',
        replyTo: volunteerData.email,
        text,
        html
      }

      console.log('Sending email to ' + projectData.email)

      return sendgridMail
        .send(message)
        .then(() => {
          console.log('Email sent')
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      console.error('Project does not exist')
    })
})
