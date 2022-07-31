import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import { AxiosError } from "axios";
import ExploreCard from "./ExploreCard";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";
import "./styles/Animation.css";

// needed for new home page - uncomment
// import ExploreCard from "./ExploreCard";

// // importing link
// import link from "../resources/links.json";

function Home() {
	// uncomment this for new home page
	// const [report, changeReport] = useState<any[]>([]);

	// // ######################### API FOR GETTING reports #####################

	// let getAllReportsEndpoint =
	// 	process.env.NODE_ENV === "development"
	// 		? String(link.localhostLink)
	// 		: String(link.serverLink);
	// getAllReportsEndpoint += "getAllPublishedReports";

	// // using localhost
	// // const getAllMyDraftReportsEndpoint = "http://localhost:4000/dev/getAllMyReports";

	// const getReports = async () => {
	// 	const apiData = {}; //empty json

	// 	const requestOptions = {
	// 		method: "POST",
	// 		body: JSON.stringify(apiData)
	// 	};

	// 	fetch(getAllReportsEndpoint, requestOptions)
	// 		.then(async (response) => {
	// 			const isJson = response.headers.get("content-type")?.includes("application/json");

	// 			const data = isJson && (await response.json());

	// 			changeReport(await data);

	// 			// check for error response
	// 			if (!response.ok) {
	// 				// error
	// 			}
	// 		})
	// 		.catch(() => {
	// 			// console.log("Error Getting History");
	// 		});
	// };

	// getReports();

	// const [homeDefault, changeHomeDefault] = useState(true);

	// const displayHomeSearch = () => {
	// 	apiResponse = [<div key="begining div" />];
	// 	changeEnteredSearch("");
	// 	changeResultSet("");
	// 	changeHomeDefault(false);
	// }

	// const displayHomeDefault = () => {
	// 	apiResponse = [<div key="begining div" />];
	// 	changeEnteredSearch("");
	// 	changeResultSet("");
	// 	getReports();
	// 	changeHomeDefault(true);
	// }

	const [enteredSearch, changeEnteredSearch] = useState("");
	const [resultSet, changeResultSet] = useState("");
	const [date, changeDate] = useState("");
	const [genReport, changeGenReport] = useState("");
	const [clicked, changeClicked] = useState(false);
	const [createTitle, changeCreateTitle] = useState("");
	const [loading, changeLoading] = useState(false);

	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const [generateLoading, changeGenerateLoading] = useState(false);
	const { auth } = useAuth();

	const searchHandler = (event: any) => {
		changeEnteredSearch(event.target.value);
	};

	const loadingHandler = () => {
		changeLoading(!loading);
	};

	const generateLoadingHandler = () => {
		changeGenerateLoading(!generateLoading);
	};

	const genRep = async () => {
		const searchData = {
			apiKey: auth.apiKey,
			author: auth.username,
			resultSetID: resultSet
		};

		try {
			const response = await axiosPrivate.post("generateReport", JSON.stringify(searchData), {
				signal: controller.signal
			});
			changeGenerateLoading(false);
			changeDate(response.data.Report.dateCreated.substring(0, 10));
			changeGenReport(response.data.Report.reportID);

			if (enteredSearch !== "") {
				changeCreateTitle(enteredSearch);
				changeEnteredSearch("");
				changeClicked(true);
			}
		} catch (err) {
			if ((err as AxiosError).response?.status === 500) {
				genRep();
			} else {
				console.error(err);
			}
		}
	};

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

	const [pulse, changePulse] = useState(false);

	const searchTwitter = async (searchData: any) => {
		try {
			const response = await axiosPrivate.post("searchTweets", JSON.stringify(searchData), {
				signal: controller.signal
			});
			changeResultSet(await response.data.resultSetID);
			changeResponse(await response.data.tweets);
			changeLoading(false);
			changePulse(true);
		} catch (err) {
			console.error(err);
		}
	};

	const search = () => {
		const searchData = {
			apiKey: auth.apiKey,
			keyword: enteredSearch,
			numOfTweets: noOfTweets,
			sortBy: sort === "-" ? "-" : sort,
			filterBy: filter === "-" ? "-" : filter
		};

		if (enteredSearch !== "") {
			loadingHandler();
			changeClicked(false);
			searchTwitter(searchData);
		}
	};

	const tweetOptions = [];
	let apiResponse = [<div key="begining div" />];

	for (let index = 5; index <= 100; index += 5) {
		tweetOptions.push(<option key={index.toString()}>{index}</option>);
	}

	const generate = () => {
		if (apiResponse.length > 1) {
			generateLoadingHandler();
			genRep();
		}
	};

	const done = () => {
		changePulse(false);
	};

	searchResponse.map((data) =>
		// enteredSearch !== "" &&
		apiResponse.push(
			// <div key={data.tweetId}>
			// 	<HomeTweet tweetData={data} />
			// </div>
			<div className="pb-8" key={data.tweetId}>
				<Tweet options={{ align: "center" }} tweetId={data.tweetId} onLoad={done} />
			</div>
		)
	);

	const viewGenReport = () => {
		if (localStorage.getItem("draftReportId")) {
			localStorage.removeItem("draftReportId");
			localStorage.setItem("draftReportId", genReport);
		} else {
			localStorage.setItem("draftReportId", genReport);
		}
	};

	const loadIcon = (
		<svg
			role="status"
			className="inline mr-1 w-5 h-5 text-gray-200 animate-spin dark:text-slate-600 fill-gray-600 dark:fill-gray-300"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill"
			/>
		</svg>
	);

	const pulseOutput = [<div key="begining div" />];

	let i = 0;

	while (i < apiResponse.length) {
		pulseOutput.push(
			<div className="border shadow rounded-md p-10 m-5 " key={i}>
				<div className="animate-pulse flex space-x-4">
					<div className="rounded-full bg-slate-700 h-10 w-10"> </div>
					<div className="flex-1 space-y-6 py-1">
						<div className="h-2 bg-slate-700 rounded"> </div>
						<div className="space-y-3">
							<div className="grid grid-cols-3 gap-4">
								<div className="h-2 bg-slate-700 rounded col-span-2"> </div>
								<div className="h-2 bg-slate-700 rounded col-span-1"> </div>
							</div>
							<div className="h-2 bg-slate-700 rounded"> </div>
						</div>
					</div>
				</div>
			</div>
		);

		i++;
	}

	const [report, changeReport] = useState<any[]>([]);

	useEffect(() => {
		let isMounted = true;
		// const controller = new AbortController();

		const getReports = async () => {
			try {
				const response = await axiosPrivate.post(
					"getAllPublishedReports",
					JSON.stringify({}),
					{ signal: controller.signal }
				);
				isMounted && changeReport(response.data);
				isMounted && changeLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getReports();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [axiosPrivate]);

	const [homeDefault, changeHomeDefault] = useState(true);

	const displayHomeSearch = () => {
		apiResponse = [<div key="begining div" />];
		changeEnteredSearch("");
		changeResultSet("");
		changeHomeDefault(false);
	};

	// const displayHomeDefault = () => {
	// 	apiResponse = [<div key="begining div" />];
	// 	changeEnteredSearch("");
	// 	changeResultSet("");
	// 	getReports();
	// 	changeHomeDefault(true);
	// }

	// const loadIcon = (
	// 	<svg
	// 		role="status"
	// 		className="inline mr-1 w-5 h-5 text-gray-200 animate-spin dark:text-slate-600 fill-gray-600 dark:fill-gray-300"
	// 		viewBox="0 0 100 101"
	// 		fill="none"
	// 		xmlns="http://www.w3.org/2000/svg"
	// 	>
	// 		<path
	// 			d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
	// 			fill="currentColor"
	// 		/>
	// 		<path
	// 			d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
	// 			fill="currentFill"
	// 		/>
	// 	</svg>
	// );

	return (
		// <div data-testid="home">
		// <div className="mt-8 mini-tablet:mt-0 border-b">
		// 	<div className="flex justify-center pt-8 pl-8 pr-8 pb-2">
		// 		<label
		// 			htmlFor="default-search"
		// 			className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
		// 		>
		// 			Search
		// 		</label>
		// 		<div className="relative w-screen">
		// 			<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
		// 				<svg
		// 					className="w-5 h-5 text-gray-500 dark:text-gray-400"
		// 					fill="none"
		// 					stroke="currentColor"
		// 					viewBox="0 0 24 24"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 				>
		// 					<path
		// 						strokeLinecap="round"
		// 						strokeLinejoin="round"
		// 						strokeWidth="2"
		// 						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		// 					/>
		// 				</svg>
		// 			</div>
		// 			<input
		// 				type="search"
		// 				id="default-search"
		// 				className="p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border-gray-200 border focus:outline-none focus:ring focus:border-blue-500"
		// 				value={enteredSearch}
		// 				onChange={searchHandler}
		// 				placeholder="Search Twitter..."
		// 				required
		// 			/>
		// 		</div>
		// 	</div>
		// 	{/* certain options and search button comes here */}
		// 	<div className="flex flex-row flex-wrap justify-around">
		// 		{/*  */}

		// 		<div className="flex flex-row flex-wrap w-1/3 justify-center items-center p-1">
		// 			<div className="mb-0">
		// 				<p>Tweets:</p>
		// 			</div>
		// 			<div className="mt-0">
		// 				<select
		// 					data-testid="select-num-tweets"
		// 					className=" text-black"
		// 					value={noOfTweets}
		// 					onChange={tweetHandler}
		// 				>
		// 					{tweetOptions}
		// 				</select>
		// 			</div>
		// 		</div>

		// 		{/* this is for the Fitlering options */}
		// 		<div className="flex flex-row flex-wrap w-1/3 justify-center items-center p-1">
		// 			<div className="mb-0">
		// 				<p className="">Filter:</p>
		// 			</div>
		// 			<div className="mt-0">
		// 				<select
		// 					data-testid="select-filter"
		// 					className=" text-black text-center"
		// 					onChange={filterHandler}
		// 					value={filter}
		// 				>
		// 					<option>-</option>
		// 					<option value="verifiedTweets">Verified Tweets</option>
		// 					<option value="noneReply">Non-Replies</option>
		// 				</select>
		// 			</div>
		// 		</div>

		// 		{/* this is for the sorting options */}
		// 		<div className="flex flex-row flex-wrap w-1/3 justify-center items-center p-1">
		// 			<div>
		// 				<p className="">Sort By:</p>
		// 			</div>
		// 			<div>
		// 				<select
		// 					data-testid="select-sort"
		// 					className=" text-black text-center"
		// 					onChange={sortHandler}
		// 				>
		// 					<option>-</option>
		// 					<option value="byLikes">Likes</option>
		// 					<option value="byComments">Comments</option>
		// 					<option value="byRetweets">Re-tweets</option>
		// 				</select>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	{/* this is for the search button */}
		// 	<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center">
		// 		<div className="pt-3">
		// 			{/* <button
		// 			data-testid="btn-search"
		// 			type="submit"
		// 			className="button w-3/4 text-lg p-0.5"
		// 			onClick={search}
		// 		>
		// 			Search
		// 		</button> */}
		// 			{loading && (
		// 				<button
		// 					type="button"
		// 					className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
		// 					disabled
		// 				>
		// 					{/* <svg
		// 						className="animate-spin h-5 w-5 mr-3 bg-white"
		// 						viewBox="0 0 24 24"
		// 					> */}
		// 					{/* <!-- ... --> */}
		// 					{/* </svg> */}
		// 					{loadIcon}
		// 				</button>
		// 			)}
		// 			{!loading && (
		// 				<Button text="Search" size="large" handle={search} type="search" />
		// 			)}
		// 		</div>
		// 		{/* {apiResponse.length > 1 && ( */}
		// 		{/* // <div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center"> */}
		// 		<div className="pt-3">
		// 			{/* <button
		// 			data-testid="btn-generate"
		// 			type="submit"
		// 			className="button w-3/4 text-lg p-0.5"
		// 			onClick={genRep}
		// 		>
		// 			Generate Report
		// 		</button> */}
		// 			{apiResponse.length === 1 ? (
		// 				<button
		// 					type="button"
		// 					className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center disabled"
		// 					disabled
		// 				>
		// 					{/* <svg
		// 						className="animate-spin h-5 w-5 mr-3 bg-white"
		// 						viewBox="0 0 24 24"
		// 					> */}
		// 					{/* <!-- ... --> */}
		// 					{/* </svg> */}
		// 					{/* {loadIcon} */}
		// 					Generate Report
		// 				</button>
		// 			) : generateLoading ? (
		// 				<button
		// 					type="button"
		// 					className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
		// 					disabled
		// 				>
		// 					{/* <svg
		// 						className="animate-spin h-5 w-5 mr-3 bg-white"
		// 						viewBox="0 0 24 24"
		// 					> */}
		// 					{/* <!-- ... --> */}
		// 					{/* </svg> */}
		// 					{loadIcon}
		// 				</button>
		// 			) : (
		// 				<Button
		// 					text="Generate Report"
		// 					size="large"
		// 					handle={generate}
		// 					type="generate"
		// 				/>
		// 			)}
		// 		</div>
		// 		{/* // </div> */}
		// 		{/* )} */}
		// 	</div>

		// 	{loading && (
		// 		<div className="flex flex-row justify-center my-2">
		// 			{loadIcon} &nbsp; Loading Tweets
		// 		</div>
		// 	)}

		// 	{/* Api response comes here */}
		// 	<div data-testid="result" className="flex flex-col">
		// 		{clicked && (
		// 			<div className="mt-4 flex flex-col flex-wrap justify-center">
		// 				<h1 className="text-2xl ml-2">Newly created report</h1>
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
		// 							<p className="italic text-xs">{auth.username}</p>
		// 						</div>
		// 						<div className="">
		// 							<p className="italic text-xs">{date}</p>
		// 						</div>
		// 					</div>
		// 				</Link>
		// 			</div>
		// 		)}

		// 		{/* {pulse} */}

		// 		{pulse && pulseOutput}

		// 		{apiResponse}
		// 	</div>
		// </div>
		// </div>

		// ****************UNCOMMENT NEW HOME PAGE BELOW*****************

		<div data-testid="home">
			{homeDefault && (
				<div data-testid="container1" className="mt-20 flex flex-col w-full relative">
					{/* certain options and search button comes here */}
					<div className="w-full p-3 flex flex-col justify-center">
						{/* this is for the search button */}
						<div className="flex flex-row justify-around">
							{/* <button
							data-testid="btn-summarise"
							type="submit"
							className="button__summarise text-xl p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
							onClick={displayHomeSearch}
						>
							Get Started
						</button> */}
							<Button
								text="Get Started"
								size="large"
								handle={displayHomeSearch}
								type="start"
							/>
						</div>
					</div>
					{/* Api response comes here */}
					{/* <div className=" mt-4 text-center">
					<h1 className="text-midnight-blue font-bold text-3xl">Explore Latest Reports</h1>

					<div className="mt-4 flex flex-row flex-wrap justify-center">
						<div
							data-testid="reports"
							className="mt-4 flex flex-row flex-wrap justify-center"
						>
							{report.map((data) => (
								<div
									className="m-4 w-auto h-auto rounded-md flex flex-col p-2"
									key={data.reportID}
								>
									<ExploreCard data={data} />
								</div>
							))}
						</div>
					</div>
				</div> */}
					<div className=" p-3 ">
						<div className=" mt-4 text-center">
							<h1 className="text-black font-semibold text-3xl">
								Explore Latest Reports
							</h1>

							<div className="mt-4 flex flex-row flex-wrap justify-center">
								<div
									data-testid="reports"
									className="mt-4 flex flex-row flex-wrap justify-center"
								>
									{loading && <div>{loadIcon} &nbsp; Loading Reports</div>}

									{!loading &&
										(report.length === 0 ? (
											<div>There are no reports at the moment </div>
										) : (
											report.map((data) => (
												<div
													data-aos="fade-up"
													data-aos-duration="500"
													className="m-4 w-auto h-auto  flex flex-col p-2"
													key={data.reportID}
												>
													<ExploreCard data={data} />
												</div>
											))
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{!homeDefault && (
				<div className="mt-8 mini-tablet:mt-0 border-b">
					<div className="flex justify-center pt-8 pl-8 pr-8 pb-2">
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
						>
							Search
						</label>
						<div className="relative w-screen">
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								className="p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border-gray-200 border focus:outline-none focus:ring focus:border-blue-500"
								value={enteredSearch}
								onChange={searchHandler}
								placeholder="Search Twitter..."
								required
							/>
						</div>
					</div>
					{/* certain options and search button comes here */}
					<div className="flex flex-row flex-wrap justify-around">
						{/*  */}

						<div className="flex flex-row flex-wrap w-1/3 justify-center items-center p-1">
							<div className="mb-0">
								<p>Tweets:</p>
							</div>
							<div className="mt-0">
								<select
									data-testid="select-num-tweets"
									className=" text-black"
									value={noOfTweets}
									onChange={tweetHandler}
								>
									{tweetOptions}
								</select>
							</div>
						</div>

						{/* this is for the Fitlering options */}
						<div className="flex flex-row flex-wrap w-1/3 justify-center items-center p-1">
							<div className="mb-0">
								<p className="">Filter:</p>
							</div>
							<div className="mt-0">
								<select
									data-testid="select-filter"
									className=" text-black text-center"
									onChange={filterHandler}
									value={filter}
								>
									<option>-</option>
									<option value="verifiedTweets">Verified Tweets</option>
									<option value="noneReply">Non-Replies</option>
								</select>
							</div>
						</div>

						{/* this is for the sorting options */}
						<div className="flex flex-row flex-wrap w-1/3 justify-center items-center p-1">
							<div>
								<p className="">Sort By:</p>
							</div>
							<div>
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
						</div>
					</div>
					{/* this is for the search button */}
					<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center">
						<div className="pt-3">
							{/* <button
						data-testid="btn-search"
						type="submit"
						className="button w-3/4 text-lg p-0.5"
						onClick={search}
					>
						Search
					</button> */}
							{loading && (
								<button
									type="button"
									className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
									disabled
								>
									{/* <svg
									className="animate-spin h-5 w-5 mr-3 bg-white"
									viewBox="0 0 24 24"
								> */}
									{/* <!-- ... --> */}
									{/* </svg> */}
									{loadIcon}
								</button>
							)}
							{!loading && (
								<Button text="Search" size="large" handle={search} type="search" />
							)}
						</div>
						{/* {apiResponse.length > 1 && ( */}
						{/* // <div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center"> */}
						<div className="pt-3">
							{/* <button
						data-testid="btn-generate"
						type="submit"
						className="button w-3/4 text-lg p-0.5"
						onClick={genRep}
					>
						Generate Report
					</button> */}
							{apiResponse.length === 1 ? (
								<button
									type="button"
									className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center disabled"
									disabled
								>
									{/* <svg
									className="animate-spin h-5 w-5 mr-3 bg-white"
									viewBox="0 0 24 24"
								> */}
									{/* <!-- ... --> */}
									{/* </svg> */}
									{/* {loadIcon} */}
									Generate Report
								</button>
							) : generateLoading ? (
								<button
									type="button"
									className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
									disabled
								>
									{/* <svg
									className="animate-spin h-5 w-5 mr-3 bg-white"
									viewBox="0 0 24 24"
								> */}
									{/* <!-- ... --> */}
									{/* </svg> */}
									{loadIcon}
								</button>
							) : (
								<Button
									text="Generate Report"
									size="large"
									handle={generate}
									type="generate"
								/>
							)}
						</div>
						{/* // </div> */}
						{/* )} */}
					</div>

					{loading && (
						<div className="flex flex-row justify-center my-2">
							{loadIcon} &nbsp; Loading Tweets
						</div>
					)}

					{/* Api response comes here */}
					<div data-testid="result" className="flex flex-col">
						{clicked && (
							<div
								className="mt-4 ml-6 mb-4 flex flex-col flex-wrap justify-center"
								data-aos="fade-left"
								data-aos-duration="800"
								data-aos-easing="ease-in-sine"
								data-aos-offset="300"
							>
								<h1 className="text-2xl ml-2">Newly created report</h1>
								<Link to="/genReport">
									<div
										className="m-4 w-1/4 h-20 bg-white border rounded-lg hover:shadow-2xl flex flex-col p-2"
										data-aos="zoom-in"
										data-aos-duration="500"
										data-aos-delay="700"
									>
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
											<p className="italic text-xs">{auth.username}</p>
										</div>
										<div className="">
											<p className="italic text-xs">{date}</p>
										</div>
									</div>
								</Link>
							</div>
						)}

						{/* {pulse} */}

						{pulse && pulseOutput}

						{apiResponse}
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
