/* eslint-disable react/jsx-no-bind */
import { useEffect, useState, Fragment } from "react";
import toast from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { GrCopy } from "react-icons/gr";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { IoOptionsOutline } from "react-icons/io5";
import { BsArrowDown, BsArrowUp, BsShare } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Text from "./Text";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";
import PublishedText from "./PublishedText";
import "./styles/Animation.css";
import Modals from "./Modals";
import TweetComponent from "./TweetComponent";
import TweetResponse from "./TweetResponse";

function SentimentIcon(props: any) {
	const style2 = { fontSize: "1.3rem" };
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div {...props}>
			<AiOutlineEye style={style2} />
		</div>
	);
}

function NonSentimentIcon(props: any) {
	const style2 = { fontSize: "1.3rem" };
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div {...props}>
			<AiOutlineEyeInvisible style={style2} />
		</div>
	);
}

function ShareIcon(props: any) {
	const style = { fontSize: "1.1rem" };
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div {...props}>
			<BsShare style={style} />
		</div>
	);
}

function CloneIcon(props: any) {
	const iconStyle3 = { fontSize: "1.1rem", color: "red" };
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div {...props}>
			<GrCopy style={iconStyle3} />
		</div>
	);
}

function DeleteIcon(props: any) {
	const iconStyle4 = { fontSize: "1.3rem", color: "red" };
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div {...props}>
			<MdDeleteOutline style={iconStyle4} />
		</div>
	);
}

function ArrowDownIcon(props: any) {
	const style = { fontSize: "1.1rem" };

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div {...props}>
			<BsArrowDown style={style} />
		</div>
	);
}

function ArrowUpIcon(props: any) {
	const style = { fontSize: "1.1rem" };

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div {...props}>
			<BsArrowUp style={style} />
		</div>
	);
}

