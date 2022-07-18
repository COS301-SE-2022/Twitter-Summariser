export default interface Permission {
	reportID: string;
	apiKey: string;
	type: "EDITOR" | "VIEWER";
}
