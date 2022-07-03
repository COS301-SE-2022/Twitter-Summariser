import dynamoDBClient from "../model/database";
import CreatorService from "./creator.service"
import ReportService from "./report.service";
import ReportBlockService from "./reportBlock.service";
import ResultSetService from "./resultSet.service";
import TweetService from "./tweet.service";
import TextStyleService from "./textStyles.service";
import PermissionsService from "./permissions.service";


const reportService = new ReportService(dynamoDBClient());
const creatorService = new CreatorService(dynamoDBClient());
const resultSetServices = new ResultSetService(dynamoDBClient());
const tweetService = new TweetService(dynamoDBClient());
const reportBlockService = new ReportBlockService(dynamoDBClient());
const textStyleService = new TextStyleService(dynamoDBClient());
const permissionsService = new PermissionsService(dynamoDBClient());

export default { creatorService, resultSetServices, tweetService, reportService, reportBlockService, textStyleService, permissionsService };

