import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Notification from "@model/notification/notification.model";


export default class NotificationService {
    private TableName = "NotificationTable";

    constructor(private docClient: DocumentClient) {};

    async getNotification(id: string): Promise<Notification> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: { id: id}
        }).promise();

        return result.Item as Notification;
    };
    async getReceiverNotifications(receiver: string): Promise<Notification[]> {
      const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "receiverIndex",
            KeyConditionExpression: "receiver = :receiver",
            ExpressionAttributeValues: {
                ":receiver": receiver
            }
        }).promise();
        
        return result.Items as Notification[];
    };

    async getReceiverUnreadNotifications(receiver: string): Promise<Notification[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "receiverIndex",
            KeyConditionExpression: "receiver = :receiver",
            FilterExpression: "#isRead = :isRead",
            ExpressionAttributeValues: {
                ":receiver": receiver,
                ":isRead": false
            },
            ExpressionAttributeNames: {
                "#isRead": "isRead"
            }
        }).promise();

        return result.Items as Notification[];
    };

    async addNotification(notification: Notification): Promise<Notification> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: notification
        }).promise();

        return notification as Notification;
        
    }

}