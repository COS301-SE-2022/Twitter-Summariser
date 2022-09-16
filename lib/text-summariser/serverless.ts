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
            image: "390572845174.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:043fb770fc9228563a96710574d1de4044bf1af280a5a7156d05f9a825164a02",
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