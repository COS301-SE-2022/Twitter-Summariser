// import { Tweet } from 'react-twitter-widgets';
// import { Link } from "react-router-dom";
import { useState } from "react";
// import Tweet from "../Tweet/Tweet";
import { Link } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../../resources/links.json";

// importing mock data
import Text from "../Text/Text";
// import DraftCard from "../DraftCard/DraftCard";

function GenReport() {
	// const [{id}, changeID] = useState("");

	// let generate = 1;

	// console.log("generate is " + generate);

	// let { val } = useParams();
	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");
	// console.log(localStorage.getItem("id"));
	// console.log(val);

	// ################ API FOR GETTING REPORT ###########################

	let getReportEndpoint = String(link.endpointLink);
	getReportEndpoint += "getReport";

	// using localhost
	// const getReportEndpoint = "http://localhost:4000/dev/getReport";

	let requiredData: { apiKey: string | null; reportID: string | null };

	const getRep = async () => {
		// POST request using fetch with error handling

		// if (generate === 1) {
		requiredData = {
			apiKey: localStorage.getItem("loggedUserApi"),
			reportID: localStorage.getItem("draftReportId")
		};

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(requiredData)
		};

		fetch(getReportEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				// console.log(data);

				setState(data.report.Report);
				setTitle(data.report.title);
				setAuthor(data.report.author);
				setDate(data.report.dateCreated.substring(0, 16));
				// console.log(await data.report.dateCreated);

				// check for error response
				if (!response.ok) {
					// error
					// signUpFailure(true);
				}

				// await props.readyToLogIN();
			})
			.catch(() => {
				// console.log("Error retrieving report");
				// signUpFailure(true);
			});
		// }

		// generate = 0;
	};

	getRep();
	// ###################################################################

	// ######################### API FOR PUBLISHING REPORT ###############################################

	let publishEndpoint = String(link.endpointLink);
	publishEndpoint += "publishReport";

	const publishReport = (resultInfo: any) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(resultInfo)
		};

		fetch(publishEndpoint, requestOptions).then(async (response) => {
			const isJson = response.headers.get("content-type")?.includes("application/json");

			isJson && (await response.json());
		});
	};

	// #######################################################################

	const publishHandler = (event: any) => {
		event.preventDefault();

		publishReport(requiredData);
	};

	// processing api response
	const apiResponse = [<div key="begining div" />];

	state.map((data: any, index: number) =>
		apiResponse.push(
			<div className="" key={data.position}>
				{data.blockType === "RICHTEXT" && (
					<div className="">
						{" "}
						<Text keyValue={index} data={data} />{" "}
					</div>
				)}

				{data.blockType === "TWEET" && (
					<div className=" w-full border border-gray-200 p-3" key={data.position}>
						<Tweet
							options={{ align: "center", width: "" }}
							tweetId={data.block.tweetId}
						/>
					</div>
				)}
			</div>
		)
	);

	return (
		<div className="mt-16 ">
			<div className="p-4">
				<h1 className="text-3xl font-bold">{title}</h1>
				<br />
				<h2 className="italic font-bold">Created By: {author}</h2>
				<h3 className="italic text-xs">Date Created: {date}</h3>
			</div>

			<br />

			<div className="grid grid-cols gap-4 content-center">{apiResponse}</div>

			<div className="flex justify-center mb-4">
				<Link to="/getPublishedReport">
					<button
						onClick={publishHandler}
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button text-center"
					>
						{" "}
						PUBLISH REPORT
					</button>
				</Link>
			</div>
		</div>
	);
}

export default GenReport;
