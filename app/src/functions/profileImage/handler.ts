import { statusCodes } from "@functions/resources/APIresponse";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import * as fileType from "file-type";
import * as AWS from "aws-sdk";
import middy from "@middy/core";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
const s3 = new AWS.S3();

export const profileImageUpload = middy(async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const body = JSON.parse(event.body);

        if (!body || !body.image || !body.mime) {
            return {
                statusCode: statusCodes.badRequest,
                body: JSON.stringify({
                    message: "Incorrect body on request"
                })
            };
        }

        if (!allowedMimes.includes(body.mime)) {
            return {
                statusCode: statusCodes.badRequest,
                body: JSON.stringify({
                    message: "Mime is not allowed"
                })
            };
        }

        const imageData = (body.image.substr(0, 7) == "base64,") ? body.image.substr(7, body.image.length) : body.image;
        const imageBuffer = Buffer.from(imageData, "base64");
        const fileInfo = await fileType.fileTypeFromBuffer(imageBuffer);
        const fileExtension = fileInfo.ext;
        const fileMime = fileInfo.mime;

        if (fileMime != body.mime) {
            return {
                statusCode: statusCodes.badRequest,
                body: JSON.stringify({
                    message: "Mime types do not match"
                })
            };
        }

        const jwtToken = event.headers.Authorization;

        const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
        const key = `${decodedToken.username}.${fileExtension}`;
        console.log("Writing image to bucket called " + key);

        await s3.putObject({
            Body: imageBuffer,
            Key: key,
            ContentType: body.mime,
            Bucket: "twitter-summariser-images",
            ACL: "public-read"
        }).promise();

        return {
            statusCode: statusCodes.Successful,
            body: JSON.stringify({
                message: "Image uploaded successfully!"
            })
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: statusCodes.badRequest,
            body: JSON.stringify({
                message: "Failed to upload image"
            })
        };
    }

}); 