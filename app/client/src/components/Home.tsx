import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { Checkbox } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Checkbox } from "@mui/material";
import axios from "axios";
import ExploreCard from "./ExploreCard";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";
import "./styles/Animation.css";
import AdvanceSearch from "./AdvanceSearch";

function Home() {
	const [enteredSearch, changeEnteredSearch] = useState("");
	const [resultSet, changeResultSet] = useState("");
	const [date, changeDate] = useState("");
	const [draftReport, changeDraftReport] = useState("");
	const [clicked, changeClicked] = useState(false);
	const [createTitle, changeCreateTitle] = useState("");
	const [loading, changeLoading] = useState(false);
	const [scheduleResponse, changeScheduleResponse] = useState("");

	const [showTrends, changeShowTrends] = useState(true);

	const [showSentimentOption, changeShowSentimentOption] = useState(false);
	const style2 = { fontSize: "1.5rem" };

	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const [generateLoading, changeGenerateLoading] = useState(false);
	const { auth } = useAuth();
	const navigate = useNavigate();

	const style = { fontSize: "1.5rem" };

	const mockTrends = [
		{
			id: 0,
			trend: "QueenElizabeth"
		},
		{
			id: 1,
			trend: "ESKOM"
		},
		{
			id: 2,
			trend: "Haaland"
		},
		{
			id: 3,
			trend: "COVID19"
		},
		{
			id: 4,
			trend: "Biden"
		},
		{
			id: 5,
			trend: "Ramaphosa"
		}
	];

	let searchInput = document.getElementById("default-search") as HTMLInputElement;

	const trendsResponse = [<div key="begining div" />];

	mockTrends.map((tweetData) =>
		trendsResponse.push(
			<div
				key={tweetData.id}
				className="cursor-pointer pb-2 text-midnight-blue font-semibold"
				onClick={() => {
					searchInput = document.getElementById("default-search") as HTMLInputElement;
					searchInput.value = tweetData.trend;
					changeEnteredSearch(tweetData.trend);
				}}
			>
				#{tweetData.trend}
			</div>
		)
	);

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
			if (process.env.NODE_ENV === "development") {
				const response = await axiosPrivate.post(
					"generateReport",
					JSON.stringify(searchData),
					{ signal: controller.signal }
				);

				changeGenerateLoading(false);
				changeDate(response.data.Report.dateCreated.substring(0, 10));
				changeDraftReport(response.data.Report.reportID);

				if (enteredSearch !== "") {
					changeCreateTitle(enteredSearch);
					changeEnteredSearch("");
					changeClicked(true);
				}

				navigate(`/report/${response.data.Report.reportID}`);
				
			} else {
				const response = await axios.post(
					"https://betuh6rejrtpyywnwkbckrdnea0bypye.lambda-url.us-east-1.on.aws/",
					JSON.stringify(searchData),
					{
						headers: {
							"Content-Type": "application/json"
						}
					}
				);

				changeGenerateLoading(false);
				changeDate(response.data.Report.dateCreated.substring(0, 10));
				changeDraftReport(response.data.Report.reportID);

				if (enteredSearch !== "") {
					changeCreateTitle(enteredSearch);
					changeEnteredSearch("");
					changeClicked(true);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const [searchResponse, changeResponse] = useState<any[]>([]);
	const [noOfTweets, changeNoOfTweets] = useState(5);
	const [sort, changeSort] = useState("-");
	const [filter, changeFilter] = useState("-");
	const [dateTime, changeDateTime] = useState(new Date());
	const [checked, setChecked] = useState(false);
	const [repeat, changeRepeat] = useState("-");

	const [checkedSentiment, setCheckedSentiment] = useState(false);

	// const [semanticColor, changeSemanticColor] = useState("red");
	const sentimentColor = "green";

	// const checkedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setCheckedSentiment(event.target.checked);
	// };

	const checkedHandler = () => {
		if (checkedSentiment) {
			setCheckedSentiment(false);
		} else {
			setCheckedSentiment(true);
		}
	};

	// const tweetHandler = (event: any) => {
	// 	changeNoOfTweets(event.target.value);
	// };

	// const sortHandler = (event: any) => {
	// 	changeSort(event.target.value);
	// };

	// const filterHandler = (event: any) => {
	// 	changeFilter(event.target.value);
	// };

	// UNCOMMENT FOR SCHEDULE REPORT FUNCTIONALITY
	// const scheduleHandler = (event: any) => {
	// 	changeSchedule(event.target.value);
	// }

	const [pulse, changePulse] = useState(false);

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
			repeatCyle: repeat,
			reportDetails: {
				apiKey: auth.apiKey,
				filterBy: filter,
				keyword: enteredSearch,
				numOfTweets: noOfTweets,
				sortBy: sort,
				author: auth.username
			}
		};

		// console.log(scheduleData);

		scheduleReport(scheduleData);
	};

	const searchTwitter = async (searchData: any) => {
		try {
			const response = await axiosPrivate.post("searchTweets", JSON.stringify(searchData));
			changeResultSet(await response.data.resultSetID);
			changeResponse(await response.data.tweets);
			// console.log(await response.data);
			changeLoading(false);
			changePulse(true);
		} catch (err) {
			console.error(err);
		}
	};

	const search = () => {
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

	const apiResponseWithSentimentAnalysis = [<div key="begining div" />];

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
		apiResponse.push(
			<div className="pb-8" key={data.tweetId}>
				<Tweet options={{ align: "center" }} tweetId={data.tweetId} onLoad={done} />
			</div>
		)
	);

	searchResponse.map((data) =>
		apiResponseWithSentimentAnalysis.push(
			<div className={`pb-8 border-2 border-${sentimentColor}-500`} key={data.tweetId}>
				<Tweet options={{ align: "center" }} tweetId={data.tweetId} onLoad={done} />
			</div>
		)
	);

	const draftID = draftReport;
	const newDraftReportLink = `/report/${draftID}`;

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
		console.log(choice);
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
								text="Get Started"
								size="large"
								handle={displayHomeSearch}
								type="start"
							/>
						</div>
					</div>
					<div className="mt-2 pt-3 ">
						<div className=" mt-4 text-center">
							<h1 className="pl-2 pr-2 text-black font-semibold text-3xl">
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
								className="pl-10 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-full border-gray-200 border focus:outline-none focus:ring focus:border-blue-500"
								value={enteredSearch}
								onChange={searchHandler}
								placeholder="Search Twitter..."
								required
							/>
						</div>
						<div className="w-1/12 items-center flex flex-col justify-center cursor-pointer">
							<BsThreeDotsVertical style={style} onClick={toggleAdvancSearch} />
						</div>
					</div>

					{/* this is for the search button */}
					<div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center">
						<div className="pt-3">
							{loading && (
								<button
									type="button"
									className="flex flex-col bg-dark-cornflower-blue rounded-full text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
									disabled
								>
									{/* </svg> */}
									{loadIcon}
								</button>
							)}
							{!loading && (
								<Button text="Search" size="large" handle={search} type="search" />
							)}
						</div>
						<div className="pt-3">
							{apiResponse.length === 1 ? (
								<button
									type="button"
									className="flex flex-col bg-dark-cornflower-blue rounded-full text-white font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center disabled"
									disabled
								>
									Generate Report
								</button>
							) : generateLoading ? (
								<button
									type="button"
									className="flex flex-col bg-dark-cornflower-blue rounded-full text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
									disabled
								>
									{loadIcon}
								</button>
							) : (
								<>
									<Button
										text="Generate Report"
										size="large"
										handle={generate}
										type="generate"
									/>
								</>
							)}
						</div>
					</div>

					<br />

					{showSentimentOption && !checkedSentiment && (
						// <div className="mb-0">
						// 	<p className="">Show sentiment analysis:</p>
						// 	<Checkbox
						// 		checked={checkedSentiment}
						// 		onChange={checkedHandler}
						// 		inputProps={{ "aria-label": "controlled" }}
						// 	/>
						// </div>
						<div className="" data-bs-toggle="tooltip" title="Show sentiment analysis">
							<button type="submit">
								<AiOutlineEye style={style2} onClick={checkedHandler} />
							</button>
						</div>
					)}
					{showSentimentOption && checkedSentiment && (
						// <div className="mb-0">
						// 	<p className="">Show sentiment analysis:</p>
						// 	<Checkbox
						// 		checked={checkedSentiment}
						// 		onChange={checkedHandler}
						// 		inputProps={{ "aria-label": "controlled" }}
						// 	/>
						// </div>
						<div className="" data-bs-toggle="tooltip" title="Show sentiment analysis">
							<button type="submit">
								<AiOutlineEyeInvisible style={style2} onClick={checkedHandler} />
							</button>
						</div>
					)}

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

						{/* advanced search modal */}
						{advance && (
							<AdvanceSearch
								setAdvanceOn={setAdvanceOn}
								setChoice={setChoice}
								changeNoOfTweets={changeNoOfTweets}
								changeSort={changeSort}
								changeFilter={changeFilter}
								changeRepeat={changeRepeat}
								toggleSearch={search}
								setChecked={setChecked}
								// enteredSearch={enteredSearch}
								dateTime={dateTime}
								changeDateTime={changeDateTime}
							/>
						)}

						{pulse && pulseOutput}

						{!checkedSentiment && apiResponse}

						{checkedSentiment && apiResponseWithSentimentAnalysis}
					</div>

					{showTrends && (
						<div>
							<h1 className="text-2xl hidden lg:flex lg:flex-row lg:justify-center border-b pb-4 w-5/6 align-middle items-center border-slate-300">
								LATEST TRENDS
							</h1>
							{trendsResponse}{" "}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
