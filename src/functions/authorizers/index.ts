import { handlerPath } from "@libs/handler-resolver";

export const verifyJWT = {
    handler: `${handlerPath(__dirname)}/handler.verifyJWT`,
    description: "A function that authorises the use of the endpoints."
};