import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
    service: "text-summarisation",
    frameworkVersion: "3",
    provider: {
        name: "aws",
        stage: "prod",
        runtime: "python3.8",
        region: "us-east-1",
        timeout: 30
    },

    functions: {
        summarise: {
            image: "724052881296.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:6188e1ac8ea2b5fbd36e7446179ec01bbdf160cf4f1120b03bdec1336daace76",
            events: [
                {
                    http: {
                        method: "post",
                        path: "summarise",
                        cors: true
                    }
                }
            ]
        }
    }
};

module.exports = serverlessConfiguration;