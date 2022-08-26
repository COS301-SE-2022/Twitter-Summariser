import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
    service: "text-summarisation",
    frameworkVersion: "3",
    provider: {
        name: "aws",
        runtime: "python3.8",
        region: "us-east-1",
        timeout: 30,

    },

    functions: {
        summarise: {
            image: "534808114586.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:28495f9c063004b71a7aff9b3e23c91976e67b8617bba00529fd5764ed2ba76b",
            events: [
                {
                    http: {
                        method: "post",
                        path: "summarise"
                    }
                }
            ]
        }
    }
};

module.exports = serverlessConfiguration;