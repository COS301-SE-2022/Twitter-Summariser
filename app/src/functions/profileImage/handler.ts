import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import * as fileType from "file-type";
import * as AWS from "aws-sdk";
import middy from "@middy/core";
import CreatorServices from "../../services";

const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
const s3 = new AWS.S3();

export const profileImageUpload = middy(async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const body = JSON.parse(event.body);        

        if (!body || !body.image || !body.mime|| !body.name || !body.profile || !body.email) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({
                    message: "Incorrect body on request"
                })
            };
        }        

        if (!allowedMimes.includes(body.mime)) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({
                    message: "Mime is not allowed"
                })
            };
        }

        if (body.profile !== "assets/profile.png") {
            try {
                await s3.deleteObject({
                    Bucket: "twitter-summariser-images",
                    Key: body.profile
                }).promise();

            } catch (error) {
                console.error("Error deleting old image in s3: ", error);
            }
        }        

        const imageData = (body.image.substr(0, 7) == "base64,") ? body.image.substr(7, body.image.length) : body.image;
        const imageBuffer = Buffer.from(imageData, "base64");
        const fileInfo = await fileType.fileTypeFromBuffer(imageBuffer);
        const fileExtension = fileInfo.ext;
        const fileMime = fileInfo.mime;

        if (fileMime != body.mime) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({
                    message: "Mime types do not match"
                })
            };
        }

        await s3.putObject({
            Body: imageBuffer,
            Key: `${body.name}.${fileExtension}`,
            ContentType: body.mime,
            Bucket: "twitter-summariser-images",
            ACL: "public-read"
        }).promise();


        const isCreatorUpdated = await CreatorServices.creatorService.updateProfileKey(
            body.email,
            `${body.name}.${fileExtension}`
        );

        if (isCreatorUpdated === true) {
            return {
                statusCode: statusCodes.Successful,
                headers: header,
                body: JSON.stringify({
                    message: "Image uploaded successfully!",
                    profileKey: `${body.name}.${fileExtension}`
                })
            }
        } else {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({
                    message: "Error updating profile key"
                })
            }
        }
        
    } catch (error) {
        console.error(error);
        return {
            statusCode: statusCodes.badRequest,
            headers: header,
            body: JSON.stringify({
                message: "Failed to upload image"
            })
        };
    }
}); 