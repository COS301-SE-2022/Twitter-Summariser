import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../../resources/links.json";

// importing mock data
import Text from "../Text/Text";

// importing icons
import { BsShare } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

function GenReport() {
	const navigate = useNavigate();

	// style for the icons
	const style = { fontSize: "1.3rem" };
	const style__ = { fontSize: "1.5rem", color: "green" };
	const iconStyle3 = { fontSize: "1.5rem", color: "red" };

	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");

	// for starting up sharing
	const [share, setShare] = useState(false);
	const [successfulShare, setSuccessfulShare] = useState(false);
	const [enteredShare, changeEnteredShare] = useState("");

	const shareHandler = () => {
		setShare(!share);
	};

	const [NAN, changeNAN] = useState(false);

	const enteredShareHandler = (event: any) => {
		console.log(event.target.value);
		changeNAN(false);

		changeEnteredShare(event.target.value);
	};

	const [type, changeType] = useState("VIEWER");

	const typeHandler = (event: any) => {
		changeType(event.target.value);
	};

	// ################ API FOR GETTING REPORT ###########################

	let getReportEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);
	getReportEndpoint += "getReport";

	// using localhost
	// const getReportEndpoint = "http://localhost:4000/dev/getReport";

	const requiredData = {
		apiKey: localStorage.getItem("key"),
		reportID: localStorage.getItem("draftReportId")
	};

	const getRep = async () => {
		// POST request using fetch with error handling

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(requiredData)
		};

		fetch(getReportEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				setState(data.report.Report);
				setTitle(data.report.title);
				setAuthor(data.report.author);
				setDate(data.report.dateCreated.substring(0, 16));

				// check for error response
				if (!response.ok) {
					// error
				}
			})
			.catch(() => {});
		// }

		// generate = 0;
	};

	getRep();
	// ###################################################################

	// ######################### API FOR PUBLISHING REPORT ###############################################

	let publishEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);

	publishEndpoint += "publishReport";

	const publishReport = (resultInfo: any) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(resultInfo)
		};

		fetch(publishEndpoint, requestOptions).then(async (response) => {
			response.headers.get("content-type")?.includes("application/json");

			// isJson && (await response.json());
		});

		navigate("/getPublishedReport");
	};

	// #######################################################################

	const publishHandler = (event: any) => {
		event.preventDefault();

		publishReport(requiredData);
		let draftId = String(localStorage.getItem("draftReportId"));
		localStorage.setItem("reportId", draftId);
	};

	// processing api response
	const apiResponse = [<div key="begining div" />];

	// console.log(state);

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
							tweetId={data.block.tweetID}
						/>
					</div>
				)}
			</div>
		)
	);

	// compiling share information
	const requiredDataForShare = {
		apiKey: localStorage.getItem("key"),
		reportID: localStorage.getItem("draftReportId"),
		email: enteredShare,
		type: type
	};

	let shareEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);

	shareEndpoint += "shareReport";

	const shareReport = async (repData: any) => {
		// POST request using fetch with error handling

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(repData)
		};

		fetch(shareEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				// console.log(data);

				// check for error response
				if (data) {
					// error
					// console.log("line 197");

					changeNAN(true);
				} else {
					// console.log("got here");

					changeNAN(false);
					setSuccessfulShare(true);
					setShare(false);
				}
			})
			.catch(() => {});
	};

	const shareSearchHandler = () => {
		if (enteredShare !== "") {
			shareReport(requiredDataForShare);
			// console.log(requiredDataForShare);
		}
	};

	return (
		<div className="mt-16 ">
			<div className="flex flex-row justify-between">
				<div className="ml-2 p-4">
					<h1 className="text-3xl font-bold">{title}</h1>
					<br />
					<h2 className="italic font-bold">Created By: {author}</h2>
					<h3 className="italic text-xs">Date Created: {date}</h3>
				</div>

				<div className="flex flex-row items-end p-4 justify-between">
					<div className="">
						<button>
							<BsShare style={style} onClick={shareHandler} />
						</button>
					</div>
					<div className="">&nbsp;</div>
					<div className="p-1">
						<MdDeleteOutline style={iconStyle3} />
					</div>
				</div>
			</div>

			{/* {share && (
				<div className="flex flex-col">
					{NAN && (
						<div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-2/4 ml-6 p-2">
							<BiErrorCircle style={style} />
							<p>User Does not Exist</p>
						</div>
					)}
					<div className="ml-2 p-4 flex flex-row">
						<input
							data-testid="search"
							type="search"
							className="
                nosubmit
                w-3/4
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
							onChange={enteredShareHandler}
							placeholder="enter user email ..."
						/>
						<button
							data-testid="btn-search"
							type="submit"
							className="button w-1/4 text-lg p-0.5"
							onClick={shareSearchHandler}
						>
							Share
						</button>
					</div>
				</div>
			)} */}

			{/* search */}
			{share && (
				<div className="flex flex-col">
					{NAN && (
						<div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-2/4 ml-6 p-2">
							<BiErrorCircle style={style} />
							<p>User Does not Exist</p>
						</div>
					)}
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
								onChange={enteredShareHandler}
								placeholder="enter user email ..."
							/>
						</div>
					</div>

					<div className="flex flex-col flex-wrap justify-around pt-3 pb-3 border border-gray-200 items-center">
						{/*  */}

						{/* this is for the Fitlering options */}
						<div className="flex flex-row flex-wrap w-1/3 justify-center">
							<p className="">Allow User to: </p> &nbsp;
							<select
								data-testid="select-filter"
								className=" text-black text-center"
								onChange={typeHandler}
							>
								<option value="VIEWER">View</option>
								<option value="EDITOR">Edit</option>
							</select>
						</div>

						{/* this is for the search button */}
						<div className="flex flex-row w-1/3 justify-center pt-3">
							<button
								data-testid="btn-search"
								type="submit"
								className="button w-3/4 text-lg p-0.5"
								onClick={shareSearchHandler}
							>
								Share
							</button>
						</div>
					</div>
				</div>
			)}

			{successfulShare && (
				<div className="flex flex-row border-2 border-green-700 rounded-md bg-green-300 h-auto w-auto w-2/4 ml-6 p-2">
					<AiOutlineCheckCircle style={style__} />
					<p>Report shared successfully</p>
				</div>
			)}

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
