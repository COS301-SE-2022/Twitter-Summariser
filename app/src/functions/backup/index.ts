import { handlerPath } from "@libs/handler-resolver";

export const backupDynamoDB = {
    handler: `${handlerPath(__dirname)}/handler.backupDynamoDB`,
    description: "A function to create automated backups of the database tables.",
    memorySize: 128,
    timeOut: 5,
    events: [
        {
            schedule: "rate(5 minutes)"
        }
    ]
}