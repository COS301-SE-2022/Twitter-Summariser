import Tweet from "@model/tweet/tweet.model";

export default class TweetService {

	async addTweets(data: any, includes: any, numTweets: number): Promise<Tweet[]> {
		this;
		const tweetList: Tweet[] = [];
		for (let i = 0; i < numTweets; i++) {
			if (i in includes.users) {
				tweetList.push({
					// username: includes.users[i].username,
					// fullname: includes.users[i].name,
					// dateOT: data[i].created_at,
					numComments: data[i].public_metrics.reply_count,
					numLikes: data[i].public_metrics.like_count,
					numRetweets: data[i].public_metrics.retweet_count,
					// text: data[i].text,
					tweetId: data[i].id,
					// resultSetId: GID
				});
			}
		}
		return tweetList as Tweet[];
	}

	async sortTweets(tweets: Tweet[], sortBy: string): Promise<Tweet[]> {
		this;
		if (sortBy === "byLikes") {
			tweets.sort((a, b) => {
				if (a.numLikes < b.numLikes) return 1;
				if (a.numLikes > b.numLikes) return -1;
				return 0;
			});
		} else if (sortBy === "byComments") {
			tweets.sort((a, b) => {
				if (a.numComments < b.numComments) return 1;
				if (a.numComments > b.numComments) return -1;
				return 0;
			});
		} else if (sortBy === "byRetweets") {
			tweets.sort((a, b) => {
				if (a.numRetweets < b.numRetweets) return 1;
				if (a.numRetweets > b.numRetweets) return -1;
				return 0;
			});
		}
		return tweets;
	}

	async createArray(tweets: Tweet[]): Promise<string[]>{
		this;
		const result=[];
		tweets.map(async tweet =>{
			result.push(tweet.tweetId);
		});
		return result;
	}
}
