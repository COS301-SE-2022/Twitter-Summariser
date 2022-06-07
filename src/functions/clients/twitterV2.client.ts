import Twitter from "twitter-v2"

require('dotenv').config();

export const clientV2 = new Twitter({
    //consumer_key: process.env.TWITTER_CONSUMER_KEY,
    //consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAFPkcQEAAAAAQimZJHCD5ZqRX6B9sRmp5V0amjQ%3DxkoUm8DdJo7ClfpIoZy2Wcj4AvDN5tF7EvZUaYPT2A2gvSgtY1"
    //access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    //access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})