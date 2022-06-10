export default interface Report {
    reportID: string,
    resultSetID: string,
    apiKey: string,
    dateCreated: string,
    title: string,
    author: string,
    tweets?: any,
    richtext?: any
};