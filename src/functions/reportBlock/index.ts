import { handlerPath } from "@libs/handler-resolver";

export const editBlock = {
    handler: `${handlerPath(__dirname)}/handler.editBlock`,
    description: "A function that edits a Block.",
    events: [
        {
            http: {
                method: "post",
                path: "editBlock/",
                cors: true,
                authorizer: {
                    name: "verifyJWT",
                    type: "Token"
                }
            }
        }
    ]
};

// Deleting a result report
export const deleteReportBlock = {
    handler: `${handlerPath(__dirname)}/handler.deleteReportBlock`,
    description: "A function that deletes a report a block.",
    events: [
        {
            http: {
                method: "post",
                path: "deleteReportBlock/",
                cors: true,
                authorizer: {
                    name: "verifyJWT",
                    type: "Token"
                }
            }
        }
    ]
};
