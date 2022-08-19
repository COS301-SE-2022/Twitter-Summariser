export default interface Schedule {
	id: string; // schedule id
	apiKey: string; // user
	keyword: string; // keyword to generate periodic report with
	period: number; // in seconds
	lastGenerated?: Date; // when last a report was generated
}
