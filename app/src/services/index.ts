import dynamoDBClient from "../model/database";
import CreatorService from "./creator.service";
import ReportService from "./report.service";
import ReportBlockService from "./reportBlock.service";
import ResultSetService from "./resultSet.service";
import TextStyleService from "./textStyles.service";
import PermissionService from "./permission.service";
import TweetService from "./tweet.service";
import ScheduleService from "./schedule.service";

const reportService = new ReportService(dynamoDBClient());
const creatorService = new CreatorService(dynamoDBClient());
const resultSetServices = new ResultSetService(dynamoDBClient());
const reportBlockService = new ReportBlockService(dynamoDBClient());
const textStyleService = new TextStyleService(dynamoDBClient());
const tweetService = new TweetService();
const permissionService = new PermissionService(dynamoDBClient());
const scheduleService = new ScheduleService(dynamoDBClient());

export default {
	creatorService,
	tweetService,
	resultSetServices,
	reportService,
	reportBlockService,
	textStyleService,
	permissionService,
	scheduleService
};
