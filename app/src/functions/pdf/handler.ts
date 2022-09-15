import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import middy from "@middy/core";


export const pdfUpload = middy(
    async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
        try {
            const body = JSON.parse(event.body);

            if (!body || !body.files || !body.files.pdfFile) {
                return {
                    statusCode: statusCodes.badRequest,
                    headers: header,
                    body: JSON.stringify({
                        message: "Incorrect body on request"
                    })
                };
            }

            return {
                statusCode: statusCodes.Successful,
                headers: header,
                body: JSON.stringify({
                    message: "PDF uploaded successfully"
                })
            };

        } catch (error) {
            console.error("Error uploading pdf: ", error);
            return {
                statusCode: statusCodes.internalError,
                headers: header,
                body: JSON.stringify({
                    message: "Error uploading pdf"
                })
            };
        }
    }
);

