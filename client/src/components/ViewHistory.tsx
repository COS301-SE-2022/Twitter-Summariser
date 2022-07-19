import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";

function ViewHistory() {
	const [searchPhrase, changePhrase] = useState("");
	const [sort, changeSort] = useState("");
	const [filter, changeFilter] = useState("");
	const [date, changeDate] = useState("");
	const [tweets, changeTweets] = useState<any[]>([]);
	const [genReport, changeGenReport] = useState("");
	const [clicked, changeClicked] = useState(false);
	const [generateLoading, changeGenerateLoading] = useState(false);
	const [pageLoading, changePageLoading] = useState(true);
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();

	const generateLoadingHandler = () => {
		changeGenerateLoading(!generateLoading);
	};

	useEffect(() => {
		let isMounted: boolean = true;
		getResultSet(isMounted);

		return () => {
			isMounted = false;
			controller.abort();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getResultSet = async (isMounted: boolean) => {
		const resultSetData = {
			apiKey: localStorage.getItem("key"),
			resultSetID: localStorage.getItem("resultSetId")
		};

		try {
			const response = await axiosPrivate.post(
				"getResultSet",
				JSON.stringify(resultSetData),
				{ signal: controller.signal }
			);
			isMounted && changePageLoading(false);
			isMounted && changeTweets(response.data.tweets);
			isMounted && changePhrase(response.data.searchPhrase);
			isMounted && changeDate(response.data.dateCreated.substring(0, 16));
			isMounted && changeSort(response.data.sortOption);
			isMounted && changeFilter(response.data.filterOption);
		} catch (error) {
			console.log(error);
		}
	};

	const genRep = async () => {
		const searchData = {
			apiKey: localStorage.getItem("key"),
			author: localStorage.getItem("username"),
			resultSetID: localStorage.getItem("resultSetId")
		};

		try {
			const response = await axiosPrivate.post("generateReport", JSON.stringify(searchData), {
				signal: controller.signal
			});
			changeGenerateLoading(false);
			changeDate(await response.data.Report.dateCreated.substring(0, 10));
			changeGenReport(response.data.Report.reportID);
			changeClicked(true);
		} catch (error) {
			console.log(error);
		}
	};

	const generate = () => {
		generateLoadingHandler();
		genRep();
	};

	const viewGenReport = () => {
		localStorage.setItem("draftReportId", genReport);
	};

	const tweetOptions = [];
	const apiResponse = [<div key="begining div" />];

	for (let index = 1; index <= 100; index++) {
		tweetOptions.push(<option key={index.toString()}>{index}</option>);
	}

	tweets.map((data) =>
		apiResponse.push(
			<div className=" w-full border border-gray-200 p-3" key={data}>
				<Tweet options={{ align: "center", width: "" }} tweetId={data} />
			</div>
		)
	);

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

	return (
		<div>
			{!clicked &&
				(pageLoading ? (
					<div className="flex flex-row justify-center h-screen items-center">
						{loadIcon} &nbsp; Loading Tweets
					</div>
				) : (
					<div>
						<div className="flex flex-col flex-wrap justify-around pt-3 pb-3 ">
							{/*  */}
							<h1 className="text-3xl mt-12">{searchPhrase}</h1>

							<div className="flex flex-col mt-4">
								<div className="flex flex-row flex-wrap w-auto font-light text-sm italic">
									<p>Date searched:</p> &nbsp;
									<p>{date}</p>
								</div>

								<div className="flex flex-row">
									<div className="flex flex-row flex-wrap w-auto text-sm">
										<p className="">Filtered by:</p> &nbsp;
										<p>{filter}</p>
									</div>

									{/* this is for the sorting options */}
									<div className="flex flex-row flex-wrap w-auto text-sm ml-3">
										<p className="">Sorted:</p> &nbsp;
										<p>{sort}</p>
									</div>
								</div>
								{/* this is for the Fitlering options */}
							</div>
						</div>

						<div data-testid="result" className="flex flex-col">
							{apiResponse}
							<br />
							<div className="flex flex-row w-full justify-center pt-3 mb-9">
								{/* <button
								data-testid="btn-generate"
								type="submit"
								className="button w-3/4 text-lg p-0.5"
								onClick={genRep}
							>
								Generate Report
							</button> */}
								{generateLoading && (
									<button
										type="button"
										className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-full items-center"
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
								{!generateLoading && (
									<Button
										text="Generate Report"
										size="large"
										handle={generate}
										type="generate"
									/>
								)}
							</div>
						</div>
					</div>
				))}

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
									<p className="font-bold">{searchPhrase}</p>
								</button>
							</div>
							<div className="mt-2">
								<p className="italic text-xs">{localStorage.getItem("username")}</p>
							</div>
							<div className="">
								<p className="italic text-xs">{date}</p>
							</div>
						</div>
					</Link>
				</div>
			)}
		</div>
	);
}

export default ViewHistory;
