export default interface Permission {
    reportID: string,
    apiKey: string,
    type: "OWNER" | "EDITOR" | "VIEWER"
};