import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import { BsShare, BsArrowDown, BsArrowUp } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GrCopy } from "react-icons/gr";
import Text from "./Text";
import Button from "./Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import "./styles/Animation.css";
import Modal from "./Modal";

function DraftReport() {
	const style = { fontSize: "1.3rem" };
	const styleNew = { fontSize: "1.5rem", color: "green" };
	const iconStyle3 = { fontSize: "1.5rem", color: "red" };
	const iconStyle4 = { fontSize: "1.8rem", color: "red" };

	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");

	const [share, setShare] = useState(false);
	const [successfulShare, setSuccessfulShare] = useState(false);
	const [enteredShare, changeEnteredShare] = useState("");

	const [NAN, changeNAN] = useState(false);
	const [type, changeType] = useState("VIEWER");
	const [pageLoading, changePageLoading] = useState(true);

	const [shouldRender, changeShouldRender] = useState(false);
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const navigate = useNavigate();
	const { auth } = useAuth();

	const location = useLocation();
	const ind = location.pathname.lastIndexOf("/");

	const repID = location.pathname.substring(ind + 1);
	const newReportLink = `/report/${repID}`;

	const shareHandler = () => {
		setSuccessfulShare(false);
		setShare(!share);
	};

	const enteredShareHandler = (event: any) => {
		changeNAN(false);
		changeEnteredShare(event.target.value);
	};

	const typeHandler = (event: any) => {
		changeType(event.target.value);
	};

	const requiredData = {
		apiKey: auth.apiKey,
		reportID: repID
	};

	const [pulse, changePulse] = useState(false);
	const [pulseCounter, changeCounter] = useState(0);

	const done = () => {
		changePulse(false);
		changeCounter(1);
	};

	const getRep = async (isMounted: boolean) => {
		try {
			const response = await axiosPrivate.post("getReport", JSON.stringify(requiredData), {
				signal: controller.signal
			});
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
	}, []);

	const publishReport = async (resultInfo: any) => {
		try {
			await axiosPrivate.post("publishReport", JSON.stringify(resultInfo), {
				signal: controller.signal
			});

			navigate(newReportLink);
		} catch (error) {
			console.error(error);
		}
	};

	if (shouldRender) {
		const isMounted = true;
		getRep(isMounted);
		changeShouldRender(false);
	}

	const publishHandler = () => {
		publishReport(requiredData);
	};

	const apiResponse = [<div key="begining div" />];

	const reorderUpHandler = async (tweetPos: any) => {
		const resultDetails = {
			reportID: repID,
			apiKey: auth.apiKey,
			pos: tweetPos,
			newPlace: "UP"
		};

		try {
			await axiosPrivate.post("reorderTweets", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			changeShouldRender(true);
		} catch (err) {
			console.error(err);
		}
	};

	const reorderDownHandler = async (tweetPos: any) => {
		const resultDetails = {
			reportID: repID,
			apiKey: auth.apiKey,
			pos: tweetPos,
			newPlace: "DOWN"
		};

		try {
			await axiosPrivate.post("reorderTweets", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			changeShouldRender(true);
		} catch (err) {
			console.error(err);
		}
	};

	state.map((data: any, index: number) =>
		apiResponse.push(
			<div className="" key={data.position}>
				{data.blockType === "RICHTEXT" && (
					<div className="">
						{" "}
						<Text
							keyValue={index}
							data={data}
							rID={repID}
							onChange={(value: boolean) => changeShouldRender(value)}
						/>{" "}
					</div>
				)}

				{/* FIRST TWEET */}
				{data.blockType === "TWEET" && data.position === 1 && (
					<>
						<div
							className=" w-full p-3 flex flex-col justify-center"
							key={data.position}
						>
							<Tweet
								options={{ align: "center", width: "" }}
								tweetId={data.block.tweetID}
								onLoad={done}
							/>
							<div className="flex flex-row justify-around">
								<div
									className="flex flex-row justify-center bg-gradient-to-r from-white to-gray-50 hover:shadow-2xl py-3 w-3/4 mx-5"
									data-bs-toggle="tooltip"
									title="Move Tweet Down"
								>
									<button type="submit">
										<BsArrowDown
											style={style}
											onClick={() => reorderDownHandler(data.position)}
										/>
									</button>
								</div>
							</div>
						</div>
					</>
				)}

				{/* LAST TWEET */}
				{data.blockType === "TWEET" && data.position === state.length - 1 && (
					<>
						<div
							className=" w-full p-3 flex flex-col justify-center"
							key={data.position}
						>
							<div className="flex flex-row justify-around">
								<div
									className="flex flex-row justify-center bg-gradient-to-r from-white to-gray-50 hover:shadow-2xl py-3 w-3/4 mx-5"
									data-bs-toggle="tooltip"
									title="Move Tweet Up"
								>
									<button type="submit">
										<BsArrowUp
											style={style}
											onClick={() => reorderUpHandler(data.position)}
										/>
									</button>
								</div>
							</div>
							<Tweet
								options={{ align: "center", width: "" }}
								tweetId={data.block.tweetID}
							/>
						</div>
					</>
				)}

				{data.blockType === "TWEET" &&
					!(data.position === 1 || data.position === state.length - 1) && (
						<>
							<div
								className="  w-full p-3 flex flex-col justify-center"
								key={data.position}
							>
								<div className="flex flex-row justify-around">
									<div
										className="flex flex-row justify-center bg-gradient-to-r from-white to-gray-50 hover:shadow-2xl py-3 w-3/4 mx-5"
										data-bs-toggle="tooltip"
										title="Move Tweet Up"
									>
										<button type="submit">
											<BsArrowUp
												style={style}
												onClick={() => reorderUpHandler(data.position)}
											/>
										</button>
									</div>
								</div>

								<Tweet
									options={{ align: "center", width: "" }}
									tweetId={data.block.tweetID}
								/>

								<div className="flex flex-row justify-around">
									<div
										className="flex flex-row justify-center bg-gradient-to-r from-white to-gray-50 hover:shadow-2xl py-3 w-3/4 mx-5"
										data-bs-toggle="tooltip"
										title="Move Tweet Down"
									>
										<button type="submit">
											<BsArrowDown
												style={style}
												onClick={() => reorderDownHandler(data.position)}
											/>
										</button>
									</div>
								</div>
							</div>
						</>
					)}
			</div>
		)
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

	const requiredDataForShare = {
		apiKey: auth.apiKey,
		reportID: repID,
		email: enteredShare,
		type
	};

	const shareReport = async (repData: any) => {
		try {
			const data = await axiosPrivate.post("shareReport", JSON.stringify(repData), {
				signal: controller.signal
			});

			if (data.data === "User is not found within system.") {
				changeNAN(true);
			} else {
				changeNAN(false);
				setSuccessfulShare(true);
				setShare(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const shareSearchHandler = () => {
		if (enteredShare !== "") {
			shareReport(requiredDataForShare);
		}
	};

	const deleteReportHandler = async () => {
		const resultDetails = {
			reportID: repID,
			apiKey: auth.apiKey
		};

		try {
			await axiosPrivate.post("deleteReport", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			navigate("/drafts");
		} catch (err) {
			console.error(err);
		}
	};

	const cloneReportHandler = async () => {
		const resultDetails = {
			reportID: repID,
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

	const [modalOn, setModalOn] = useState(false);
	const [choice, setChoice] = useState(false);

	const clicked = () => {
		setModalOn(true);
	};

	if (choice) {
		console.log(choice);
	}

	const isOwner = () => author === auth.username || title.substring(0, 4) === "Copy"; // temporary fix need PERMISSION to indicate whether person is owner or not correctly

	return (
		<div>
			{pageLoading ? (
				<div className="flex flex-row justify-center h-screen items-center">
					{loadIcon} &nbsp; Loading Report
				</div>
			) : (
				<div className="mt-16 ">
					<div className="flex flex-col">
						<div className="flex flex-row justify-between">
							<div className="ml-2 p-4">
								<h1 className="text-3xl font-bold">{title}</h1>
								<br />
								<h2 className="italic font-bold">Created By: {author}</h2>
								<h3 className="italic text-xs">Date Created: {date}</h3>
							</div>

							<div className="flex flex-row items-end p-4 justify-between items-center">
								{isOwner() && (
									<div className="" data-bs-toggle="tooltip" title="Share Report">
										<button type="submit">
											<BsShare style={style} onClick={shareHandler} />
										</button>
									</div>
								)}
								<div className="">&nbsp;&nbsp;</div>
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
								<div className="" />
								{isOwner() && (
									<div
										className=""
										data-bs-toggle="tooltip"
										title="Delete Report"
										onClick={deleteReportHandler}
									>
										<button type="submit">
											<MdDeleteOutline style={iconStyle4} />
										</button>
									</div>
								)}
							</div>
						</div>
						<div className="ml-2 p-4 text-blue-500 cursor-pointer" onClick={clicked}>
							Add Custom Tweets
						</div>
						{modalOn && (
							<Modal
								setModalOn={setModalOn}
								setChoice={setChoice}
								func={changeShouldRender}
								rID={repID}
							/>
						)}
					</div>

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
							<AiOutlineCheckCircle style={styleNew} />
							<p>Report shared successfully</p>
						</div>
					)}

					<br />

					{pulse && pulseOutput}

					<div className="grid grid-cols gap-4 content-center">{apiResponse}</div>

					<div className="flex justify-center mb-20">
						<Link to={newReportLink}>
							<Button
								text="Publish Report"
								size="large"
								handle={publishHandler}
								type="publish"
							/>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default DraftReport;
