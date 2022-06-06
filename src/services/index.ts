import dynamoDBClient from "../model/database";
import CreatorService from "./creator.service"

const creatorService = new CreatorService(dynamoDBClient());
export default { creatorService };

