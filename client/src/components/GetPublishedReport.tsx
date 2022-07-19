import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../resources/links.json";
import Button from "./Button";

// importing mock data
import PublishedText from "./PublishedText";

function GetPublishedReport() {
	const navigate = useNavigate();
	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");
	const [stat, setStat] = useState("");
	const [perm, setPerm] = useState("");

	// handling loading things.........
	const [pageLoading, changePageLoading] = useState(true);

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

	// ################ API FOR GETTING REPORT ###########################

	let getReportEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);
	getReportEndpoint += "getReport";

	let requiredData: { apiKey: string | null; reportID: string | null };

	const getRep = async () => {
		// POST request using fetch with error handling
		requiredData = {
			apiKey: localStorage.getItem("key"),
			reportID: localStorage.getItem("reportId")
		};

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(requiredData),
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
		};

		fetch(getReportEndpoint, requestOptions).then(async (response) => {
			const isJson = response.headers.get("content-type")?.includes("application/json");

			const data = isJson && (await response.json());

			setPerm(data.report.permission);

			// console.log(data);


			setStat(data.report.status);

			setState(data.report.Report);
			setTitle(data.report.title);
			setAuthor(data.report.author);
			setDate(data.report.dateCreated.substring(0, 16));
			changePageLoading(false);
		});
	};

	// console.log(state);

	getRep();

	// ######################### API FOR UNPUBLISHING REPORT ###############################################

	let unpublishEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);

	unpublishEndpoint += "unpublishReport";

	const unpublishReport = (resultInfo: any) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(resultInfo),
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
		};

		fetch(unpublishEndpoint, requestOptions).then(async (response) => {
			response.headers.get("content-type")?.includes("application/json");

			// isJson && (await response.json());
		});

		navigate("/genReport");
	};

	// #######################################################################
	// const unpublishHandler = (event: any) => {
	const unpublishHandler = () => {
		unpublishReport(requiredData);
		let reportId = String(localStorage.getItem("reportId"));
		localStorage.setItem("draftReportId", reportId);
	};
	// console.log(state);

	// processing api response
	const apiResponse = [<div key="begining div" />];

	state.map((data: any, index: number) =>
		apiResponse.push(
			<div className="" key={data.position}>
				{data.blockType === "RICHTEXT" && (
					<div className="">
						{" "}
						<PublishedText keyValue={index} data={data} status={stat} />{" "}
					</div>
				)}

				{data.blockType === "TWEET" && (
					<div className=" w-full border border-gray-200 p-3" key={data.position}>
						<Tweet
							options={{ align: "center", width: "" }}
							tweetId={data.block.tweetID}
						/>
					</div>
				)}
			</div>
		)
	);

	const isOwner = () => {
		if(perm === "OWNER")
			return true;
		else
			return false
	}

	// console.log(perm);


	return (
		<div>
			{pageLoading ? (
				<div className="flex flex-row justify-center h-screen items-center">
					{loadIcon} &nbsp; Loading Report
				</div>
			) : (
				<div className="mt-16 ">
					<div className="p-4">
						<h1 className="text-3xl font-bold">{title}</h1>
						<br />
						<h2 className="italic font-bold">Created By: {author}</h2>
						<h3 className="italic text-xs">Date Created: {date}</h3>
					</div>

					<br />

					<div className="grid grid-cols gap-4 content-center">{apiResponse}</div>
					{isOwner() && <div className="flex justify-center mb-4">
						<Link to="/genReport">
							<Button
								text="Unpublish Report"
								size="large"
								handle={unpublishHandler}
								type="unpublish"
							/>
						</Link>
					</div> }
				</div>
			)}
		</div>
	);
}

export default GetPublishedReport;
