import { useState } from "react";
// import Tweet from "../Tweet/Tweet";
import { Link } from "react-router-dom";
// import HomeTweet from "../HomeTweet/HomeTweet";
import { Tweet } from "react-twitter-widgets";
import ExploreCard from "../ExploreCard/ExploreCard";

// importing link
import link from "../../resources/links.json";

function Home() {
	const [report, changeReport] = useState<any[]>([]);

	// ######################### API FOR GETTING HISTORY #####################

	let getAllReportsEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);
	getAllReportsEndpoint += "getAllPublishedReports";

	// using localhost
	// const getAllMyDraftReportsEndpoint = "http://localhost:4000/dev/getAllMyReports";

	const getReports = async () => {
		const apiData = {}; //empty json

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(apiData)
		};

		fetch(getAllReportsEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				changeReport(await data);

				// check for error response
				if (!response.ok) {
					// error
				}
			})
			.catch(() => {
				// console.log("Error Getting History");
			});
	};

	getReports();

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

		// let recentDrafts = [<div key="begining div2" />];

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
			apiKey: localStorage.getItem("key"),
			author: localStorage.getItem("username"),
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
					changeClicked(true);
				}
			})
			.catch(() => {
				// console.log("Error Generating Report");
			});

			// recentDrafts.push(<div data-testid="result" className="flex flex-col">
			// 		<h1>NEW</h1>
			// 		{
			// 			<div className="mt-4 flex flex-col flex-wrap justify-center">
			// 				<h2>NEW REPORT</h2>
			// 				<Link to="/genReport">
			// 					<div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
			// 						<div className="">
			// 							<button
			// 								data-testid="btn-report"
			// 								type="submit"
			// 								onClick={viewGenReport}
			// 							>
			// 								<p className="font-bold">{createTitle}</p>
			// 							</button>
			// 						</div>
			// 						<div className="mt-2">
			// 							<p className="italic text-xs">
			// 								{localStorage.getItem("username")}
			// 							</p>
			// 						</div>
			// 						<div className="">
			// 							<p className="italic text-xs">{date}</p>
			// 						</div>
			// 					</div>
			// 				</Link>
			// 			</div>
			// 		}

			// 		{/* {apiResponse} */}
			// 	</div>)
			// changeNewReport(true);
	};



	// ###################################################################

	// extra search function sort, filter, number of tweets to collect
	const [searchResponse, changeResponse] = useState<any[]>([]);
	const [noOfTweets, changeNoOfTweets] = useState(10);
	const [sort, changeSort] = useState("-");
	const [filter, changeFilter] = useState("-");
	const [homeDefault, changeHomeDefault] = useState(true);
	const [homeSearch, changeHomeSearch] = useState(false);
	const [homeSearchAgain, changeHomeSearchAgain] = useState(false);
	// const [newReport, changeNewReport] = useState(false);

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
			apiKey: localStorage.getItem("key"),
			keyword: enteredSearch,
			numOfTweets: noOfTweets,
			sortBy: sort,
			filterBy: filter
		};

		// console.log(searchData);

		if (enteredSearch !== "") {
			// calling the api__Handler
			changeClicked(false);
			searchTwitter(searchData);
		}
	};

	// tweet options
	const tweetOptions = [];

	for (let index = 1; index <= 100; index++) {
		tweetOptions.push(<option key={index.toString()}>{index}</option>);
	}

	// processing api response
	let apiResponse = [<div key="begining div" />];



	searchResponse.map((data) =>
		// enteredSearch !== "" &&
		apiResponse.push(
			// <div key={data.tweetId}>
			// 	<HomeTweet tweetData={data} />
			// </div>
			<div className=" w-full border border-gray-200 p-3" key={data.tweetId}>
				<Tweet options={{ align: "center", width: "" }} tweetId={data.tweetId} />
			</div>
		)
	);

	// let ind = 0;

	const viewGenReport = () => {
		if (localStorage.getItem("draftReportId")) {
			localStorage.removeItem("draftReportId");
			localStorage.setItem("draftReportId", genReport);
		} else {
			localStorage.setItem("draftReportId", genReport);
		}
	};

	const displayHomeSearch = () => {
		apiResponse = [<div key="begining div" />];
		changeEnteredSearch("");
		changeResultSet("");
		changeHomeDefault(false);
		changeHomeSearchAgain(false);
		changeHomeSearch(true);
	}

	const displayHomeSearchAgain = () => {
		apiResponse = [<div key="begining div" />];
		changeHomeDefault(false);
		changeHomeSearch(false);
		changeHomeSearchAgain(true);
		search();
	}

	// const displayHomeDefault = () => {
	// 	apiResponse = [<div key="begining div" />];
	// 	changeEnteredSearch("");
	// 	changeResultSet("");
	// 	getReports();
	// 	changeHomeDefault(true);
	// 	changeHomeSearch(false);
	// 	changeHomeSearchAgain(false);
	// }

	// displayHomeDefault();

	return (<div>
					{homeDefault &&
		<div data-testid="home" className="flex flex-row bg-white lg:ml-14 lg:mr-14 mini-tablet:ml-5 mini-tablet:mr-5 relative justify-center">
			{/* search */}
			<div data-testid="container1" className="mt-14 flex flex-col 2xl:w-1/2 mini-tablet:w-2/3 w-full relative">

				{/* certain options and search button comes here */}
				<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-white items-center">

					{/* this is for the search button */}
					<div className="flex flex-row w-1/3 justify-center pt-3">
						<button
							data-testid="btn-summarise"
							type="submit"
							className="button__summarise text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
							onClick={displayHomeSearch}
						>
							SUMMARISE
						</button>
					</div>
				</div>

				{/* Api response comes here */}
				<div className=" mt-4 text-center">
					<h1 className="text-midnight-blue font-bold text-3xl">Explore Latest Reports</h1>

					<div className="mt-4 flex flex-row flex-wrap justify-center">
						<div
							data-testid="reports"
							className="mt-4 flex flex-row flex-wrap justify-center"
						>
							{report.map((data) => (
								<div
									className="m-4 w-auto h-auto bg-gray-400 hover:bg-gray-300 rounded-md flex flex-col p-2"
									key={data.reportID}
								>
									<ExploreCard data={data} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className=" xl:flex xl:w-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
				<div className="fixed rounded bg-white h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
					<h1 className="text-xl font-bold text-[#03045E]">Recent Drafts</h1>
					<div className="w-full flex flex-col" />
				</div>
			</div>

		</div>
	}
	{homeSearch &&
		<div data-testid="home" className="flex flex-row bg-white lg:ml-14 lg:mr-14 mini-tablet:ml-5 mini-tablet:mr-5 relative justify-center">
			{/* search */}
			<div data-testid="container1" className=" flex flex-col 2xl:w-1/2 mini-tablet:w-2/3 w-full relative">
				<div className="flex justify-center p-2 border-l border-r border-white mt-16 mini-tablet:mt-0">
					<div className="mt-10 w-3/4 mb-3">
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
									focus:text-gray-700 focus:bg-white focus:ring focus:border-[#023E8A] focus:outline-none
									bg-gray-200
								"
							value={enteredSearch}
							onChange={searchHandler}
							placeholder="search twitter..."
						/>
					</div>
				</div>

				{/* certain options and search button comes here */}
				<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-white items-center">
					{/*  */}

					<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
						<p>Tweets:</p> &nbsp;
						<select
							data-testid="select-num-tweets"
							className=" text-[#023E8A] focus:ring focus:text-[#0077B6]"
							value={noOfTweets}
							onChange={tweetHandler}
						>
							{tweetOptions}
						</select>
					</div>

					{/* this is for the Fitlering options */}
					<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
						<p className="">Filter:</p> &nbsp;
						<select
							data-testid="select-filter"
							className=" text-[#023E8A] text-center focus:ring focus:text-[#0077B6]"
							onChange={filterHandler}
						>
							<option>-</option>
							<option value="verifiedTweets">Verified Tweets</option>
							<option value="noneReply">Non-Replies</option>
						</select>
					</div>

					{/* this is for the sorting options */}
					<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
						<p className="">Sort By:</p> &nbsp;
						<select
							data-testid="select-sort"
							className=" text-[#023E8A] text-center focus:ring focus:text-[#0077B6]"
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
							className="button__search text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
							onClick={displayHomeSearchAgain}
						>
							Search
						</button>
					</div>
				</div>

				{/* Api response comes here */}
				<div data-testid="result" className="flex flex-col">
					{/* {enteredSearch === "" && clicked === false && (
											<div className="mt-2 p-4" key={(ind++).toString()}>
													<h1 className="text-2xl">Trends</h1>
											</div>
									)} */}

					{clicked && (
						<div className="mt-4 flex flex-col flex-wrap justify-center">
							<h1 className="text-2xl ml-2">Newly created report</h1>
							<Link to="/genReport">
								<div className="hover:bg-[#03045E] group hover:shadow m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
									<div className="">
										<button
											data-testid="btn-report"
											type="submit"
											onClick={viewGenReport}
										>
											<p className="font-bold">{createTitle}</p>
										</button>
									</div>
								</div>
							</Link>
						</div>
					)}

					{/* {apiResponse} */}
				</div>
			</div>

			<div className=" xl:flex xl:w-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
				<div className="fixed rounded bg-white h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
					<h1 className="text-xl font-bold text-[#03045E]">Recent Drafts</h1>
					<div className="w-full flex flex-col" />
				</div>
			</div>

		</div>
	}
	{homeSearchAgain &&
		<div data-testid="home" className="flex flex-row bg-white lg:ml-14 lg:mr-14 mini-tablet:ml-5 mini-tablet:mr-5 relative justify-center">
			{/* search */}
			<div data-testid="container1" className="flex flex-col 2xl:w-1/2 mini-tablet:w-2/3 w-full relative">
			<div className="flex justify-center p-2 border-l border-r border-white mt-16 mini-tablet:mt-0">
					<div className="mt-10 w-3/4 mb-3">
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
									focus:text-gray-700 focus:bg-white focus:ring focus:border-[#023E8A] focus:outline-none
									bg-gray-200
								"
							value={enteredSearch}
							onChange={searchHandler}
							placeholder="search twitter..."
						/>
					</div>
				</div>

				{/* certain options and search button comes here */}
				<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-white items-center">
					{/*  */}
					<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
						<p>Tweets:</p> &nbsp;
						<select
							data-testid="select-num-tweets"
							className=" text-[#023E8A] focus:ring focus:text-[#0077B6]"
							value={noOfTweets}
							onChange={tweetHandler}
						>
							{tweetOptions}
						</select>
					</div>

					{/* this is for the Fitlering options */}
					<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
						<p className="">Filter:</p> &nbsp;
						<select
							data-testid="select-filter"
							className=" text-[#023E8A] text-center focus:ring focus:text-[#0077B6]"
							onChange={filterHandler}
						>
							<option>-</option>
							<option value="verifiedTweets">Verified Tweets</option>
							<option value="noneReply">Non-Replies</option>
						</select>
					</div>

					{/* this is for the sorting options */}
					<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
						<p className="">Sort By:</p> &nbsp;
						<select
							data-testid="select-sort"
							className=" text-[#023E8A] text-center focus:ring focus:text-[#0077B6]"
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
							className="button__search text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
							onClick={displayHomeSearchAgain}
						>
							Search
						</button>
					</div>
					{/* <div className="flex flex-row w-1/3 justify-center pt-3">
						<button
							data-testid="btn-search"
							type="submit"
							className="button__search text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
							onClick={displayHomeDefault}
						>
							BACK
						</button>
					</div> */}
				</div>
				<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-white items-center">
					<div className="flex flex-row w-1/3 justify-center pt-3">
						<button
							data-testid="btn-generate"
							type="submit"
							className="button__generate text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
							onClick={genRep}
						>
							Generate Report
						</button>
					</div>
				</div>

				{clicked && (
						<div className="mt-4 flex flex-col flex-wrap justify-center">
							<h1 className="text-2xl ml-2">Newly created report</h1>
							<Link to="/genReport">
								<div className="hover:bg-gray-300 m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
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
											{localStorage.getItem("username")}
										</p>
									</div>
									<div className="">
										<p className="italic text-xs">{date}</p>
									</div>
								</div>
							</Link>
						</div>
					)}

				{/* Api response comes here */}
				{apiResponse}

			</div>

			<div className=" xl:flex xl:w-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
				<div className="fixed rounded bg-white h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
					<h1 className="text-xl font-bold text-[#03045E]">Recent Drafts</h1>
					<div className="w-full flex flex-col">
						{/* {newReport && <div data-testid="result" className="flex flex-col">
			 		{
						<div className="mt-4 flex flex-col flex-wrap justify-center">
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
											{localStorage.getItem("username")}
										</p>
									</div>
									<div className="">
										<p className="italic text-xs">{date}</p>
									</div>
								</div>
							</Link>
						</div>
					}


				</div>} */}

					</div>
				</div>
			</div>

		</div>
	}
				</div>


		// <div data-testid="home" className="flex flex-row bg-white lg:ml-14 lg:mr-14 mini-tablet:ml-5 mini-tablet:mr-5 relative justify-center">
		// 	{/* search */}
		// 	<div data-testid="container1" className="flex flex-col 2xl:w-1/2 mini-tablet:w-2/3 w-full relative">
		// 		<div className="flex justify-center p-2 border-l border-r border-gray-200 mt-16 mini-tablet:mt-0">
		// 			<div className="w-3/4 mb-3">
		// 				<input
		// 					data-testid="search"
		// 					type="search"
		// 					className="
		// 							nosubmit
		// 							w-full
		// 							px-3
		// 							py-1.5
		// 							text-lg
		// 							font-normal
		// 							text-gray-700
		// 							bg-clip-padding
		// 							border border-solid border-gray-300
		// 							rounded-lg
		// 							focus:text-gray-700 focus:bg-white focus:ring focus:border-[#023E8A] focus:outline-none
		// 							bg-gray-200
		// 						"
		// 					value={enteredSearch}
		// 					onChange={searchHandler}
		// 					placeholder="search twitter..."
		// 				/>
		// 			</div>
		// 		</div>

		// 		{/* certain options and search button comes here */}
		// 		<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-gray-200 items-center">
		// 			{/*  */}

		// 			<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
		// 				<p>Tweets:</p> &nbsp;
		// 				<select
		// 					data-testid="select-num-tweets"
		// 					className=" text-[#023E8A] focus:ring focus:text-[#0077B6]"
		// 					value={noOfTweets}
		// 					onChange={tweetHandler}
		// 				>
		// 					{tweetOptions}
		// 				</select>
		// 			</div>

		// 			{/* this is for the Fitlering options */}
		// 			<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
		// 				<p className="">Filter:</p> &nbsp;
		// 				<select
		// 					data-testid="select-filter"
		// 					className=" text-[#023E8A] text-center focus:ring focus:text-[#0077B6]"
		// 					onChange={filterHandler}
		// 				>
		// 					<option>-</option>
		// 					<option value="verifiedTweets">Verified Tweets</option>
		// 					<option value="noneReply">Non-Replies</option>
		// 				</select>
		// 			</div>

		// 			{/* this is for the sorting options */}
		// 			<div className="flex flex-row flex-wrap w-1/3 justify-center text-lg text-[#023E8A] font-medium">
		// 				<p className="">Sort By:</p> &nbsp;
		// 				<select
		// 					data-testid="select-sort"
		// 					className=" text-[#023E8A] text-center focus:ring focus:text-[#0077B6]"
		// 					onChange={sortHandler}
		// 				>
		// 					<option>-</option>
		// 					<option value="byLikes">Likes</option>
		// 					<option value="byComments">Comments</option>
		// 					<option value="byRetweets">Re-tweets</option>
		// 				</select>
		// 			</div>

		// 			{/* this is for the search button */}
		// 			<div className="flex flex-row w-1/3 justify-center pt-3">
		// 				<button
		// 					data-testid="btn-search"
		// 					type="submit"
		// 					className="button__search text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
		// 					onClick={search}
		// 				>
		// 					Search
		// 				</button>
		// 			</div>
		// 		</div>

		// 		<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-gray-200 items-center">
		// 			<div className="flex flex-row w-1/3 justify-center pt-3">
		// 				<button
		// 					data-testid="btn-generate"
		// 					type="submit"
		// 					className="button__generate text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
		// 					onClick={genRep}
		// 				>
		// 					Generate Report
		// 				</button>
		// 			</div>
		// 		</div>

		// 		{/* Api response comes here */}
		// 		<div data-testid="result" className="flex flex-col">
		// 			{/* {enteredSearch === "" && clicked === false && (
		// 									<div className="mt-2 p-4" key={(ind++).toString()}>
		// 											<h1 className="text-2xl">Trends</h1>
		// 									</div>
		// 							)} */}

					// {clicked && (
					// 	<div className="mt-4 flex flex-col flex-wrap justify-center">
					// 		<h1 className="text-2xl ml-2">Newly created report</h1>
					// 		<Link to="/genReport">
					// 			<div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
					// 				<div className="">
					// 					<button
					// 						data-testid="btn-report"
					// 						type="submit"
					// 						onClick={viewGenReport}
					// 					>
					// 						<p className="font-bold">{createTitle}</p>
					// 					</button>
					// 				</div>
					// 				<div className="mt-2">
					// 					<p className="italic text-xs">
					// 						{localStorage.getItem("username")}
					// 					</p>
					// 				</div>
					// 				<div className="">
					// 					<p className="italic text-xs">{date}</p>
					// 				</div>
					// 			</div>
					// 		</Link>
					// 	</div>
					// )}

		// 			{apiResponse}
		// 		</div>
		// 	</div>

		// 	<div className=" xl:flex xl:w-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
		// 		<div className="fixed rounded bg-white h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
		// 			<h1 className="text-xl font-bold text-[#03045E]">Recent Drafts</h1>
		// 			<div className="w-full flex flex-col" />
		// 		</div>
		// 	</div>

		// </div>

	);
}

export default Home;
