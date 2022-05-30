import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import CreatorServices from "../../services";


export const getAllCreators = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const creators = await CreatorServices.creatorService.getAllCreators();
    return formatJSONResponse({
        creators
    })
})

export const addCreator = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params = JSON.parse(event.body);
    // console.log(params);
    try {
        const creator = await CreatorServices.creatorService.addCreator({
            apiKey: 'ABCDER',
            email: params.email,
            username: params.username,
            password: params.password,
            dateOfBirth: params.dateOfBirth,
            dateRegistered: new Date().toISOString(),

        })
        return formatJSONResponse({
            creator
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: JSON.stringify(e)
        });
    }
})

