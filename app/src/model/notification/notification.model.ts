export default interface Notification {
    id: string,
    sender: string | "SYSTEM",
    receiver: string,
    type: string,
    content: string,
    isRead: boolean,
    dateCreated: string
}