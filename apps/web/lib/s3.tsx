// 'use server'
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
//
// const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID as string
// const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY as string
// const BUCKET_NAME = process.env.AWS_S3_BUCKET as string
// const REGION_NAME = process.env.AWS_S3_REGION as string
// let client = new S3Client({
//   credentials: {
//     accessKeyId: AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
//   },
//   region: REGION_NAME,
// })
// export async function uploadSingle(formData: FormData, key: string) {
//   const file = formData.get('file') as File
//   const command = new PutObjectCommand({
//     Bucket: BUCKET_NAME,
//     Key: key,
//     Body: (await file.arrayBuffer()) as Buffer,
//     ACL: 'public-read',
//     ContentType: file.type,
//   })
//   await client.send(command)
//   return `https://${BUCKET_NAME}.s3.${REGION_NAME}.amazonaws.com/${key}`
// }
