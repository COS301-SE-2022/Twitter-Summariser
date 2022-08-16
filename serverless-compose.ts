const serverlessCompose = {
    services: {
        twitterSummariser: {
            path: './app',
        },
        textSummariser: {
            path: './lib',
        }
    }
}

module.exports = serverlessCompose;
