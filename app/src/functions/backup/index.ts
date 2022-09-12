import { handlerPath } from "@libs/handler-resolver";

export const backupDynamoDB = {
    handler: `${handlerPath(__dirname)}/handler.backupDynamoDB`
}