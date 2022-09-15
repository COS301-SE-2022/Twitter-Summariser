const serverlessCompose = {
    services: {
        twitterSummariser: {
            path: './app',
        },
        textSummariser: {
            path: './lib/text-summarisation',
        },
        textExtraction: {
            path: './lib/text-extraction',
        }
    }
}

module.exports = serverlessCompose;
