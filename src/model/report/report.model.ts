export default interface Report {
    reportID: string,
    resultSetID: string,
    apiKey: string,
    status: "DRAFT" | "PUBLISHED" | "DELETED",
    dateCreated: string,
    title: string,
    author: string,
    tweets?: any,
    richtext?: any
};