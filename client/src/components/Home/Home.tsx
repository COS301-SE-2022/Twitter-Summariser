import { useState } from "react";
// import Tweet from "../Tweet/Tweet";
import { Link } from "react-router-dom";
// import HomeTweet from "../HomeTweet/HomeTweet";
import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../../resources/links.json";

function Home() {
	// ################ all related to the search ############################

	// localStorage.removeItem("resultSetId");
	// localStorage.removeItem("draftReportId");

	const [enteredSearch, changeEnteredSearch] = useState("");
	const [resultSet, changeResultSet] = useState("");
	const [date, changeDate] = useState("");
	const [genReport, changeGenReport] = useState("");

	const searchHandler = (event: any) => {
		changeEnteredSearch(event.target.value);
	};

	const [clicked, changeClicked] = useState(false);
	const [createTitle, changeCreateTitle] = useState("");

	// ################ API FOR GENERATE REPORT ###########################

	let genReportEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);
	genReportEndpoint += "generateReport";

	// using localhost
	// const genReportEndpoint = "http://localhost:4000/dev/generateReport";

	const genRep = async () => {
		const searchData = {
			apiKey: localStorage.getItem("loggedUserApi"),
			author: localStorage.getItem("loggedUserName"),
			resultSetID: resultSet
		};

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(searchData)
		};

		fetch(genReportEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				// console.log(data);

				if (!response.ok) {
					// error

					return;
				}

				changeDate(await data.Report.dateCreated.substring(0, 10));
				changeGenReport(data.Report.reportID);

				if (enteredSearch !== "") {
					changeCreateTitle(enteredSearch);
					changeEnteredSearch("");
					changeClicked(!clicked);
				}
			})
			.catch(() => {
				// console.log("Error Generating Report");
			});
	};

	// ###################################################################

	// extra search function sort, filter, number of tweets to collect
	const [searchResponse, changeResponse] = useState<any[]>([]);
	const [noOfTweets, changeNoOfTweets] = useState(10);
	const [sort, changeSort] = useState("-");
	const [filter, changeFilter] = useState("-");

	const tweetHandler = (event: any) => {
		changeNoOfTweets(event.target.value);
	};

	const sortHandler = (event: any) => {
		changeSort(event.target.value);
	};

	const filterHandler = (event: any) => {
		changeFilter(event.target.value);
	};

	// ######################### API FOR SEARCHING ###############################################

	let searchEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);
	searchEndpoint += "searchTweets";

	// using localhost
	// const searchEndpoint = "http://localhost:4000/dev/searchTweets";

	const searchTwitter = async (searchData: any) => {
		// POST request using fetch with error handling
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(searchData)
		};

		fetch(searchEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				changeResultSet(await data.resultSetID);
				changeResponse(await data.tweets);

				// check for error response
				if (!response.ok) {
					// error
				}
			})
			.catch(() => {
				// console.log("Error Searching");
			});
	};

	// #######################################################################

	// compiling user search information
	const search = () => {
		const searchData = {
			apiKey: localStorage.getItem("loggedUserApi"),
			keyword: enteredSearch,
			numOfTweets: noOfTweets,
			sortBy: sort,
			filterBy: filter
		};

		// console.log(searchData);

		if (enteredSearch !== "") {
			// calling the api__Handler
			searchTwitter(searchData);
		}
	};

	// tweet options
	const tweetOptions = [];

	for (let index = 1; index <= 100; index++) {
		tweetOptions.push(<option key={index.toString()}>{index}</option>);
	}

	// processing api response
	const apiResponse = [<div key="begining div" />];

	searchResponse.map(
		(data) =>
			enteredSearch !== "" &&
			apiResponse.push(
				// <div key={data.tweetId}>
				// 	<HomeTweet tweetData={data} />
				// </div>
				<div className=" w-full border border-gray-200 p-3" key={data.tweetId}>
					<Tweet options={{ align: "center", width: "" }} tweetId={data.tweetId} />
				</div>
			)
	);

	let ind = 0;

	const viewGenReport = () => {
		if (localStorage.getItem("draftReportId")) {
			localStorage.removeItem("draftReportId");
			localStorage.setItem("draftReportId", genReport);
		} else {
			localStorage.setItem("draftReportId", genReport);
		}
	};

	return (
		<div data-testid="home">
			{/* search */}
			<div className="flex justify-center p-2 border-l border-r border-gray-200 mt-16 mini-tablet:mt-0">
				<div className="w-3/4 mb-3">
					<input
						data-testid="search"
						type="search"
						className="
                nosubmit
                w-full
                px-3
                py-1.5
                text-lg
                font-normal
                text-gray-700
                bg-clip-padding
                border border-solid border-gray-300
                rounded-lg
                focus:text-gray-700 focus:bg-white focus:border-twitter-blue focus:outline-none
                bg-gray-200
              "
						value={enteredSearch}
						onChange={searchHandler}
						placeholder="search twitter..."
					/>
				</div>
			</div>

			{/* certain options and search button comes here */}
			<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-gray-200 items-center">
				{/*  */}

				<div className="flex flex-row flex-wrap w-1/3 justify-center">
					<p>Tweets:</p> &nbsp;
					<select
						data-testid="select-num-tweets"
						className=" text-black"
						value={noOfTweets}
						onChange={tweetHandler}
					>
						{tweetOptions}
					</select>
				</div>

				{/* this is for the Fitlering options */}
				<div className="flex flex-row flex-wrap w-1/3 justify-center">
					<p className="">Filter:</p> &nbsp;
					<select
						data-testid="select-filter"
						className=" text-black text-center"
						onChange={filterHandler}
					>
						<option>-</option>
						<option value="verifiedTweets">Verified Tweets</option>
						<option value="noneReply">Non-Replies</option>
					</select>
				</div>

				{/* this is for the sorting options */}
				<div className="flex flex-row flex-wrap w-1/3 justify-center">
					<p className="">Sort By:</p> &nbsp;
					<select
						data-testid="select-sort"
						className=" text-black text-center"
						onChange={sortHandler}
					>
						<option>-</option>
						<option value="byLikes">Likes</option>
						<option value="byComments">Comments</option>
						<option value="byRetweets">Re-tweets</option>
					</select>
				</div>

				{/* this is for the search button */}
				<div className="flex flex-row w-1/3 justify-center pt-3">
					<button
						data-testid="btn-search"
						type="submit"
						className="button w-3/4 text-lg p-0.5"
						onClick={search}
					>
						Search
					</button>
				</div>
			</div>

			<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-gray-200 items-center">
				<div className="flex flex-row w-1/3 justify-center pt-3">
					<button
						data-testid="btn-generate"
						type="submit"
						className="button w-3/4 text-lg p-0.5"
						onClick={genRep}
					>
						Generate Report
					</button>
				</div>
			</div>

			{/* Api response comes here */}
			<div data-testid="result" className="flex flex-col">
				{apiResponse}

				{enteredSearch === "" && clicked === false && (
					<div className="mt-2 p-4" key={(ind++).toString()}>
						<h1 className="text-2xl">Trends</h1>
					</div>
				)}

				{clicked && (
					<div className="mt-4 flex flex-col flex-wrap justify-center">
						<h1 className="text-2xl">Newly created report</h1>
						<Link to="/genReport">
							<div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
								<div className="">
									<button
										data-testid="btn-report"
										type="submit"
										onClick={viewGenReport}
									>
										<p className="font-bold">{createTitle}</p>
									</button>
								</div>
								<div className="mt-2">
									<p className="italic text-xs">
										{localStorage.getItem("loggedUserName")}
									</p>
								</div>
								<div className="">
									<p className="italic text-xs">{date}</p>
								</div>
							</div>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
