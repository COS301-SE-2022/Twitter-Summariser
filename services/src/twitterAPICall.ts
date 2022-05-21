const Twitter = require('twitter-v2');

const client = new Twitter({
    /*consumer_key: 'oRz2uK3yDaoe4TPzuPsDTsylF',
    consumer_secret: 'y7OOVr5A9Q236tpdBKtH2lScRFjQYcSH57Jn8DpKJd3LKrxhgl',
    access_token_key: '1522200413608775682-DV36volrmDcjPZeN2VYoDiu2uIQNV9',
    access_token_secret: 'aa7zEOnvuD9ZmXmPWqbTrZ1hwCQW594UaRQYG9iHC2zcm',*/
    consumer_key: ${{ secrets.TWITTER_CONSUMER_KEY }},
    consumer_secret: 'y7OOVr5A9Q236tpdBKtH2lScRFjQYcSH57Jn8DpKJd3LKrxhgl',
    access_token_key: '1522200413608775682-DV36volrmDcjPZeN2VYoDiu2uIQNV9',
    access_token_secret: 'aa7zEOnvuD9ZmXmPWqbTrZ1hwCQW594UaRQYG9iHC2zcm',
})

module.exports.getTweetHandler = async(event) => {
    const { data, includes, entities } = await client.get('tweets', {
        ids: '1228393702244134912,1227640996038684673,1199786642791452673',
        'expansions': 'author_id',
        'tweet.fields': 'public_metrics,author_id',
    })

    return {
        statusCode: 200,
        body: {
            data: data,
            includes: includes,
            input: event,
        }
    };
};