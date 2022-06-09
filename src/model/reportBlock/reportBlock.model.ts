export default interface ReportBlock {
    reportBlockID: string,
    reportID: string,
    blockType: "TWEET"|"RICHTEXT",
    position: number,
    richText?: string,
    tweetID?: string
}