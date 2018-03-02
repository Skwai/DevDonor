// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions'

import generateThumbnailFunction from './generate-thumbnail'

export const generateThumbnail = generateThumbnailFunction
