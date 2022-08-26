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
            image: "534808114586.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:a1c70cf75819244b22e0fb285a3454c389421a5f9ecccdc1b22b183630f1cf09",
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