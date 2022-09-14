import { S3 } from "aws-sdk";
import { z } from "zod";
import { env } from "../../env/server.mjs";
import { createProtectedRouter } from "./context";

const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
    region: env.REGION,
    signatureVersion: "v4"
})

export const imagesRouter = createProtectedRouter()
  .mutation("createPresignedUrl", {
    async resolve({  ctx }) {
      const image = await ctx.prisma.image.create({data:{}})
      console.log("live");
      
      return new Promise((resolve,reject) => {
        s3.createPresignedPost({
          Fields: {
            key: `categories/${image.id}`
          },
          Conditions: [
            ["starts-with","$Content-Type","image/"],
            ["content-length-range",0,1000000],
          ],
          Expires: 60,
          Bucket: env.BUCKET_NAME,
        }, (err,signed) => {
          if(err) return reject(err)
          resolve(signed)
        })
      })      
    },
  })
  