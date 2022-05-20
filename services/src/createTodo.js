export const handler = async(event) => {
    const sqs = new SQS();

    const payload = event.body || '';

    await sqs
        .sendMessage({
            QueueUrl: process.env.QUEUE_URL,
            MessageBody: payload,
        })
        .promise();
};