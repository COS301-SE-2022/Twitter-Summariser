import { Tweet } from "react-twitter-widgets";

function TweetComponent({ done, id }: any) {

	return (
			<Tweet
				options={{ align: "center", width: "" }}
				tweetId={id}
				onLoad={done}
			/>
	);
}

export default TweetComponent;
