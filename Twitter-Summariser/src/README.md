<h1 align="center" style="font-family: Jetbrains Mono">Backend Folder Structure: </h1>

The backend code base is mainly located within the `src` folder. This folder is divided in:
- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas
- `services` - containing code to handle the business logic of the lambdas
- `models` - containing code that has the schema definition and connection to database
- `__mocks__` - containing code for mocking database for unit and integration tests

```
│   README.md
│
├───functions                                       # Lambda configuration and source code folder
│   ├───creator                                     
│   │       handler.ts                              # `creator` lambda source code
│   │       index.ts                                # `creator` lambda Serverless configuration
│   │
│   ├───report
│   │       handler.ts
│   │       index.ts                                
│   │
│   ├───reportBlock
│   │       handler.ts
│   │       index.ts                                
│   │
│   ├───resources                                   # Contains code to interact with the Twitter API
│   │       APIresponse.ts
│   │       twitterV2.client.ts
│   │
│   ├───resultSet
│   │       handler.ts                              
│   │       index.ts                                
│   ├───tweet
│   │       handler.ts
│   │       index.ts
│   │
│   └───__tests__                                   # All function tests folder
│       └───inte                                    # Integration tests folder 
│               editblock.handler.int.ts
│               generateReport.handler.int.ts
│
├───libs                                            # Lambda shared code
│       api-gateway.ts                              # API Gateway specific helpers
│       handler-resolver.ts                         # Sharable library for resolving lambda handlers
│       lambda.ts                                   # Lambda middleware
│
├───model                                           # Definition of schema and connection to database(DynamoDB)
│   │   database.ts
│   │
│   ├───creator
│   │       creator.model.ts
│   │       index.ts
│   │
│   ├───report
│   │       index.ts
│   │       report.model.ts
│   │
│   ├───reportBlock
│   │       index.ts
│   │       reportBlock.model.ts
│   │
│   ├───resultSet
│   │       index.ts
│   │       resultSet.model.ts
│   │
│   ├───textStyles
│   │       index.ts
│   │       textStyles.model.ts
│   │
│   └───tweet
│           index.ts
│           tweet.model.ts
│
├───services                                        # Business handler functions
│   │   creator.service.ts
│   │   index.ts
│   │   report.service.ts
│   │   reportBlock.service.ts
│   │   resultSet.service.ts
│   │   textStyles.service.ts
│   │   tweet.service.ts
│   │
│   └───__tests__                                   # Business handler functions tests folder
│           creator.service.spec.ts
│           report.service.spec.ts
│           resultSet.service.spec.ts
│
└───__mocks__                                       # Contains code for mocking database for unit and integration tests
        aws-sdk.ts
```
<br>
<h2>3rd Party Libraries: </h2>

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file