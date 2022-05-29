import type { AWS } from '@serverless/typescript';
import { getAllCreators, addCreator } from '@functions/creator';


const serverlessConfiguration: AWS = {
    service: 'twitter-summariser',
    frameworkVersion: '3',
    plugins: [
        'serverless-esbuild',
        'serverless-offline',
        'serverless-dynamodb-local',
        'serverless-s3-sync'
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },

        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },

        iam: {
            role: {
                statements: [{
                    Effect: "Allow",
                    Action: [
                        "dynamodb:DescribeTable",
                        "dynamodb:Query",
                        "dynamodb:Scan",
                        "dynamodb:GetItem",
                        "dynamodb:PutItem",
                        "dynamodb:UpdateItem",
                        "dynamodb:DeleteItem",
                    ],
                    Resource: "arn:aws:dynamodb:us-east-1:*:table/CreatorTable",
                }],
            },
        },
    },

    // import the function via paths
    functions: {
        getAllCreators,
        addCreator
    },

    package: {
        individually: true
    },

    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },

        dynamodb: {
            start: {
                image: "dynamodb-local-latest", 
                docker: true,
                port: 8000,
                inMemory: true,
                migrate: true,
                seed: true,
                convertEmptyValues: true
            },
            stages: "dev"
        },

        s3sync: {
            bucketName: "twitter-summariser",
            localDir: "client/build/"
        }
    },

    resources: {
        Resources: {
            CreatorTable: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: "CreatorTable",
                    AttributeDefinitions: [{
                        AttributeName: "apiKey",
                        AttributeType: "S",
                    },
                    {
                        AttributeName: "email",
                        AttributeType: "S"
                    }],
                    KeySchema: [{
                        AttributeName: "apiKey",
                        KeyType: "HASH"
                    },
                    {
                        AttributeName: "email",
                        KeyType: "RANGE"
                    }],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    },

                }
            },

            TwitterSummariserApp: {
                Type: "AWS::S3::Bucket",
                Properties: {
                    BucketName: "twitter-summariser",
                    AccessControl: "PublicRead",
                    WebstieConfiguration: {
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
                        Statement: {
                            Sid: "PublicReadGetObject",
                            Effect: "Allow",
                            Principal: "*",
                            Action: {
                                s3: "GetObject"
                            },
                            Resource: "arn:aws:s3:::twitter-summariser"
                        }
                    }
                }
            },

            CloudFrontDistribution: {
                Type: "AWS::CloudFront:Dsitribution"

            }
        }
    }
};

module.exports = serverlessConfiguration;
