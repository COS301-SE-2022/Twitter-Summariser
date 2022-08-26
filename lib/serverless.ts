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
            image: "534808114586.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:fbe46ffcddc67cc1301da562437abd988bbdc29ac70c0f0ce8719500645c621e",
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