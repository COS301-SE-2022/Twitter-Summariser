import dynamoDBClient from "../model/database";
import CreatorService from "./creator.service"
import ResultSetService from "./resultSet.service";
import TweetService from "./tweet.service";

const creatorService = new CreatorService(dynamoDBClient());
const resultSetServices = new ResultSetService(dynamoDBClient());
const tweetService = new TweetService(dynamoDBClient());

export default { creatorService, resultSetServices, tweetService };