function Report() {
	const style = { fontSize: "1.3rem" };
	// const iconStyle3 = { fontSize: "1.5rem", color: "red" };
	const styleCorrect = { fontSize: "1.5rem", color: "green" };
	const styleWrong = { fontSize: "1.5rem", color: "red" };
	const [share, setShare] = useState(false);
	const [shouldRender, changeShouldRender] = useState(false);
	const navigate = useNavigate();
	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");
	const [stat, setStat] = useState("");
	const [perm, setPerm] = useState("");
	const [length, setLength] = useState(0);
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

	const location = useLocation();
	const ind = location.pathname.lastIndexOf("/");
	const repID = location.pathname.substring(ind + 1);
	const [checkedSentiment, setCheckedSentiment] = useState(false);
	const [editTitle, setEditTitle] = useState(false);
	const [titleValue, setTitleValue] = useState("");

	const editTitleHandler = async (editType: boolean) => {
		if (editTitle) {
			if (editType) {
				setTitle(titleValue);

				const editTitleDetails = {
					reportID: repID,
					apiKey: auth.apiKey,
					title: titleValue
				};

				try {
					await axiosPrivate.post("editTitle", JSON.stringify(editTitleDetails), {
						signal: controller.signal
					});
				} catch (err) {
					console.error(err);
				}
			}
			setEditTitle(false);
		} else {
			setEditTitle(true);
		}
	};

	const editTitleInputHandler = (event: any) => {
		setTitleValue(event.target.value);
	};

	const checkedHandler = () => {
		if (checkedSentiment) {
			setCheckedSentiment(false);
		} else {
			setCheckedSentiment(true);
		}
	};

	const shareHandler = () => {
		setShare(!share);
	};

	const requiredData = {
		apiKey: auth.apiKey,
		reportID: repID
	};

	const getRep = async (isMounted: boolean) => {
		try {
			const response = await axiosPrivate.post("getReport", JSON.stringify(requiredData), {
				signal: controller.signal
			});

			isMounted && setPerm(response.data.report.permission);
			isMounted && setStat(response.data.report.status);
			isMounted && setState(response.data.report.Report);
			isMounted && setTitle(response.data.report.title);
			isMounted && setTitleValue(response.data.report.title);
			isMounted && setAuthor(response.data.report.author);
			isMounted && setDate(response.data.report.dateCreated.substring(0, 16));
			isMounted && setLength(response.data.report.numOfBlocks);
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
			changeShouldRender(true);
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

	const unpublishReport = async (resultInfo: any) => {
		try {
			await axiosPrivate.post("unpublishReport", JSON.stringify(resultInfo), {
				signal: controller.signal
			});
			changeShouldRender(true);
		} catch (error) {
			console.error(error);
		}
	};

	const unpublishHandler = () => {
		unpublishReport(requiredData);
	};

	const apiResponse = [<div key="begining div" />];

	const apiResponseWithSentimentAnalysis = [<div key="begining div" />];

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

	function toggleUp(val: any) {
		toast.promise(reorderUpHandler(val), {
			loading: "Moving twwet up!.....",
			success: <b>Tweet Moved!</b>,
			error: <b>Could not move tweet.</b>
		});
	}

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

	function toggleDown(val: any) {
		toast.promise(reorderDownHandler(val), {
			loading: "Moving tweet down!.....",
			success: <b>Tweet Moved!</b>,
			error: <b>Could not move tweet.</b>
		});
	}

	// UNCOMMENT THIS FOR DELETE TWEET FUNCTIONALITY
	const deleteTweetHandler = async (blockID: any) => {
		const deleteDetails = {
			apiKey: auth.apiKey,
			reportID: repID,
			reportBlockID: blockID
		};

		try {
			await axiosPrivate.post("deleteReportBlock", JSON.stringify(deleteDetails), {
				signal: controller.signal
			});
			changeShouldRender(true);
		} catch (err) {
			console.error(err);
		}
	};

	function toggleDeleteTweet(val: any) {
		toast.promise(deleteTweetHandler(val), {
			loading: "Deleting tweet!.....",
			success: <b>Tweet Deleted!</b>,
			error: <b>Could not delete tweet.</b>
		});
	}

	const isPublished = () => stat === "PUBLISHED";
	const isViewer = () => perm === "VIEWER";
	const isOwner = () => perm === "OWNER";

	if (isPublished() || isViewer()) {
		state.map((data: any, index: number) =>
			apiResponse.push(
				<div className="" key={data.position}>
					{data.blockType === "RICHTEXT" && (
						<div className="">
							<PublishedText keyValue={index} data={data} status={stat} />
						</div>
					)}

					{data.blockType === "TWEET" && (
						<div className=" w-full border border-gray-200 p-3" key={data.position}>
							<TweetComponent id={data.block.tweetID} done={done} />
						</div>
					)}
				</div>
			)
		);
	} else {
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
						<TweetResponse
							position={data.position}
							type="without"
							type2="first"
							tweetId={data.block.tweetID}
							DeleteIcon={DeleteIcon}
							done={done}
							data={data}
							toggleDown={toggleDown}
							ArrowDownIcon={ArrowDownIcon}
							toggleDeleteTweet={toggleDeleteTweet}
						/>
					)}

					{/* LAST TWEET */}
					{data.blockType === "TWEET" && data.position === length - 2 && (
						<TweetResponse
							position={data.position}
							type="without"
							type2="last"
							tweetId={data.block.tweetID}
							DeleteIcon={DeleteIcon}
							done={done}
							data={data}
							toggleUp={toggleUp}
							ArrowUpIcon={ArrowUpIcon}
							toggleDeleteTweet={toggleDeleteTweet}
						/>
					)}

					{/* TWEETS IN-BETWEEN */}
					{data.blockType === "TWEET" &&
						!(data.position === 1 || data.position === length - 2) && (
							<TweetResponse
								position={data.position}
								type="without"
								type2="middle"
								tweetId={data.block.tweetID}
								DeleteIcon={DeleteIcon}
								done={done}
								data={data}
								toggleUp={toggleUp}
								ArrowUpIcon={ArrowUpIcon}
								toggleDown={toggleDown}
								ArrowDownIcon={ArrowDownIcon}
								toggleDeleteTweet={toggleDeleteTweet}
							/>
						)}
				</div>
			)
		);

		state.map((data: any, index: number) =>
			apiResponseWithSentimentAnalysis.push(
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
							{data.block.sentiment.sentimentWord === "NEGATIVE" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="first"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleDown={toggleDown}
									ArrowDownIcon={ArrowDownIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="red"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Negative * 100
									)}
									sentimentText="Negative"
								/>
							)}
							{data.block.sentiment.sentimentWord === "POSITIVE" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="first"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleDown={toggleDown}
									ArrowDownIcon={ArrowDownIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="green"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Positive * 100
									)}
									sentimentText="Positive"
								/>
							)}
							{data.block.sentiment.sentimentWord === "MIXED" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="first"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleDown={toggleDown}
									ArrowDownIcon={ArrowDownIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="gray"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Mixed * 100
									)}
									sentimentText="Mixed"
								/>
							)}
							{data.block.sentiment.sentimentWord === "NEUTRAL" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="first"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleDown={toggleDown}
									ArrowDownIcon={ArrowDownIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="blue"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Neutral * 100
									)}
									sentimentText="Neutral"
								/>
							)}
						</>
					)}

					{/* LAST TWEET */}
					{data.blockType === "TWEET" && data.position === length - 2 && (
						<>
							{data.block.sentiment.sentimentWord === "NEGATIVE" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="last"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleUp={toggleUp}
									ArrowUpIcon={ArrowUpIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="red"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Negative * 100
									)}
									sentimentText="Negative"
								/>
							)}
							{data.block.sentiment.sentimentWord === "POSITIVE" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="last"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleUp={toggleUp}
									ArrowUpIcon={ArrowUpIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="green"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Positive * 100
									)}
									sentimentText="Positive"
								/>
							)}
							{data.block.sentiment.sentimentWord === "MIXED" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="last"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleUp={toggleUp}
									ArrowUpIcon={ArrowUpIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="gray"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Mixed * 100
									)}
									sentimentText="Mixed"
								/>
							)}
							{data.block.sentiment.sentimentWord === "NEUTRAL" && (
								<TweetResponse
									position={data.position}
									type="with"
									type2="last"
									tweetId={data.block.tweetID}
									DeleteIcon={DeleteIcon}
									done={done}
									data={data}
									toggleUp={toggleUp}
									ArrowUpIcon={ArrowUpIcon}
									toggleDeleteTweet={toggleDeleteTweet}
									color="blue"
									sentimentValue={Math.floor(
										data.block.sentiment.sentiment.Neutral * 100
									)}
									sentimentText="Neutral"
								/>
							)}
						</>
					)}

					{/* TWEETS IN-BETWEEN */}
					{data.blockType === "TWEET" &&
						!(data.position === 1 || data.position === length - 2) && (
							<>
								{data.block.sentiment.sentimentWord === "NEGATIVE" && (
									<TweetResponse
										position={data.position}
										type="with"
										type2="middle"
										tweetId={data.block.tweetID}
										DeleteIcon={DeleteIcon}
										done={done}
										data={data}
										toggleUp={toggleUp}
										ArrowUpIcon={ArrowUpIcon}
										toggleDown={toggleDown}
										ArrowDownIcon={ArrowDownIcon}
										toggleDeleteTweet={toggleDeleteTweet}
										color="red"
										sentimentValue={Math.floor(
											data.block.sentiment.sentiment.Negative * 100
										)}
										sentimentText="Negative"
									/>
								)}
								{data.block.sentiment.sentimentWord === "POSITIVE" && (
									<TweetResponse
										position={data.position}
										type="with"
										type2="middle"
										tweetId={data.block.tweetID}
										DeleteIcon={DeleteIcon}
										done={done}
										data={data}
										toggleUp={toggleUp}
										ArrowUpIcon={ArrowUpIcon}
										toggleDown={toggleDown}
										ArrowDownIcon={ArrowDownIcon}
										toggleDeleteTweet={toggleDeleteTweet}
										color="green"
										sentimentValue={Math.floor(
											data.block.sentiment.sentiment.Positive * 100
										)}
										sentimentText="Positive"
									/>
								)}
								{data.block.sentiment.sentimentWord === "MIXED" && (
									<TweetResponse
										position={data.position}
										type="with"
										type2="middle"
										tweetId={data.block.tweetID}
										DeleteIcon={DeleteIcon}
										done={done}
										data={data}
										toggleUp={toggleUp}
										ArrowUpIcon={ArrowUpIcon}
										toggleDown={toggleDown}
										ArrowDownIcon={ArrowDownIcon}
										toggleDeleteTweet={toggleDeleteTweet}
										color="gray"
										sentimentValue={Math.floor(
											data.block.sentiment.sentiment.Mixed * 100
										)}
										sentimentText="Mixed"
									/>
								)}
								{data.block.sentiment.sentimentWord === "NEUTRAL" && (
									<TweetResponse
										position={data.position}
										type="with"
										type2="middle"
										tweetId={data.block.tweetID}
										DeleteIcon={DeleteIcon}
										done={done}
										data={data}
										toggleUp={toggleUp}
										ArrowUpIcon={ArrowUpIcon}
										toggleDown={toggleDown}
										ArrowDownIcon={ArrowDownIcon}
										toggleDeleteTweet={toggleDeleteTweet}
										color="blue"
										sentimentValue={Math.floor(
											data.block.sentiment.sentiment.Neutral * 100
										)}
										sentimentText="Neutral"
									/>
								)}
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

	const cloneReportHandler = async () => {
		const resultDetails = {
			reportID: repID,
			apiKey: auth.apiKey,
			author: auth.username
		};

		try {
			await axiosPrivate.post("cloneReport", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			navigate("/allReports");
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

	const deleteReportHandler = async () => {
		const resultDetails = {
			reportID: repID,
			apiKey: auth.apiKey
		};

		try {
			await axiosPrivate.post("deleteReport", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			navigate("/allReports");
		} catch (err) {
			console.error(err);
		}
	};

	const [modalOn, setModalOn] = useState(false);
	const [choice, setChoice] = useState(false);

	const clicked = () => {
		setModalOn(true);
	};

	if (choice) {
		// console.log(choice);
	}

	return (
		<div>
			{isPublished() && (
				<div>
					{pageLoading ? (
						<div className="flex flex-row justify-center h-screen items-center">
							{loadIcon} &nbsp; Loading Report
						</div>
					) : (
						<div className="mt-16 ">
							<div className="flex flex-row justify-between">
								<div className="ml-2 p-4">
									<h1 className="text-3xl font-bold">{title}</h1>
									<br />
									<h2 className="italic font-bold">Created By: {author}</h2>
									<h3 className="italic text-xs">Date Created: {date}</h3>
								</div>

								{/* <div className="flex flex-row items-end p-4 justify-between">
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
								</div> */}
							</div>

							<br />

							{pulse && pulseOutput}

							<div className="grid grid-cols gap-4 content-center">{apiResponse}</div>

							{isOwner() && (
								<div className="flex justify-center mb-20">
									{/* <Link to={newDraftReportLink}> */}
									<Button
										text="Unpublish Report"
										size="large"
										handle={unpublishHandler}
										type="unpublish"
									/>
									{/* </Link> */}
								</div>
							)}
						</div>
					)}
				</div>
			)}

			{!isPublished() && (
				<div>
					{pageLoading ? (
						<div className="flex flex-row justify-center h-screen items-center">
							{loadIcon} &nbsp; Loading Report
						</div>
					) : (
						<div className="mt-16 ">
							{!isOwner() && (
								<div>
									<h1 className="text-m hidden lg:flex lg:flex-row lg:justify-center align-middle items-center italic opacity-50">
										{perm} MODE
									</h1>
								</div>
							)}
							<div className="flex flex-col">
								<div className="flex flex-row justify-between">
									<div className="ml-2 p-4">
										{!editTitle && (
											<div className="flex flex-row items-end justify-between">
												<h1 className="text-3xl font-bold">{title}</h1>
												<div className="">&nbsp;&nbsp;</div>
												<div
													className=""
													data-bs-toggle="tooltip"
													title="Edit Title"
												>
													{!isViewer() && (
														<button type="submit">
															<AiFillEdit
																style={style}
																onClick={() =>
																	editTitleHandler(true)
																}
															/>
														</button>
													)}
												</div>
											</div>
										)}
										{editTitle && (
											<div className="flex flex-row items-center justify-between">
												<Form>
													<Form.Group>
														<Form.Control
															type="search"
															value={titleValue}
															onChange={editTitleInputHandler}
															placeholder="Enter new title"
														/>
													</Form.Group>
												</Form>
												<div className="">&nbsp;&nbsp;</div>
												<div
													className=""
													data-bs-toggle="tooltip"
													title="Update Title"
												>
													<button type="submit">
														<GiConfirmed
															style={styleCorrect}
															onClick={() => editTitleHandler(true)}
														/>
													</button>
												</div>

												<div className="">&nbsp;&nbsp;</div>
												<div
													className=""
													data-bs-toggle="tooltip"
													title="Cancel"
												>
													<button type="submit">
														<GiCancel
															style={styleWrong}
															onClick={() => editTitleHandler(false)}
														/>
													</button>
												</div>
											</div>
										)}
										<h2 className="italic text-xs mt-2">
											Created By: {author}
										</h2>
										<h2 className="italic text-xs">Date Created: {date}</h2>
									</div>

									<div className="flex flex-row items-end p-4 justify-between">
										<Menu as="div" className="relative inline-block text-left">
											<div>
												<Menu.Button className="inline-flex w-full justify-center rounded-full  bg-dark-cornflower-blue px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
													<IoOptionsOutline style={style} />
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<div className="px-1 py-1 ">
														{!isPublished() &&
															!isViewer() &&
															!checkedSentiment && (
																<Menu.Item>
																	{({ active }) => (
																		<button
																			type="button"
																			className={`${
																				active
																					? "bg-slate-200 text-gray-900"
																					: "text-gray-900"
																			} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																			onClick={checkedHandler}
																		>
																			{
																				// eslint-disable-next-line no-use-before-define
																				<SentimentIcon
																					className="mr-2 h-5 w-5"
																					aria-hidden="true"
																				/>
																			}
																			Sentiment
																		</button>
																	)}
																</Menu.Item>
															)}
														{!isPublished() &&
															!isViewer() &&
															checkedSentiment && (
																<Menu.Item>
																	{({ active }) => (
																		<button
																			type="button"
																			className={`${
																				active
																					? "bg-slate-200 text-gray-900"
																					: "text-gray-900"
																			} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																			onClick={checkedHandler}
																		>
																			{
																				// eslint-disable-next-line no-use-before-define
																				<NonSentimentIcon
																					className="mr-2 h-5 w-5"
																					aria-hidden="true"
																				/>
																			}
																			Sentiment
																		</button>
																	)}
																</Menu.Item>
															)}
														{isOwner() && (
															<Menu.Item>
																{({ active }) => (
																	<button
																		type="button"
																		className={`${
																			active
																				? "bg-slate-200 text-gray-900"
																				: "text-gray-900"
																		} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																		onClick={shareHandler}
																	>
																		{
																			// eslint-disable-next-line no-use-before-define
																			<ShareIcon
																				className="mr-2 h-5 w-5"
																				aria-hidden="true"
																			/>
																		}
																		Share
																	</button>
																)}
															</Menu.Item>
														)}
														<Menu.Item>
															{({ active }) => (
																<button
																	type="button"
																	className={`${
																		active
																			? "bg-slate-200 text-gray-900"
																			: "text-gray-900"
																	} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																	onClick={cloneReportHandler}
																>
																	{
																		// eslint-disable-next-line no-use-before-define
																		<CloneIcon
																			className="mr-2 h-5 w-5"
																			aria-hidden="true"
																		/>
																	}
																	Clone
																</button>
															)}
														</Menu.Item>
													</div>
													{isOwner() && (
														<div className="px-1 py-1">
															<Menu.Item>
																{({ active }) => (
																	<button
																		type="button"
																		className={`${
																			active
																				? "bg-slate-200 text-gray-900"
																				: "text-gray-900"
																		} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																		onClick={
																			deleteReportHandler
																		}
																	>
																		{
																			// eslint-disable-next-line no-use-before-define
																			<DeleteIcon
																				className="mr-2 h-5 w-5 text-violet-400"
																				aria-hidden="true"
																			/>
																		}
																		Delete
																	</button>
																)}
															</Menu.Item>
														</div>
													)}
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
								{!isPublished() && !isViewer() && (
									<div className="ml-2 w-auto" onClick={clicked}>
										<p className="text-blue-500 cursor-pointer pl-6">
											Add Custom Tweets
										</p>
									</div>
								)}
								{modalOn && (
									<Modals
										setModalOn={setModalOn}
										setChoice={setChoice}
										func={changeShouldRender}
										rID={repID}
										show
										modalChoice="addTweet"
									/>
								)}
							</div>

							{share && <Modals show modalChoice="shareReport" setShare={setShare} />}

							{pulse && pulseOutput}

							<div className="grid grid-cols gap-4 content-center">
								{!checkedSentiment && apiResponse}{" "}
								{checkedSentiment && apiResponseWithSentimentAnalysis}
							</div>

							{isOwner() && (
								<div className="flex justify-center mb-20">
									<Button
										text="Publish Report"
										size="large"
										handle={publishHandler}
										type="publish"
									/>
								</div>
							)}
						</div>
					)}
					<br /> <br /> <br />
				</div>
			)}
		</div>
	);
}

export default Report;
