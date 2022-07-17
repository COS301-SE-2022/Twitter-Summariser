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
}