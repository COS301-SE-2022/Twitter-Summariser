import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
	service: "text-extraction",
	frameworkVersion: "3",
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		region: "us-east-1",
		stage: "dev",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000"
		}
	},

	plugins: [
		"serverless-offline"
	],

	package: {
		individually: true
	},

	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ["aws-sdk"],
			target: "node14",
			define: {
				"require.resolve": undefined
			},
			platform: "node",
			concurrency: 10
		},

		"serverless-offline": {
			httpPort: 5000,
			websocketPort: 5001,
			lambdaPort: 5002
		}
	},

	functions: {
		app: {
			handler: "handler.handler",
			events: [
				{
					httpApi: "*"
				}
			]
		}
	}
};

module.exports = serverlessConfiguration;
