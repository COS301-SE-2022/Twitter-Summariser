import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../resources/links.json";

// importing mock data
import Text from "./Text";

// importing icons
import { BsShare } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GrCopy } from "react-icons/gr";
import Button from "./Button";

// Axios stuffs
//import axios from "../api/ConfigAxios";

function GenReport() {
	const navigate = useNavigate();

	// style for the icons
	const style = { fontSize: "1.3rem" };
	const style__ = { fontSize: "1.5rem", color: "green" };
	const iconStyle3 = { fontSize: "1.5rem", color: "red" };
	const iconStyle4 = { fontSize: "1.8rem", color: "red" };

	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState("");

	// for starting up sharing
	const [share, setShare] = useState(false);
	const [successfulShare, setSuccessfulShare] = useState(false);
	const [enteredShare, changeEnteredShare] = useState("");

	 // handling loading things.........
    // const [loading, changeLoading] = useState(false);

		// const loadingHandler = () => {
    //     changeLoading(!loading);
    // };

		// const [generateLoading, changeGenerateLoading] = useState(false);

    // const generateLoadingHandler = () => {
    //     changeGenerateLoading(!generateLoading);
    // };

		// const loadIcon = (
    //     <svg
    //         role="status"
    //         className="inline mr-1 w-5 h-5 text-gray-200 animate-spin dark:text-slate-600 fill-gray-600 dark:fill-gray-300"
    //         viewBox="0 0 100 101"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //     >
    //         <path
    //             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    //             fill="currentColor"
    //         />
    //         <path
    //             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    //             fill="currentFill"
    //         />
    //     </svg>
    // );

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
			body: JSON.stringify(requiredData),
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
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
			body: JSON.stringify(resultInfo),
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
		};

		fetch(publishEndpoint, requestOptions).then(async (response) => {
			response.headers.get("content-type")?.includes("application/json");

			// isJson && (await response.json());
		});

		navigate("/getPublishedReport");
	};

	// #######################################################################

	// const publishHandler = (event: any) => {
	const publishHandler = () => {
		// event.preventDefault();

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

	// ######################### API FOR SHARING REPORT ###############################################
	const shareReport = async (repData: any) => {
		// POST request using fetch with error handling

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(repData),
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
		};

		fetch(shareEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				// console.log(data);

				// changeLoading(false);

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

		// try {
		// 	const response = await axios.post("shareReport", JSON.stringify(repData), {
		// 		withCredentials: true
		// 	});

		// 	changeNAN(false);
		// 	setSuccessfulShare(true);
		// 	setShare(false);
		// } catch (err) {
		// 	// if ((err as Error).status === 400) {
		// 	// 	changeNAN(true);
		// 	// } else {

		// 	// }
		// 	changeNAN(true);
		// }


	};

	const shareSearchHandler = () => {
		// loadingHandler();
		if (enteredShare !== "") {
			shareReport(requiredDataForShare);
			// console.log(requiredDataForShare);
		}
	};

	const deleteReportHandler = (event: any) => {
        event.preventDefault();

        const resultDetails = {
            reportID: localStorage.getItem("draftReportId"),
            apiKey: localStorage.getItem("key")
        };

        deleteReport(resultDetails);
				navigate("/drafts");

    };

    // ######################### API FOR DELETING REPORT ###############################################

    let deleteReportEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);
    deleteReportEndpoint += "deleteReport";

    const deleteReport = (resultInfo: any) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(resultInfo),
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        };

        fetch(deleteReportEndpoint, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");

                isJson && (await response.json());

                // check for error response
                if (!response.ok) {
                    // error

                    return;
                }
            })
            .catch(() => { });
    };

    // #######################################################################


	return (
		<div className="mt-16 ">
			<div className="flex flex-row justify-between">
				<div className="ml-2 p-4">
					<h1 className="text-3xl font-bold">{title}</h1>
					<br />
					<h2 className="italic font-bold">Created By: {author}</h2>
					<h3 className="italic text-xs">Date Created: {date}</h3>
				</div>

				<div className="flex flex-row items-end p-4 justify-between items-center">
					<div className="" data-bs-toggle="tooltip" title="Share Report">
						<button>
							<BsShare style={style} onClick={shareHandler} />
						</button>
					</div>
					<div className="">&nbsp;&nbsp;</div>
					<div className="" data-bs-toggle="tooltip" title="Clone Report">
						<button>
							<GrCopy style={iconStyle3} />
						</button>
					</div>
					<div className=""></div>
					<div className="" data-bs-toggle="tooltip" title="Delete Report" onClick={deleteReportHandler}>
						<button>
							<MdDeleteOutline style={iconStyle4} />
						</button>
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
							{/* {loading && ( */}
										{/* <button
												type="button"
												className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-full items-center"
												disabled
										> */}
												{/* <svg
					className="animate-spin h-5 w-5 mr-3 bg-white"
					viewBox="0 0 24 24"
				> */}
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
					<AiOutlineCheckCircle style={style__} />
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
	);
}

export default GenReport;
