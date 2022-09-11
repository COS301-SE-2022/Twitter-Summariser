export default interface Tweet {
	numComments: number; // Number of comments on tweet
	numLikes: number; // Number of likes of tweet
	numRetweets: number; // Number of times tweet was retweeted
	tweetId: string; // Tweet ID
	text?: string;
}
