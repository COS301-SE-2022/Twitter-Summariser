import Tweet from "../model/tweet.model";

export default class TweetService{
    private tweetList: Tweet[];

    constructor() { 
        this.tweetList = new Array();
    }

    async getAllTweets(): Promise<Tweet[]> {
        return this.tweetList as Tweet[];
    }

    async addTweets(data:any, includes:any, numTweets:number): Promise<Tweet[]> {
        for(let i=0; i < numTweets; i++){
            this.tweetList.push({username: includes['user'][i]['username'], fullname: includes['user'][i]['name'], dateOT: data[i]['created_at'], numComments: data[i]['public_metrics']['reply_count'], numLikes: data[i]['public_metrics']['like_count'], numRetweets: data[i]['public_metrics']['retweet_count'], text: data[i]['text'], id: data[i]['id']});
        }
        console.log(JSON.stringify(this.addTweets));
        return this.tweetList as Tweet[];
    }
}