import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function GenReport() {
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
		reportID: localStorage.getItem("draftReportId")
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

	const publishReport = async (resultInfo: any) => {
		try {
			await axiosPrivate.post("publishReport", JSON.stringify(resultInfo), {
				signal: controller.signal
			});
			navigate("/getPublishedReport");
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
		const draftId = String(localStorage.getItem("draftReportId"));
		localStorage.setItem("reportId", draftId);
	};

	const apiResponse = [<div key="begining div" />];

	const reorderUpHandler = async (tweetPos: any) => {
		const resultDetails = {
			reportID: localStorage.getItem("draftReportId"),
			apiKey: auth.apiKey,
			pos: tweetPos,
			newPlace: "UP"
		};

		// console.log(resultDetails);

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
			reportID: localStorage.getItem("draftReportId"),
			apiKey: auth.apiKey,
			pos: tweetPos,
			newPlace: "DOWN"
		};

		// console.log(resultDetails);

		try {
			await axiosPrivate.post("reorderTweets", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			changeShouldRender(true);
		} catch (err) {
			console.error(err);
		}
	};

	// console.log(state);

	state.map((data: any, index: number) =>
		apiResponse.push(
			<div className="" key={data.position}>
				{data.blockType === "RICHTEXT" && (
					<div className="">
						{" "}
						<Text
							keyValue={index}
							data={data}
							onChange={(value: boolean) => changeShouldRender(value)}
						/>{" "}
					</div>
				)}

				{data.blockType === "TWEET" && data.position === 1 && (
					<div className=" w-full border border-gray-200 p-3" key={data.position}>
						<Tweet
							options={{ align: "center", width: "" }}
							tweetId={data.block.tweetID}
						/>
						<div className="" data-bs-toggle="tooltip" title="Move Tweet Down">
							<button type="submit">
								<BsArrowDown
									style={style}
									onClick={() => reorderDownHandler(data.position)}
								/>
							</button>
						</div>
					</div>
				)}
				{/* {data.blockType === "TWEET" && data.position > 1 && data.position < state.length-3 && (
					<div className=" w-full border border-gray-200 p-3" key={data.position}>
						<Tweet
							options={{ align: "center", width: "" }}
							tweetId={data.block.tweetID}
						/>
						<div className="" data-bs-toggle="tooltip" title="Move Tweet Up">
							<button type="submit">
								<BsArrowUp style={style} onClick={() => reorderUpHandler(data.position)} />
							</button>
						</div>
						<div className="" data-bs-toggle="tooltip" title="Move Tweet Down">
							<button type="submit">
								<BsArrowDown style={style} onClick={() => reorderDownHandler(data.position)} />
							</button>
						</div>
					</div>
				)} */}

				{data.blockType === "TWEET" && (data.position === state.length-2 || data.position === state.length-3) && (
					<div className=" w-full border border-gray-200 p-3" key={data.position}>
						<Tweet
							options={{ align: "center", width: "" }}
							tweetId={data.block.tweetID}
						/>
						<div className="" data-bs-toggle="tooltip" title="Move Tweet Up">
							<button type="submit">
								<BsArrowUp style={style} onClick={() => reorderUpHandler(data.position)} />
							</button>
						</div>
					</div>
				)}
										<option value="EDITOR">Edit</option>
									</select>

								{/* this is for the search button */}
								<div className="flex flex-row w-1/3 justify-center pt-3">
									<button
										data-testid="btn-search"
										type="submit"
										onClick={shareSearchHandler}
									>
										Share
									</button>
									{/* {loading && ( */}
									{/* <button
												className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-full items-center"
												disabled
										> */}
									{/* <svg
					className="animate-spin h-5 w-5 mr-3 bg-white"
					viewBox="0 0 24 24"
									{/* <!-- ... --> */}
									{/* </svg> */}
									{/* {loadIcon} */}
									{/* </button> */}
									{/* )} */}
									{/* {!loading && ( */}
									{/* <Button text="Search" size="large" handle={shareSearchHandler} type="search" /> */}
									{/* )} */}
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

					<div className="grid grid-cols gap-4 content-center">{apiResponse}</div>

					<div className="flex justify-center mb-4">
						<Link to="/getPublishedReport">
							{/* <button
						onClick={publishHandler}
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button text-center"
					>
						{" "}
						PUBLISH REPORT
					</button> */}
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

export default GenReport;
