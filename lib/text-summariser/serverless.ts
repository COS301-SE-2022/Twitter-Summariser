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
            image: "534808114586.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:98cae20871d720ccdf26fa932bb7a5ef9e72cc77ffd12b8828096c55228326bf",
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