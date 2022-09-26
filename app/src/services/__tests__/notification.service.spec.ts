import Notification from "@model/notification/notification.model";
import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";
import NotificationService from "..";

const db = new DocumentClient();

describe("notification.service", () => {
	beforeAll(() => {
		jest.useFakeTimers("modern");
		jest.setSystemTime(new Date(2022, 1, 1));
	});

	beforeEach(() => {
		awsSdkPromiseResponse.mockReset();
	});

	describe("getNotification", () => {
		test("Get Notification", async () => {
			const addedNotification: Notification = {
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedNotification }));

			const notification = await NotificationService.notificationService.getNotification(
				"1234"
			);

			expect(db.get).toHaveBeenCalledWith({
				TableName: "NotificationTable",
				Key: { id: "1234" }
			});

			const expected: Notification = {
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			expect(notification).toEqual(expected);
		});
	});

	describe("getReceiverNotifications", () => {
		test("Get Receiver Notifications", async () => {
			const addedNotification: Notification = {
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(
				Promise.resolve({ Items: [addedNotification] })
			);

			const notifications = await NotificationService.notificationService.getReceiverNotifications(
				"jnrjNGgn"
			);
				
			expect(db.query).toHaveBeenCalledWith({
				TableName: "NotificationTable",
				IndexName: "receiverIndex",
				KeyConditionExpression: "receiver = :receiver",
				ExpressionAttributeValues: {
					":receiver": "jnrjNGgn"
				}
			});

			const expected: Notification[] = [
				{
					id: "1234",
					sender: "dfberki",
					receiver: "jnrjNGgn",
					type: "SHARE",
					content: "Report Title",
					isRead: false,
					dateCreated: "2022-01-01"
				}

			];

			expect(notifications).toEqual(expected);
		});
	});

	describe("getReceiverUnreadNotifications", () => {
		test("Get Receiver Unread Notifications", async () => {
			const addedNotification: Notification = {
				
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(
				Promise.resolve({ Items: [addedNotification] })
			);

			const notifications = await NotificationService.notificationService.getReceiverUnreadNotifications(
				"jnrjNGgn"
			);

			expect(db.query).toHaveBeenCalledWith({
				TableName: "NotificationTable",
				IndexName: "receiverIndex",
				KeyConditionExpression: "receiver = :receiver",
				FilterExpression: "#isRead = :isRead",
				ExpressionAttributeValues: {
					":receiver": "jnrjNGgn",
					":isRead": false
				},
				ExpressionAttributeNames: {
					"#isRead": "isRead"
				}
			});

			const expected: Notification[] = [
				{
					id: "1234",
					sender: "dfberki",
					receiver: "jnrjNGgn",
					type: "SHARE",
					content: "Report Title",
					isRead: false,
					dateCreated: "2022-01-01"
				}
			];

			expect(notifications).toEqual(expected);
		});
	});




	describe("addNotification", () => {
		test("Add Notification", async () => {
			const notification: Notification = {
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			await NotificationService.notificationService.addNotification(notification);
			expect(db.put).toHaveBeenCalledWith({
				TableName: "NotificationTable",
				Item: notification
			});
		});
	});

	describe("deleteNotification", () => {
		test("Delete notification", async () => {
			const notification: Notification = {
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: notification }));

			await NotificationService.notificationService.deleteNotification("1234");

			expect(db.delete).toHaveBeenCalledWith({
				TableName: "NotificationTable",
				Key: {
					id: "1234"
				}
			});
		});
	});

	describe("updateRead", () => {
		test("Update Read", async () => {
			const notification: Notification = {
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: notification }));

			await NotificationService.notificationService.updateRead("1234");

			expect(db.update).toHaveBeenCalledWith({
				TableName: "NotificationTable",
				Key: {
					id: "1234"
				},
				UpdateExpression: "SET #isRead = :isRead",
				ExpressionAttributeValues: {
					":isRead": true
				},
				ExpressionAttributeNames: {
					"#isRead": "isRead"
				}
			});
		});
	});

	describe("deleteNotification", () => {
		test("Delete notification", async () => {
			const notification: Notification = {
				id: "1234",
				sender: "dfberki",
				receiver: "jnrjNGgn",
				type: "SHARE",
				content: "Report Title",
				isRead: false,
				dateCreated: "2022-01-01"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: notification }));

			await NotificationService.notificationService.deleteNotification("1234");

			expect(db.delete).toHaveBeenCalledWith({
				TableName: "NotificationTable",
				Key: {
					id: "1234"
				}
			});
		});
	});
});
