import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Notification from "@model/notification/notification.model";


export default class NotificationService {
    private TableName = "NotificationTable";

    constructor(private docClient: DocumentClient) {};

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

    async addNotification(notification: Notification): Promise<Notification> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: notification
        }).promise();

        return notification as Notification;
        
    }
}