export default interface Schedule {
	id: string; // schedule id
	apiKey: string; // user
	keyword: string; // keyword to generate periodic report with
	sortOption: string;
	filterOption: string;
	period?: number; // in seconds
	date: Date;
	lastGenerated?: Date; // when last a report was generated
}
