const Twitter = require('twitter-v2');
require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
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