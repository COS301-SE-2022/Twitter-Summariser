const serverlessCompose = {
    services: {
        twitterSummariser: {
            path: './app',
        },
        textSummariser: {
            path: './lib/text-summariser',
        },
        textExtraction: {
            path: './lib/text-extraction',
        }
    }
}

module.exports = serverlessCompose;
