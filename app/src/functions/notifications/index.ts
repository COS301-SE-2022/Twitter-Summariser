import { handlerPath } from "@libs/handler-resolver";

export const getNotifications = {
    handler: `${handlerPath(__dirname)}/handler.getNotifications`,
    description: "A function to get all notifications of a specific user",
    events: [
        {
            http: {
                method: "post",
                path: "getNotifications/",
                cors: true
            }
        }
    ]
}