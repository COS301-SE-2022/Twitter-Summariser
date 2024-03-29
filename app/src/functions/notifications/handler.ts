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

			notifications.sort((a, b) => {
				return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
			});

			let responseArray = await notifications.reduce(async (result, notification) => {
				let resultArray = await result;
				const report = await ServicesLayer.reportService.getReport(notification.content);

				if (report.status !== "DELETED") {
					let senderUsername: string;
					let senderUrl: string;
					console.log(notification);
					if (notification.sender !== "SYSTEM") {
						const creator = await ServicesLayer.creatorService.getCreatorByKey(
							notification.sender
						);

						senderUsername = creator.username;
						senderUrl = creator.profileKey;
					} else {
						senderUsername = notification.sender;

						senderUrl = "assets/logo.png";
					}

					delete notification.sender;
					delete notification.receiver;

					resultArray.push({
						...notification,
						senderUsername: senderUsername,
						senderUrl: senderUrl,
						title: report.title
					});
				} else {
					ServicesLayer.notificationService.deleteNotification(notification.id);
				}
				return result;
			}, Promise.resolve([]));

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ notifications: responseArray })
			};
		} catch (e) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify(e)
			};
		}
	}
);

export const deleteNotification = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			await ServicesLayer.notificationService.deleteNotification(params.id);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify("Notification deleted successfully")
			};
		} catch (e) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify(e)
			};
		}
	}
);
