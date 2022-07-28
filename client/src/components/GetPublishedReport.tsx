import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import { GrCopy } from "react-icons/gr";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";
import PublishedText from "./PublishedText";
import "./styles/Animation.css";

function GetPublishedReport() {
	// const style = { fontSize: "1.3rem" };
	// const styleNew = { fontSize: "1.5rem", color: "green" };
	const iconStyle3 = { fontSize: "1.5rem", color: "red" };
	// const iconStyle4 = { fontSize: "1.8rem", color: "red" };

	const navigate = useNavigate();
	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");
	const [stat, setStat] = useState("");
	const [perm, setPerm] = useState("");
	const [pageLoading, changePageLoading] = useState(true);
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();

	const [pulse, changePulse] = useState(false);
	const [pulseCounter, changeCounter] = useState(0);

	const done = () => {
		changePulse(false);
		changeCounter(1);
	};

	let requiredData: { apiKey: string | null; reportID: string | null };

	const getRep = async (isMounted: boolean) => {
		requiredData = {
			apiKey: auth.apiKey,
			reportID: localStorage.getItem("reportId")
		};

		try {
			const response = await axiosPrivate.post("getReport", JSON.stringify(requiredData), {
				signal: controller.signal
			});
			isMounted && setPerm(response.data.report.permission);
			isMounted && setStat(response.data.report.status);
			isMounted && setState(response.data.report.Report);
			isMounted && setTitle(response.data.report.title);
			isMounted && setAuthor(response.data.report.author);
			isMounted && setDate(response.data.report.dateCreated.substring(0, 16));
			isMounted && changePageLoading(false);

			if (pulseCounter === 0) {
				changePulse(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		let isMounted = true;
		getRep(isMounted);

		return () => {
			isMounted = false;
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const unpublishReport = async (resultInfo: any) => {
		try {
			await axiosPrivate.post("unpublishReport", JSON.stringify(resultInfo), {
				signal: controller.signal
			});

			navigate("/genReport");
		} catch (error) {
			console.error(error);
		}
	};

	const unpublishHandler = () => {
		requiredData = {
			apiKey: auth.apiKey,
			reportID: localStorage.getItem("reportId")
		};
		unpublishReport(requiredData);
		const reportId = String(localStorage.getItem("reportId"));
		localStorage.setItem("draftReportId", reportId);
	};

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
							onLoad={done}
						/>
					</div>
				)}
			</div>
		)
	);

	const isOwner = () => perm === "OWNER";

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

	const cloneReportHandler = async () => {
		const resultDetails = {
			reportID: localStorage.getItem("reportId"),
			apiKey: auth.apiKey
		};

		try {
			await axiosPrivate.post("cloneReport", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			navigate("/drafts");
		} catch (err) {
			console.error(err);
		}
	};

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

	return (
		<div>
			{pageLoading ? (
				<div className="flex flex-row justify-center h-screen items-center">
					{loadIcon} &nbsp; Loading Report
				</div>
			) : (
				<div className="mt-16 ">
					{/* <div className="p-4">
						<h1 className="text-3xl font-bold">{title}</h1>
						<br />
						<h2 className="italic font-bold">Created By: {author}</h2>
						<h3 className="italic text-xs">Date Created: {date}</h3>
					</div> */}
					<div className="flex flex-row justify-between">
						<div className="ml-2 p-4">
							<h1 className="text-3xl font-bold">{title}</h1>
							<br />
							<h2 className="italic font-bold">Created By: {author}</h2>
							<h3 className="italic text-xs">Date Created: {date}</h3>
						</div>

						<div className="flex flex-row items-end p-4 justify-between items-center">
							{/* <div className="" data-bs-toggle="tooltip" title="Clone Report">
								<button type="submit">
									<GrCopy style={iconStyle3} />
								</button>
							</div> */}
							<div
								className=""
								data-bs-toggle="tooltip"
								title="Clone Report"
								onClick={cloneReportHandler}
							>
								<button type="submit">
									<GrCopy style={iconStyle3} />
								</button>
							</div>
						</div>
					</div>

					<br />

					{pulse && pulseOutput}

					<div className="grid grid-cols gap-4 content-center">{apiResponse}</div>

					{isOwner() && (
						<div className="flex justify-center mb-4">
							<Link to="/genReport">
								<Button
									text="Unpublish Report"
									size="large"
									handle={unpublishHandler}
									type="unpublish"
								/>
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default GetPublishedReport;
