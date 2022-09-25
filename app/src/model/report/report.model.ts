export default interface Report {
	reportID: string;
	resultSetID: string;
	apiKey: string;
	status: "DRAFT" | "PUBLISHED" | "DELETED";
	dateCreated: string;
	title: string;
	author: string;
	blockNumber: number;
	tweets?: any;
	richtext?: any;
	permission?: string;
	profileKey?: string;
}
