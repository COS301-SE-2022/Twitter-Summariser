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
        // "serverless-python-requirements"
    ],

    package: {
        exclude: [
            "**/*"
        ],
        include: [
            "*.py",
            "pandas"
        ]
    },

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
            httpPort: 5000,
            websocketPort: 5001,
            lambdaPort: 5002
        },

        // "pythonRequirements": {
        //     dockerizePip: false,
        //     pythonBin: "/opt/python3.8/bin/python",
        //     zip: true
        // }

    }
};

module.exports = serverlessConfiguration;