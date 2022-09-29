import MenuComponent from "./MenuComponent";
import TweetComponent from "./TweetComponent";

function TweetResponse({
	position,
	type,
	type2,
	tweetId,
	DeleteIcon,
	done,
	data,
	toggleDown,
	toggleUp,
	ArrowDownIcon,
	ArrowUpIcon,
	toggleDeleteTweet,
	color,
	sentimentValue,
	sentimentText
}: any) {
	// let color = ""
	// if(state === "negative")
	// 	color = "red";
	// else if(state === "positive")
	// 	color = "green";
	// else if(state === "mixed")
	// 	color = "gray";
	// else if(state === "neutral")
	// 	color = "blue";
	// else
	// 	color = "white";

	return (
		<>
			{type === "without" && (
				<div className=" w-full p-3 flex flex-col justify-center" key={position}>
					{type2 === "first" && (
						<>
							<MenuComponent
								type="firstTweet"
								data={data}
								toggleDown={toggleDown}
								ArrowDownIcon={ArrowDownIcon}
								toggleDeleteTweet={toggleDeleteTweet}
								DeleteIcon={DeleteIcon}
							/>
						</>
					)}
					{type2 === "last" && (
						<>
							{" "}
							<MenuComponent
								type="lastTweet"
								data={data}
								toggleUp={toggleUp}
								ArrowUpIcon={ArrowUpIcon}
								toggleDeleteTweet={toggleDeleteTweet}
								DeleteIcon={DeleteIcon}
							/>
						</>
					)}
					{type2 === "middle" && (
						<>
							{" "}
							<MenuComponent
								type="middleTweet"
								data={data}
								toggleUp={toggleUp}
								ArrowUpIcon={ArrowUpIcon}
								toggleDown={toggleDown}
								ArrowDownIcon={ArrowDownIcon}
								toggleDeleteTweet={toggleDeleteTweet}
								DeleteIcon={DeleteIcon}
							/>
						</>
					)}
					<TweetComponent id={tweetId} done={done} />
				</div>
			)}

			{type === "with" && (
				<div
					className={`w-full p-3 flex flex-col justify-center border-2 border-${color}-500 rounded-lg`}
					key={position}
				>
					{type2 === "first" && (
						<MenuComponent
							type="firstTweet"
							data={data}
							toggleDown={toggleDown}
							ArrowDownIcon={ArrowDownIcon}
							toggleDeleteTweet={toggleDeleteTweet}
							DeleteIcon={DeleteIcon}
						/>
					)}

					{type2 === "last" && (
						<MenuComponent
							type="lastTweet"
							data={data}
							toggleUp={toggleUp}
							ArrowUpIcon={ArrowUpIcon}
							toggleDeleteTweet={toggleDeleteTweet}
							DeleteIcon={DeleteIcon}
						/>
					)}

					{type2 === "middle" && (
						<MenuComponent
							type="middleTweet"
							data={data}
							toggleUp={toggleUp}
							ArrowUpIcon={ArrowUpIcon}
							toggleDown={toggleDown}
							ArrowDownIcon={ArrowDownIcon}
							toggleDeleteTweet={toggleDeleteTweet}
							DeleteIcon={DeleteIcon}
						/>
					)}

					<div>
						<TweetComponent id={tweetId} done={done} />
						<p className={`text-${color}-500`}>
							{sentimentText} - {sentimentValue} %
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default TweetResponse;
