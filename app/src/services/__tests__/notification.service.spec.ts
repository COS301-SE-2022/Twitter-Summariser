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
        test("Get Notification",async () => {
            const addedNotification: Notification = {
                id: "1234",
                sender: "dfberki",
                receiver: "jnrjNGgn",
                type: "SHARE",
                content: "Report Title",
                isRead: false,
                dateCreated: "2022-01-01"
            };

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedNotification}));

            const notification = await NotificationService.notificationService.getNotification("1234");

            expect(db.get).toHaveBeenCalledWith({
                TableName: "NotificationTable",
                Key: { id: "1234"}
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

    describe("addNotification", () => {
        test("Add Notification",async () => {
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
        })
    })
})