/* tslint:disable:no-console */

import * as functions from 'firebase-functions'
import { Bucket, Storage } from '@google-cloud/storage'
import { spawn } from 'process-promises'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

const SIZES = [64, 128, 256, 512] // Resize target width in pixels

export default functions.storage.object().onChange(async (event) => {
  const object = event.data

  const fileBucket = object.bucket
  const filePath = object.name
  const contentType = object.contentType
  const resourceState = object.resourceState
  const metageneration = object.metageneration

  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.')
    return
  }

  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.')
    return
  }

  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.')
    return
  }

  const fileName = path.basename(filePath)

  const bucket = new Bucket(new Storage(), fileBucket)
  const tempFilePath = path.join(os.tmpdir(), fileName)
  const metadata = {
    contentType
  }

  await bucket.file(filePath).download({ destination: tempFilePath })

  const promises = SIZES.map(async (size) => {
    const newFileName = `${fileName}-${size}`
    const newFileTemp = path.join(os.tmpdir(), newFileName)
    const newFilePath = `thumbnails/${newFileName}`

    try {
      await spawn('convert', [tempFilePath, '-thumbnail', `${size}x${size}>`, newFileTemp])
      await bucket.upload(newFileTemp, {
        destination: newFilePath,
        metadata
      })
      await fs.unlinkSync(tempFilePath)
      console.log(`Thumbnail created at ${newFilePath}`)
    } catch (err) {
      console.error(err)
    }
  })

  await Promise.all(promises)
  console.log('Thumbnail creation completed')
})
