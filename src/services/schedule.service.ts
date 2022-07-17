import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Schedule from "@model/schedule/schedule.model";

export default class ScheduleService {
    private TableName = "ScheduleTable";

    constructor(private docCLient: DocumentClient) {}

    async getSchedule(id: string): Promise<Schedule> {
        const result = await this.docCLient.get({
            TableName: this.TableName,
            Key: { id }
        }).promise();

        return result.Item as Schedule;
    }

    async getShedules(key: string): Promise<Schedule[]> {
        const result = await this.docCLient.query({
            TableName: this.TableName,
            IndexName: "scheduleIndex",
            KeyConditionExpression: "apiKey = :apiKey",
            ExpressionAttributeValues: {
                ":apiKey": key
            }
        }).promise();

        return result.Items as Schedule[];
    }

    async addScheduleSetting(scheduleSetting: Schedule): Promise<Schedule> {
        await this.docCLient.put({
            TableName: this.TableName,
            Item: scheduleSetting
        }).promise();

        return scheduleSetting as Schedule;
    }
}