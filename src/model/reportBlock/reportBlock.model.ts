export default interface reportBlock {
    id: string,
    reportID: string,
    blockType: "TWEET|RICHTEXT",
    position: number,
    richText?: string,
    tweetID?: string
}