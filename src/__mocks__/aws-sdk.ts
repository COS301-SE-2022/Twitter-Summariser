export const awsSdkGetPromiseResponse = jest.fn().mockReturnValue(Promise.resolve({ Item: {}}));

export const awsSdkPutPromiseResponse = jest.fn().mockReturnValue(
    Promise.resolve({
        ConsumedCapacity: 1,
        Attributes: {},
        ItemCollectionMetrics: {}
    })
);

export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const getFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse}));

const putFn = jest.fn().mockImplementation(() => ({promise: awsSdkPromiseResponse}));

const queryFn = jest.fn().mockImplementation(() => ({promise: awsSdkPromiseResponse}));
export class DocumentClient {
    get = getFn;
    put = putFn;
    query = queryFn;
}

export const DynamoDB = {
    DocumentClient
};