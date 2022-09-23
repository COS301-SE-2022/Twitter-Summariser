import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
    service: "text-summarisation",
    frameworkVersion: "3",
    provider: {
        name: "aws",
        runtime: "python3.8",
        region: "us-east-1",
        timeout: 30
    },

    functions: {
        summarise: {
            image: "626449495923.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:7493c15203ae8ce762d57ee7a82a3fafdc5f07500c542163d18b76ff701b43b7",
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