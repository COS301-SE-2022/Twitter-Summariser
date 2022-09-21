import { Lambda } from "aws-sdk";

const lambda = new Lambda();

export const warmupTextSummariser = async () => {
	try {

        const lambdaParams = {
				FunctionName: "text-summarisation-dev-summarise",
				InvocationType: "RequestResponse",
				Payload: JSON.stringify({ 
					text: "Hello World",
					min: 100,
					max: 200
				})
			};

        await lambda.invoke(lambdaParams, function(data, err) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }).promise();

        console.log("Warmup complete");
        
		
	} catch (error) {
		console.error(error);
	}
};