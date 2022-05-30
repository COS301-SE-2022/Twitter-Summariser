import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import CreatorServices from "../../services";

import * as bcrypt from 'bcryptjs';


export const getAllCreators = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const creators = await CreatorServices.creatorService.getAllCreators();
    return formatJSONResponse({
        creators
    })
})

export const addCreator = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let apiKey : string;
    const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    apiKey="";
    
    for (let i=0; i<15; i++) {
        apiKey+=characters.charAt(Math.floor(Math.random()*characters.length)+0);
    }
    
    const params = JSON.parse(event.body);

    const hashedPass = bcrypt.hashSync(params.password, 10);
    
    try {
        const creator = await CreatorServices.creatorService.addCreator({
            apiKey: apiKey,
            email: params.email,
            username: params.username,
            password: hashedPass,
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

export const loginCreator = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return null;
})

