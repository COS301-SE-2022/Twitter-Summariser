const serverlessCompose = {
    services: {
        twitterSummariser: {
            path: './Twitter-Summariser',
        },
        textSummariser: {
            path: './Text-Summarisation',
        }
    }
}

module.exports = serverlessCompose;
