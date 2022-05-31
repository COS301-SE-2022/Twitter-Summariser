import Tweet from "../model/tweet.model";

export default class TweetService{
    private tweetList: any;
    static tweetServices: any;

    constructor() { }

    async getAllTweets(): Promise<Tweet[]> {
        return this.tweetList as Tweet[];
    }

    async addTweets(data:any, include:any, numTweets:number): Promise<Tweet[]> {
        for(let i =1; i < numTweets; i++){
            this.tweetList[i]={username: include['user'][i]['username'], fullname: include['user'][i]['name'], dateOT: data[i]['created_at'], numComments: data[i]['public_metrics']['reply_count'], numLikes: data[i]['public_metrics']['like_count'], numRetweets: data[i]['public_metrics']['retweet_count'], text: data[i]['text'], id: data[i]['id']};
        }
        console.log(JSON.stringify(this.addTweets));
        return this.tweetList as Tweet[];
    }
}