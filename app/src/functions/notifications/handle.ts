import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

export const getNotifications = middyfy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            const params = JSON.parse(event.body);

            const notifications = await ServicesLayer.notificationService.getReceiverNotifications(
                params.apiKey
            );

            return {
                statusCode: statusCodes.Successful,
                headers: header,
                body: JSON.stringify({Notifications: notifications})
            };
        } catch(e) {
            return {
                statusCode: statusCodes.internalError,
                headers: header,
                body: JSON.stringify(e)
            };
        };
    }
);

export const deleteNotification = middyfy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            const params = JSON.parse(event.body);

            await ServicesLayer.notificationService.deleteNotification(params.apiKey);

            return {
                statusCode: statusCodes.Successful,
                headers: header,
                body: JSON.stringify("Notification deleted successfully")
            };
        } catch(e) {
            return {
                statusCode: statusCodes.internalError,
                headers: header,
                body: JSON.stringify(e)
            };
        };
    }
);