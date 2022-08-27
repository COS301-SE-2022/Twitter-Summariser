// import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AdvanceSearch({
	setAdvanceOn,
	setChoice,
	changeNoOfTweets,
	changeSort,
	changeFilter,
	toggleSearch
}: any) {
	const handleCancelClick = () => {
		setChoice(false);
		setAdvanceOn(false);
	};

	const style = { fontSize: "1.3rem" };

	// const [noOfTweets, changeTweets] = useState(10);
	// const [sort, changSort] = useState("-");
	// const [filter, changFilter] = useState("-");

	const tweetHandler = (event: any) => {
		changeNoOfTweets(event.target.value);
	};

	const sortHandler = (event: any) => {
		changeSort(event.target.value);
	};

	const filterHandler = (event: any) => {
		changeFilter(event.target.value);
	};

	function advanceSearch() {
		// changeNoOfTweets(noOfTweets);
		// changeFilter(filter);
		// changeSort(sort);
		toggleSearch();
		setAdvanceOn(false);
		setChoice(false);

		// console.log("no of tweets from advance search: ");
		// console.log(noOfTweets);
		// console.log("filter from advance search: ");
		// console.log(filter);
		// console.log("sort from advance search: ");
		// console.log(sort);
	}

	const tweetOptions = [];

	for (let index = 5; index <= 100; index += 5) {
		tweetOptions.push(<option key={index.toString()}>{index}</option>);
	}

	return (
		<div className="flex justify-center items-center z-54 px-5">
			<div className="bg-zinc-200 opacity-90 fixed inset-0" />
			<div className="flex justify-center items-center inset-0 fixed">
				<div className="bg-white border-4 opacity-100 border-sky-500 rounded-xl ">
					<div className="relative">
						<div className="absolute p-3 font-bold">Advance Search</div>
						<div className="absolute top-0 right-0 p-3 cursor-pointer text-red-600">
							<AiOutlineClose style={style} onClick={handleCancelClick} />
						</div>
					</div>
					<div className="flex-col justify-center mt-4 p-12 ">
						<div className="flex flex-col justify-center items-center  text-lg  text-zinc-600   mb-5">
							{/* certain options and search button comes here */}
							<div className="flex flex-row flex-wrap justify-center items-center p-4 rounded-md bg-slate-200">
								<div className="mb-0">
									<p className="font-bold">Tweets:</p>
								</div>
								&nbsp;
								<div className="mt-0">
									<select
										data-testid="select-num-tweets"
										className=" text-black bg-slate-200"
										// value={noOfTweets}
										onChange={tweetHandler}
									>
										{tweetOptions}
									</select>
								</div>
							</div>
							<br />

							{/* this is for the Fitlering options */}
							<div className="flex flex-row flex-wrap justify-center items-center p-4 rounded-md bg-slate-200">
								<div className="mb-0">
									<p className=" font-bold">Filter:</p>
								</div>
								&nbsp;
								<div className="mt-0 bg-slate-200">
									<select
										data-testid="select-filter"
										className=" text-black text-center bg-slate-200"
										onChange={filterHandler}
										// value={filter}
									>
										<option>-</option>
										<option value="verifiedTweets">Verified Tweets</option>
										<option value="noneReply">Non-Replies</option>
									</select>
								</div>
							</div>
							<br />

							{/* this is for the sorting options */}
							<div className="flex flex-row justify-center items-center p-4 rounded-md bg-slate-200">
								<div className="mb-0">
									<p className="font-bold">Sort By:</p>
								</div>
								<div className="mt-0">
									<select
										data-testid="select-sort"
										className=" text-black text-center bg-slate-200"
										onChange={sortHandler}
									>
										<option>-</option>
										<option value="byLikes">Likes</option>
										<option value="byComments">Comments</option>
										<option value="byRetweets">Re-tweets</option>
									</select>
								</div>
							</div>

							<br />

							<button className="" type="button" onClick={advanceSearch}>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdvanceSearch;
