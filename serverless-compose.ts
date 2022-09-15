const serverlessCompose = {
    services: {
        twitterSummariser: {
            path: './app',
        },
        textSummariser: {
            path: './lib/text-summarisation',
        }
    }
}

module.exports = serverlessCompose;
