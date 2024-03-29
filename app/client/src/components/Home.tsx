import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import { FiSettings } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import ExploreCard from "./ExploreCard";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";
import "./styles/Animation.css";
import Modals from "./Modals";

function Home() {
	const [enteredSearch, changeEnteredSearch] = useState("");
	const [resultSet, changeResultSet] = useState("");
	const [date, changeDate] = useState("");
	const [draftReport, changeDraftReport] = useState("");
	const [clicked, changeClicked] = useState(false);
	const [createTitle, changeCreateTitle] = useState("");
	const [loading, changeLoading] = useState(false);
	const [scheduleResponse, changeScheduleResponse] = useState("");
	const [sentimentResponse, changeSentimentResponse] = useState<any[]>([]);
	const [showTrends, changeShowTrends] = useState(true);
	const [showSentimentOption, changeShowSentimentOption] = useState(false);
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const [generateLoading, changeGenerateLoading] = useState(false);
	const { auth } = useAuth();
	const navigate = useNavigate();
	const trendsResponse = [<div key="begining div" />];
	const style = { fontSize: "1.5rem" };

	let searchInput = document.getElementById("default-search") as HTMLInputElement;

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
			let response;
			if (process.env.NODE_ENV === "development") {
				response = await axiosPrivate.post("generateReport", JSON.stringify(searchData), {
					signal: controller.signal
				});
			} else {
				response = await axios.post(
					"https://5lgckw2brai7suqgmedu3cp4ru0anphh.lambda-url.us-east-1.on.aws/",
					JSON.stringify(searchData),
					{
						headers: {
							"Content-Type": "application/json"
						}
					}
				);
			}

			changeGenerateLoading(false);
			changeDate(response.data.Report.dateCreated.substring(0, 10));
			changeDraftReport(response.data.Report.reportID);

			if (enteredSearch !== "") {
				changeCreateTitle(enteredSearch);
				changeEnteredSearch("");
				changeClicked(true);
			}

			navigate(`/report/${response.data.Report.reportID}`);
		} catch (error) {
			console.error(error);
		}
	};

	const [searchResponse, changeResponse] = useState<any[]>([]);
	const [noOfTweets, changeNoOfTweets] = useState(10);
	const [sort, changeSort] = useState("byLikes");
	const [filter, changeFilter] = useState("verifiedTweets");
	const [dateTime, changeDateTime] = useState(new Date());
	const [checked, setChecked] = useState(false);

	const [checkedSentiment, setCheckedSentiment] = useState(false);

	const [pulse, changePulse] = useState(false);

	const analyseData: any[] = [];

	const scheduleReport = async (scheduleData: any) => {
		try {
			const response = await axiosPrivate.post(
				"reportScheduler",
				JSON.stringify(scheduleData)
			);
			changeScheduleResponse(await response.data);
			scheduleResponse;
		} catch (err) {
			console.error(err);
		}
	};

	const schedule = () => {
		const utcDate = dateTime.toUTCString();

		const scheduleData = {
			fullUTCDate: utcDate,
			reportDetails: {
				apiKey: auth.apiKey,
				filterBy: filter,
				keyword: enteredSearch,
				numOfTweets: noOfTweets,
				sortBy: sort,
				author: auth.username
			}
		};
		scheduleReport(scheduleData);
	};

	const done = () => {
		changePulse(false);
	};

	const apiResponseWithSentimentAnalysis = [<div key="begining div" />];

	const viewSentimentAnalysis = async (sentimentData: any) => {
		try {
			const response = await axiosPrivate.post("getSentiment", JSON.stringify(sentimentData));
			changeSentimentResponse(await response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const analyse = (resp: any) => {
		resp.map((data: { tweetId: any }) => analyseData.push(data.tweetId));
		const sentimentData = { tweets: analyseData };
		viewSentimentAnalysis(sentimentData);
	};

	const checkedHandler = () => {
		if (checkedSentiment) {
			setCheckedSentiment(false);
		} else {
			setCheckedSentiment(true);
			analyse(searchResponse);
		}
	};

	const searchTwitter = async (searchData: any) => {
		try {
			const response = await axiosPrivate.post("searchTweets", JSON.stringify(searchData));
			changeResultSet(await response.data.resultSetID);
			changeResponse(await response.data.tweets);
			changeLoading(false);
			changePulse(true);
			analyse(await response.data.tweets);
		} catch (err) {
			console.error(err);
		}
	};

	const search = async () => {
		changeShowTrends(false);
		changeShowSentimentOption(true);

		if (checked) {
			schedule();
		}

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

	function opacityValue(inp: number): number {
		if (inp > 0 && inp <= 10) {
			return 10;
		}
		if (inp > 10 && inp <= 20) {
			return 20;
		}
		if (inp > 20 && inp <= 30) {
			return 30;
		}
		if (inp > 30 && inp <= 40) {
			return 40;
		}
		if (inp > 40 && inp <= 50) {
			return 50;
		}
		if (inp > 50 && inp <= 60) {
			return 60;
		}
		if (inp > 60 && inp <= 70) {
			return 70;
		}
		if (inp > 70 && inp <= 80) {
			return 80;
		}
		if (inp > 80 && inp <= 90) {
			return 90;
		}
		if (inp > 90 && inp <= 100) {
			return 100;
		}
		return 0;
	}

	searchResponse.map((data) =>
		apiResponse.push(
			<div className="pb-8" key={data.tweetId}>
				<Tweet options={{ align: "center" }} tweetId={data.tweetId} onLoad={done} />
			</div>
		)
	);

	sentimentResponse.map((data) =>
		apiResponseWithSentimentAnalysis.push(
			<>
				{data.sentimentWord === "NEGATIVE" && (
					<div
						className={` rounded-lg border-2 border-red-500 border-opacity-${opacityValue(
							Math.floor(data.sentiment.Negative * 100)
						)}  `}
						key={data.id + 1}
					>
						<Tweet options={{ align: "center" }} tweetId={data.id} onLoad={done} />
						<p className="text-red-500">
							Negative - {Math.floor(data.sentiment.Negative * 100)} %
						</p>
					</div>
				)}
				{data.sentimentWord === "POSITIVE" && (
					<div
						className={` rounded-lg border-2 border-green-500 border-opacity-${opacityValue(
							Math.floor(data.sentiment.Positive * 100)
						)} `}
						key={data.id + 2}
					>
						<Tweet options={{ align: "center" }} tweetId={data.id} onLoad={done} />
						<p className="text-green-500">
							Positive - {Math.floor(data.sentiment.Positive * 100)} %
						</p>
					</div>
				)}
				{data.sentimentWord === "MIXED" && (
					<div
						className={` rounded-lg border-2 border-gray-500 border-opacity-${opacityValue(
							Math.floor(data.sentiment.Mixed * 100)
						)} `}
						key={data.id + 3}
					>
						<Tweet options={{ align: "center" }} tweetId={data.id} onLoad={done} />
						<p className="text-gray-500">
							Mixed - {Math.floor(data.sentiment.Mixed * 100)} %
						</p>
					</div>
				)}
				{data.sentimentWord === "NEUTRAL" && (
					<div
						className={` rounded-lg border-2 border-blue-500 border-opacity-${opacityValue(
							Math.floor(data.sentiment.Neutral * 100)
						)} `}
						key={data.id + 4}
					>
						<Tweet options={{ align: "center" }} tweetId={data.id} onLoad={done} />
						{/* Neutral - {Math.floor(data.sentiment.Neutral * 100)} % */}
						<p className="text-blue-500">
							Neutral - {Math.floor(data.sentiment.Neutral * 100)} %
						</p>
					</div>
				)}
				<br />
			</>
		)
	);

	const draftID = draftReport;
	const newDraftReportLink = `/report/${draftID}`;

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}

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

	const [trends, changeTrends] = useState<any[]>([]);

	const getTrends = async (isMounted: boolean) => {
		const trendData = {
			apiKey: auth.apiKey
		};

		try {
			const response = await axiosPrivate.post(
				"getTrendingTopics",
				JSON.stringify(trendData)
			);

			isMounted && changeTrends(response.data);
			changeLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		let isMounted = true;
		getTrends(isMounted);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	trends.map((tweetData) =>
		trendsResponse.push(
			<div
				key={trends.indexOf(tweetData)}
				className="bg-gray-200 text-black items-center rounded-md mt-3 flex p-2.5 hover:cursor-pointer hover:bg-gray-400"
				onClick={() => {
					searchInput = document.getElementById("default-search") as HTMLInputElement;
					searchInput.value = tweetData;
					changeEnteredSearch(tweetData);
					scrollToTop();
				}}
			>
				<FaTwitter />
				<p className="truncate md:w-full sm:w-3 text-black font-medium">{tweetData}</p>
				<div className="actions ml-6 md:ml-0">{}</div>
			</div>
		)
	);

	const [report, changeReport] = useState<any[]>([]);

	useEffect(() => {
		let isMounted = true;

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

	const [advance, setAdvanceOn] = useState(false);
	const [choice, setChoice] = useState(false);

	const toggleAdvancSearch = () => {
		setAdvanceOn(true);
	};

	if (choice) {
		// console.log(choice);
	}

	return (
		<div data-testid="home">
			{homeDefault && (
				<div data-testid="container1" className="mt-20 flex flex-col w-full relative">
					{/* certain options and search button comes here */}
					<div className="w-full p-3 flex flex-col justify-center">
						{/* this is for the search button */}
						<div className="flex flex-row justify-around">
							<Button
								div
								data-testid="btn-start"
								text="Get Started"
								size="large"
								handle={displayHomeSearch}
								type="start"
							/>
						</div>
					</div>
					<div className="mt-2 pt-3 ">
						<div className=" mt-4 text-center">
							<h1
								data-testid="heading-explore"
								className="pl-2 pr-2 text-black font-semibold text-3xl"
							>
								Explore Latest Reports
							</h1>

							<div
								data-testid="reports"
								className="mt-8 mr-2 ml-2 flex flex-row flex-wrap justify-center"
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
												className="sm:w-1/2 w-full mt-2"
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
			)}
			{!homeDefault && (
				<div className="mt-8 mini-tablet:mt-0">
					<div className="flex justify-center pt-8 pl-4 pr-8 pb-2">
						<label
							data-testid="search-label"
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
								data-testid="search-input"
								type="search"
								id="default-search"
								className="pl-10 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-full border-gray-200 border focus:outline-none focus:ring focus:border-blue-500"
								value={enteredSearch}
								onChange={searchHandler}
								placeholder="Search Twitter..."
								required
							/>
						</div>
						<div
							data-testid="icon-advanced-search"
							className="w-1/12 items-center flex flex-col justify-center cursor-pointer"
						>
							<FiSettings style={style} onClick={toggleAdvancSearch} />
						</div>
					</div>

					{/* this is for the search button */}
					<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center">
						<div className="md:ml-0 ml-2">
							{loading && (
								<button
									type="button"
									className="rounded-full items-center py-2.5 md:px-14 px-14 text-sm font-semibold text-center text-white bg-dark-cornflower-blue opacity-50"
									disabled
								>
									{/* </svg> */}
									{loadIcon}
								</button>
							)}
							{!loading && (
								<button
									type="submit"
									onClick={search}
									className="rounded-full items-center py-2.5 md:px-14 px-14 text-sm font-semibold text-center text-white hover:bg-dark-cornflower-blue  bg-midnight-blue group hover:shadow"
								>
									Search
								</button>
							)}
						</div>
						<div className="mr-2">
							{apiResponse.length === 1 ? (
								<button
									type="button"
									className="rounded-full items-center py-2.5 md:px-14 px-4 text-sm font-semibold text-center text-white bg-dark-cornflower-blue opacity-50 disabled"
									disabled
								>
									Generate Report
								</button>
							) : generateLoading ? (
								<button
									type="button"
									className="rounded-full items-center py-2.5 md:px-20 px-16 text-sm font-semibold text-center text-white bg-dark-cornflower-blue opacity-50 "
									disabled
								>
									{loadIcon}
								</button>
							) : (
								<>
									<button
										className="rounded-full items-center py-2.5 md:px-14 px-4 text-sm font-semibold text-center text-white hover:bg-dark-cornflower-blue  bg-midnight-blue group hover:shadow"
										onClick={generate}
										type="submit"
									>
										Generate Report{" "}
									</button>
								</>
							)}
						</div>
					</div>

					<br />

					{/* {showSentimentOption && !checkedSentiment && (
						<div className="" data-bs-toggle="tooltip" title="Show sentiment analysis">
							<button type="submit">
								<AiOutlineEye style={style2} onClick={checkedHandler} />
							</button>
						</div>
					)}
					{showSentimentOption && checkedSentiment && (
						<div className="" data-bs-toggle="tooltip" title="Show sentiment analysis">
							<button type="submit">
								<AiOutlineEyeInvisible style={style2} onClick={checkedHandler} />
							</button>
						</div>
					)} */}

					{showSentimentOption && !pulse && !loading && (
						<div className="mb-3 ml-4">
							<label
								htmlFor="default-toggle"
								className="inline-flex relative items-center align-center text-center  justify-center cursor-pointer"
							>
								<input
									type="checkbox"
									value="checkedValue"
									onClick={checkedHandler}
									id="default-toggle"
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
								<span className="ml-3 text-md font-medium text-center">
									Show Tweets Sentiment
								</span>
							</label>
						</div>
					)}
					{loading && (
						<div className="flex flex-row justify-center my-2">
							{loadIcon} &nbsp; Loading Tweets
						</div>
					)}

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
								<Link to={newDraftReportLink}>
									<div
										className="m-4 w-1/4 h-20 bg-white border rounded-sm hover:shadow-2xl flex flex-col p-2"
										data-aos="zoom-in"
										data-aos-duration="500"
										data-aos-delay="700"
									>
										<div className="">
											<button data-testid="btn-report" type="submit">
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

						{advance && (
							<Modals
								setAdvanceOn={setAdvanceOn}
								setChoice={setChoice}
								changeNoOfTweets={changeNoOfTweets}
								changeSort={changeSort}
								changeFilter={changeFilter}
								toggleSearch={search}
								setChecked={setChecked}
								dateTime={dateTime}
								changeDateTime={changeDateTime}
								modalChoice="advancedSearch"
								show={advance}
							/>
						)}

						{pulse && pulseOutput}

						{!checkedSentiment && apiResponse}

						{checkedSentiment && apiResponseWithSentimentAnalysis}
					</div>

					{showTrends && (
						<div className="md:mt-0 mt-2 items-center justify-center md:ml-32 md:mr-32 ml-10 mr-10">
							<h1 className="text-2xl  flex flex-row justify-center border-b-4 mb-2  pb-4 w-full mr-16 align-middle items-center border-slate-300">
								LATEST TRENDS
							</h1>
							<div>{trendsResponse}</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
