import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../../resources/links.json";

// importing mock data
import PublishedText from "../PublishedText/PublishedText";

function GetPublishedReport() {
	const navigate = useNavigate();

	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");
	const [stat, setStat] = useState("");

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
			body: JSON.stringify(requiredData)
		};

		fetch(getReportEndpoint, requestOptions).then(async (response) => {
			const isJson = response.headers.get("content-type")?.includes("application/json");

			const data = isJson && (await response.json());

			setStat(data.report.status);

			setState(data.report.Report);
			setTitle(data.report.title);
			setAuthor(data.report.author);
			setDate(data.report.dateCreated.substring(0, 16));
		});
	};

	getRep();

	// ######################### API FOR PUBLISHING REPORT ###############################################

	let unpublishEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);

	unpublishEndpoint += "unpublishReport";

	const unpublishReport = (resultInfo: any) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(resultInfo)
		};

		fetch(unpublishEndpoint, requestOptions).then(async (response) => {
			response.headers.get("content-type")?.includes("application/json");

			// isJson && (await response.json());
		});

		navigate("/genReport");
	};

	// #######################################################################
	const unpublishHandler = (event: any) => {
		event.preventDefault();

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
				<Link to="/genReport">
					<button
						onClick={unpublishHandler}
						type="submit"
						className="button__unpublish text-lg p-0.5 h-10 w-56 bg-[#023E8A] rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
					>
						{" "}
						UNPUBLISH REPORT
					</button>
				</Link>
			</div>
		</div>
	);
}

export default GetPublishedReport;
