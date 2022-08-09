import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
    service: "text-summarisation",
    frameworkVersion: "3",
    provider: {
        name: "aws",
        runtime: "python3.8"

    },
    plugins: [
        "serverless-offline"
    ],


    functions: {
        hello: {
            handler: "handler.hello",
            events: [
                {
                    http: {
                        method: "get",
                        path: "hello/"
                    }
                }
            ]
        }
    },

    custom: {
        "serverless-offline": {
            httpPort: 5000
        }
    }

}

module.exports = serverlessConfiguration;