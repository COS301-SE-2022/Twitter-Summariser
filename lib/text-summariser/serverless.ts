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
            image: "724052881296.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:ee58211ee08223b98a65a1f38beef24f5f81eaba0f94a348a8ac8d26d76f4197",
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