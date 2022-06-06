import Report from "@model/Report/report.model";
import { DocumentClient } from "src/__mocks__/aws-sdk";

export default class ReportService{
    private TableName: string = "ReportTable";

    constructor(private docClient: DocumentClient) {}

    async getReport(report: Report) : Promise<Report> {

        return report;
    }
}