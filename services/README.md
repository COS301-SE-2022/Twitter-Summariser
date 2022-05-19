# Welcome to The Twitter-Summarizer Back-end

## Setting up
1. As always start by fetching all dependencies using:
```bash
npm install
```

## Developing and Testing offline

### AWS Lambda
AWS Lambda functionality can be run locally using the serverless plugin: serverless-offline
- please note: "This plugin simulates API Gateway for many practical purposes, good enough for development - but is not a perfect simulator. Specifically, Lambda currently runs on Node.js v10.x, v12.x and v14.x (AWS Docs), whereas Offline runs on your own runtime where no memory limits are enforced. "
for more information please refer to [Serverless-Offline](https://www.serverless.com/plugins/serverless-offline)

#### Usefull Commands
1. To run serverless locally:
```bash
serverless offline
```
or
```bash
sls offline
```
2. To run specific AWS Lambda functions offline:
```bash
serverless invoke local --function functionName
```

3. To Invoke a Lambda function with data:
```bash
serverless invoke local --function functionName --data '{"a":"bar"}'
```
or 
```bash
serverless invoke local --function functionName --raw --data "hello world"
```

### AWS DynamoDB:
AWS DynamoDB functionality can also be tested local using plugin: Serverless-dynamodb-local
- The DynamoDB Local instance will run a local Java program by default or a docker container can be used. As always the configuration of DynamoDB will be done in the serverless.yml configure file. AWS Lambda and other parts of code can also make code use of the offline instances of databases. for more info [Serverless-dynamodb-local](https://www.serverless.com/plugins/serverless-dynamodb-local)

#### Usefull Commands
1. To start dynamodb
```bash
serverless dynamodb start
```

2. Please note the this command automatically triggers command 1
```bash
serverless offline
```
or
```bash
sls offline
```

## Deploying
Deploying will be very interesting as Serverless will be deployed inconjuction with AWS CDK, actual it kinda of "latches on" to AWS CDK and uses it's resources to deploy it's self and it might need function by function integration let me figure it out and test it and the read me will contain all the relevant commands and information

## Use full resources:
1. Using AWS Dynamodb Client: [serverless-dynamodb-client](https://www.serverless.com/plugins/serverless-dynamodb-client)
2. Using AWS Dynamodb x AWS Lambda [DynamoDB with Serverless Framework: The Ultimate Guide](https://www.dynobase.dev/dynamodb-serverless-framework/)
3. Documentation for DynamoDB local: [DynamoDB Local](https://www.serverless.com/plugins/serverless-dynamodb-local)
4. Documentation for Serverless Offline [Serverless Offline](https://www.serverless.com/plugins/serverless-offline)
5. Documentation for running AWS Lambda functions on serverless [Serverless x AWS Lambda](https://www.serverless.com/framework/docs/providers/aws/guide/functions)
6. Rest API with serverless x AWS Lambda x AWS DynamoDB x Nodejs [Rest API](https://www.serverless.com/blog/node-rest-api-with-serverless-lambda-and-dynamodb)
