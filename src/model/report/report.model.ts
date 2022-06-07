export default interface Report {
    reportID: string,
    resultSetID: string,
    apiKey: string,
    dateCreated: Date,
    author: string,
    tweets?: any
};