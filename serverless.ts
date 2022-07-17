import type { AWS } from "@serverless/typescript";
import { verifyJWT } from "@functions/authorizers";
import { getAllCreators, addCreator, loginCreator } from "@functions/creator";
import { searchTweets } from "@functions/tweet";
import { CreatorTable } from "@model/creator/index";
import { ResultSetTable } from "@model/resultSet";
import { ReportTable } from "@model/report";
import { ReportBlockTable } from "@model/reportBlock";
import { TextStylesTable } from "@model/textStyles";
import { PermissionTable } from "@model/permission";
import { ScheduleTable } from "@model/schedule";
import { getAllResultSet, getResultSet, deleteResultSet } from "@functions/resultSet";
import {
	getAllMyDraftReports,
	getAllPublishedReports,
	getReport,
	generateReport,
	cloneReport,
	publishReport,
	shareReport,
	addCustomTweet,
	unpublishReport,
	deleteReport,
	getSharedReport,
	getAllMyPublishedReports
} from "@functions/report";
import { editBlock, deleteReportBlock } from "@functions/reportBlock";

const serverlessConfiguration: AWS = {
	service: "twitter-summariser",
	frameworkVersion: "3",
	plugins: [
		"serverless-esbuild",
		"serverless-dynamodb-local",
		// "serverless-s3-sync",
		"serverless-offline"
	],
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},

		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000"
		},
		iam: {
			role: {
				statements: [
					{
						Effect: "Allow",
						Action: [
							"dynamodb:DescribeTable",
							"dynamodb:Query",
							"dynamodb:Scan",
							"dynamodb:GetItem",
							"dynamodb:PutItem",
							"dynamodb:UpdateItem",
							"dynamodb:DeleteItem"
						],
						Resource: "arn:aws:dynamodb:us-east-1:*:*"
					}
				]
			}
		}
	},

	// import the function via paths
	functions: {
		verifyJWT,
		getAllCreators,
		addCreator,
		loginCreator,
		searchTweets,
		getAllResultSet,
		getResultSet,
		generateReport,
		getAllPublishedReports,
		getAllMyDraftReports,
		getReport,
		editBlock,
		cloneReport,
		publishReport,
		shareReport,
		addCustomTweet,
		deleteReport,
		deleteResultSet,
		unpublishReport,
		getSharedReport,
		deleteReportBlock,
		getAllMyPublishedReports
	},

	package: {
		individually: true
	},

	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ["aws-sdk"],
			target: "node14",
			define: { "require.resolve": undefined },
			platform: "node",
			concurrency: 10
		},

		dynamodb: {
			start: {
				docker: true,
				port: 8000,
				inMemory: true,
				migrate: true,
				seed: true,
				convertEmptyValues: true,
				noStart: true
			},
			stages: "dev"
		},

		// s3Sync: [
		// 	{
		// 		bucketName: "twitter-summariser",
		// 		localDir: "client/build/"
		// 	}
		// ],

		"serverless-offline": {
			httpPort: 4000
		}
	},

	resources: {
		Resources: {
			CreatorTable,
			ResultSetTable,
			ReportTable,
			ReportBlockTable,
			TextStylesTable,
			PermissionTable,
			ScheduleTable,

			TwitterSummariserApp: {
				Type: "AWS::S3::Bucket",
				Properties: {
					BucketName: "twitter-summariser",
					AccessControl: "PublicRead",
					WebsiteConfiguration: {
						IndexDocument: "index.html",
						ErrorDocument: "index.html"
					}
				}
			},

			S3AccessPolicy: {
				Type: "AWS::S3::BucketPolicy",
				Properties: {
					Bucket: {
						Ref: "TwitterSummariserApp"
					},
					PolicyDocument: {
						Version: "2012-10-17",
						Statement: {
							Sid: "PublicReadGetObject",
							Effect: "Allow",
							Principal: "*",
							Action: "s3:GetObject",
							Resource: "arn:aws:s3:::twitter-summariser/*"
						}
					}
				}
			},

			CloudFrontDistribution: {
				Type: "AWS::CloudFront::Distribution",
				Properties: {
					DistributionConfig: {
						DefaultRootObject: "index.html",
						Origins: [
							{
								DomainName: "twitter-summariser.s3.amazonaws.com",
								Id: "TwitterSummariserApp",
								CustomOriginConfig: {
									HTTPPort: 80,
									HTTPSPort: 443,
									OriginProtocolPolicy: "https-only"
								}
							}
						],

						Enabled: true,

						CustomErrorResponses: [
							{
								ErrorCode: 404,
								ResponseCode: 200,
								ResponsePagePath: "/index.html"
							}
						],

						DefaultCacheBehavior: {
							AllowedMethods: [
								"DELETE",
								"GET",
								"HEAD",
								"OPTIONS",
								"PATCH",
								"POST",
								"PUT"
							],

							TargetOriginId: "TwitterSummariserApp",

							ForwardedValues: {
								QueryString: false,
								Cookies: {
									Forward: "none"
								}
							},

							ViewerProtocolPolicy: "redirect-to-https"
						},

						ViewerCertificate: {
							CloudFrontDefaultCertificate: true
						}
					}
				}
			}
		}
	}
};

module.exports = serverlessConfiguration;
