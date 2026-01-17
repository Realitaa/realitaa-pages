import 'dotenv/config'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY
  }
})

const files = await fg('public/images/**/*.{jpg,jpeg,png,webp}')

for (const file of files) {
  const key = file.replace('public/images/', '') // images/...

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: fs.createReadStream(file),
      ContentType: 'image/webp'
    })
  )
}

console.log('Uploaded images to R2')
