import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Modal({ setModalOn, setChoice, func }: any) {
		const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();
	// const handleOKClick = () => {
	// 	setChoice(true);
	// 	setModalOn(false);
	// 	console.log("setModal false");
	// };

	const handleCancelClick = () => {
		setChoice(false);
		setModalOn(false);
	};

	const style = { fontSize: "1.3rem" };

	const [enteredSearch, changeEnteredSearch] = useState("");
	const [loading, changeLoading] = useState(false);
	const [invalidURL, setInvalidURL] = useState(false);

	const bStyle = { fontSize: "1.5rem", color: "red" };

	// const axiosPrivate = useAxiosPrivate();
	// const controller = new AbortController();
	// const [clicked, changeClicked] = useState(false);

	const searchHandler = (event: any) => {
		changeEnteredSearch(event.target.value);
		setInvalidURL(false);
	};

	const loadingHandler = () => {
		changeLoading(!loading);
	};

	// const rerender = () => {

	// }

	const addTweet = async (tweetData: any) => {
		try {
			const tweet = await axiosPrivate.post("addCustomTweet", JSON.stringify(tweetData), {
				signal: controller.signal
			});

			// console.log(tweet.data);

				// console.log( props.func);

				changeLoading(false);

			if (tweet.data === "Invalid Tweet url.") {
				// TWEET NOT FOUND - return error message
				console.log("Invalid tweet url. Please try again");
				setInvalidURL(true);
				// changeNAN(true);
			} else {
				// TWEET FOUND - do something with it
				setModalOn(false);
				func(true);

				// console.log(tweet.data);
				// changeNAN(false);
				// setSuccessfulShare(true);
				// setShare(false);
			}
		} catch (err) {
			console.error(err);
		}
		// searchData;
		// try {
		// 	const response = await axiosPrivate.post("searchTweets", JSON.stringify(searchData), {
		// 		signal: controller.signal
		// 	});

		// 	// do something with the response
		// 	response.data;
		// 	// changeResultSet(await response.data.resultSetID);
		// 	// changeResponse(await response.data.tweets);
		// 	// changeLoading(false);
		// 	// changePulse(true);
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	const search = () => {
		const tweetData = {
				apiKey: auth.apiKey,
				reportID: localStorage.getItem("draftReportId"),
				url: enteredSearch
			// 	keyword: enteredSearch,
			// 	numOfTweets: noOfTweets,
			// 	sortBy: sort === "-" ? "-" : sort,
			// 	filterBy: filter === "-" ? "-" : filter
		};

		if (enteredSearch !== "") {
			loadingHandler();
			// changeClicked(false);
			addTweet(tweetData);
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

	return (
		<div className="flex justify-center items-center z-54 px-5">
			<div className="bg-zinc-200 opacity-90 fixed inset-0" />
			<div className="flex justify-center items-center inset-0 fixed">
				<div className="bg-white border-4 opacity-100 border-sky-500 rounded-xl ">
					<div className="relative">
						<div className="absolute top-0 right-0 p-3 cursor-pointer text-red-600">
							<AiOutlineClose style={style} onClick={handleCancelClick} />
						</div>
					</div>
					<div className="flex-col justify-center   p-12 ">
						{invalidURL && (
							<div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-60 m-4 mb-5 p-2">
								<BiErrorCircle style={bStyle} />
								<p className="pl-2 items-center justify-center">Invalid URL</p>
							</div>
						)}
						<div className="flex flex-col justify-center items-center  text-lg  text-zinc-600   mb-5">
							<input
								type="search"
								id="default-search"
								className="p-3 my-5 mx-5 pl-10 text-sm text-gray-900 bg-gray-50 rounded-full border-gray-200 border focus:outline-none focus:ring focus:border-blue-500"
								value={enteredSearch}
								onChange={searchHandler}
								placeholder="Enter the tweet URL..."
								required
							/>

							{loading && (
								<button
									type="button"
									className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
									disabled
								>
									{/* <svg
									className="animate-spin h-5 w-5 mr-3 bg-white"
									viewBox="0 0 24 24"
								> */}
									{/* <!-- ... --> */}
									{/* </svg> */}
									{loadIcon}
								</button>
							)}
							{!loading && (
								<Button text="Search" size="large" handle={search} type="search" />
							)}
						</div>
						{/* <div className="flex">
							<button
								type="submit"
								onClick={handleOKClick}
								className=" rounded px-4 py-2 text-white  bg-green-400 "
							>
								Yes
							</button>
							<button
								type="submit"
								onClick={handleCancelClick}
								className="rounded px-4 py-2 ml-4 text-white bg-blue-500 "
							>
								No
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
