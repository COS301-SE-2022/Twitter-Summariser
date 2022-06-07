import Twitter from "twitter-v2"

require('dotenv').config();

export const clientV2 = new Twitter({
    //consumer_key: process.env.TWITTER_CONSUMER_KEY,
    //consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.BEARER_TOKEN
    //access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    //access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})