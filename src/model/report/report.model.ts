export default interface Report {
    reportID: string,
    resultSetID: string,
    apiKey: string,
    dateCreated: Date,
    title: string,
    author: string,
    tweets?: any,
    richtext?: any
};