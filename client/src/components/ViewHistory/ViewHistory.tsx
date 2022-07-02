import { useState } from "react";
// import Tweet from "../Tweet/Tweet";
import { Link } from "react-router-dom";
import HomeTweet from "../HomeTweet/HomeTweet";

function ViewHistory() {
	// console.log(localStorage.getItem("resultSetId"));

	const [searchPhrase, changePhrase] = useState("");
	const [sort, changeSort] = useState("");
	const [filter, changeFilter] = useState("");
	const [date, changeDate] = useState("");
	const [tweets, changeTweets] = useState<any[]>([]);
	const [genReport, changeGenReport] = useState("");
	const [clicked, changeClicked] = useState(false);

	// ################ API FOR GET RESULT SET REPORT ###########################

	const getResultSetEndpoint =
		"https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getResultSet";

	const getResultSet = async () => {
		const resultSetData = {
			apiKey: localStorage.getItem("loggedUserApi"),
			resultSetID: localStorage.getItem("resultSetId")
		};

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(resultSetData)
		};

		fetch(getResultSetEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());
				// console.log(data.resultSet);

				if (!response.ok) {
					// error

					return;
				}

				// changeDate(await data.Report.dateCreated.substring(0, 10));
				changePhrase(await data.resultSet.searchPhrase);
				changeDate(await data.resultSet.dateCreated.substring(0, 16));
				changeSort(await data.resultSet.sortOption);
				changeFilter(await data.resultSet.filterOption);
				changeTweets(await data.Tweets);
			})
			.catch(() => {
				// console.log("Error Generating Report");
			});
	};

	getResultSet();
	// ###################################################################

	// ################ API FOR GENERATE REPORT ###########################

	const genReportEndpoint =
		"https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/generateReport";

	const genRep = async () => {
		const searchData = {
			apiKey: localStorage.getItem("loggedUserApi"),
			author: localStorage.getItem("loggedUserName"),
			resultSetID: localStorage.getItem("resultSetId")
		};

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(searchData)
		};

		fetch(genReportEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				if (!response.ok) {
					// error

					return;
				}

				changeDate(await data.Report.dateCreated.substring(0, 10));
				changeGenReport(data.Report.reportID);
				changeClicked(true);
			})
			.catch(() => {
				// console.log("Error Generating Report");
			});
	};

	// ###################################################################

	// tweet options
	const tweetOptions = [];

	for (let index = 1; index <= 100; index++) {
		tweetOptions.push(<option key={index.toString()}>{index}</option>);
	}

	// processing api response
	const apiResponse = [<div key="begining div" />];

	tweets.map((data) =>
		apiResponse.push(
			<div key={data}>
				<HomeTweet tweetData={data} />
			</div>
		)
	);

	// let ind = 0;

	const viewGenReport = () => {
		// if (enteredSearch !== "") {
		localStorage.setItem("draftReportId", genReport);
		// }
	};

	return (
		<div>
			{!clicked && (
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
						<div className="flex flex-row w-full justify-center pt-3">
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
									<p className="font-bold">{searchPhrase}</p>
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
	);
}

export default ViewHistory;
