export default interface Tweet {
	username: string; //Username of tweet maker
	fullname: string; //Fullname of tweet maker
	dateOT: Date; //Date tweet was made
	numComments: number; //Number of comments on tweet
	numLikes: number; //Number of likes of tweet
	numRetweets: number; //Number of times tweet was retweeted
	text: string; //Actual Tweet text
	tweetId: string; //Tweet ID
	resultSetId: string; //ID of the group that the tweet belongs to, either report xxx or resultset xxx
}
