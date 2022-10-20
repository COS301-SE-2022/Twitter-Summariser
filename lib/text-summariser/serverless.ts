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
            image: "534808114586.dkr.ecr.us-east-1.amazonaws.com/text-summarisation@sha256:dc71e3774bd8c4e1dcd827887ff1d6abf89d8976bc63c261904df3539468cac2",
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