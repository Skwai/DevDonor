'use strict'

const functions = require('firebase-functions')
const sendgridMail = require('@sendgrid/mail')
const admin = require('firebase-admin')

const { html, text } = require('./emails/new-volunteer-email')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const mailer = sendgridMail.setApiKey(functions.config().sendgrid.apikey)

module.exports = functions.firestore
  .document('projects/{projectId}/volunteers/{volunteerId}')
  .onCreate((event) => {
    const { projectId } = event.params
    const volunteerData = event.data.data()

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

        const emailData = {
          volunteerEmail: volunteerData.email,
          volunteerPicture: volunteerData.photoUrl,
          volunteerName: volunteerData.displayName,
          volunteerMessage: volunteerData.message,
          projectTitle: projectData.title
        }

        const subject = 'New project volunteer'

        const message = {
          subject,
          to: projectData.email,
          from: 'noreply@devdonor.com',
          replyTo: volunteerData.email,
          text: text(emailData),
          html: html(emailData)
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
        console.error(err)
      })
  })
