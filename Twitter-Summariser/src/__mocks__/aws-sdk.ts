export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const getFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const putFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const queryFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const updateFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const deleteFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

export class DocumentClient {
	get = getFn;

	put = putFn;

	query = queryFn;

	update = updateFn;

	delete = deleteFn;
}

export const DynamoDB = {
	DocumentClient
};
