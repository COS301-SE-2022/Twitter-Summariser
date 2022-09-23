import { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { Checkbox } from "@mui/material";
import DateTimePicker from "react-datetime-picker";
import Form from "react-bootstrap/Form";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Modals({
	setAdvanceOn,
	setChoice,
	changeNoOfTweets,
	changeSort,
	changeFilter,
	changeRepeat,
	toggleSearch,
	setChecked,
	// enteredSearch,
	dateTime,
	changeDateTime,
	modalChoice,
	show,
	setModalOn,
	func,
	rID
}: any) {
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();

	const handleCancelClick = () => {
		setChoice(false);
		setAdvanceOn(false);
	};

	const handleCancelClickAddTweet = () => {
		setChoice(false);
		setModalOn(false);
	};

	const style = { fontSize: "1.3rem" };

	const [enteredSearch, changeEnteredSearch] = useState("");
	const [loading, changeLoading] = useState(false);
	const [invalidURL, setInvalidURL] = useState(false);

	const bStyle = { fontSize: "1.5rem", color: "red" };

	const searchHandler = (event: any) => {
		changeEnteredSearch(event.target.value);
		setInvalidURL(false);
	};

	const loadingHandler = () => {
		changeLoading(!loading);
	};

	const tweetHandler = (event: any) => {
		changeNoOfTweets(event.target.value);
	};

	const sortHandler = (event: any) => {
		changeSort(event.target.value);
	};

	const filterHandler = (event: any) => {
		changeFilter(event.target.value);
	};

	const repeatHandler = (event: any) => {
		changeRepeat(event.target.value);
	};

	const tweetOptions = [];

	for (let index = 5; index <= 100; index += 5) {
		tweetOptions.push(
			<option key={index.toString()} value={index.toString()}>
				{index}
			</option>
		);
	}

	const [checkedValue, setCheckedValue] = useState(false);

	const checkedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		setCheckedValue(event.target.checked);
	};

	function advanceSearch() {
		changeDateTime();
		toggleSearch();
		setAdvanceOn(false);
		setChoice(false);
	}

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
				// console.log("Invalid tweet url. Please try again");
				setInvalidURL(true);
				// changeNAN(true);
			} else {
				// TWEET FOUND - do something with it
				// console.log("Tweet found");
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
			// reportID: localStorage.getItem("draftReportId"),
			reportID: rID,
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
		<div>
			{modalChoice === "advancedSearch" && (
				<Transition appear show={show} as={Fragment}>
					<Dialog as="div" className="relative z-10" onClose={() => setAdvanceOn(false)}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white pt-10 pl-6 pr-6 pb-0 text-left align-middle shadow-xl transition-all">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											<div className="absolute top-0 left-0 p-6 font-bold">
												Advanced Search
											</div>
											<div className="absolute top-0 right-0 p-6 cursor-pointer text-red-600">
												<AiOutlineClose
													style={style}
													onClick={handleCancelClick}
												/>
											</div>
										</Dialog.Title>
										<div className="mt-2">
											<div className="flex flex-col justify-center items-center mt-4 py-6 px-5 text-lg  text-zinc-600   mb-5 ">
												{/* certain options and search button comes here */}
												<div className="flex flex-row flex-wrap justify-around items-center p-4 rounded-md bg-slate-200 w-full">
													<div className="mb-0">
														<p className="font-bold">Tweets:</p>
													</div>
													&nbsp;
													<div className="mt-0 w-1/2">
														<Form.Select
															data-testid="select-num-tweets"
															className="bg-slate-200"
															onChange={tweetHandler}
														>
															{tweetOptions}
														</Form.Select>
													</div>
												</div>
												<br />

												{/* this is for the Fitlering options */}
												<div className="flex flex-row flex-wrap justify-around items-center p-4 rounded-md bg-slate-200 w-full">
													<div className="mb-0">
														<p className=" font-bold">Filter:</p>
													</div>
													&nbsp;
													<div className="mt-0 w-1/2">
														<Form.Select
															data-testid="select-filter"
															className="bg-slate-200"
															onChange={filterHandler}
															// value={filter}
														>
															<option>-</option>
															<option value="verifiedTweets">
																Verified Tweets
															</option>
															<option value="noneReply">
																Non-Replies
															</option>
														</Form.Select>
													</div>
												</div>
												<br />

												{/* this is for the sorting options */}
												<div className="flex flex-row flex-wrap justify-around items-center p-4 rounded-md bg-slate-200 w-full">
													<div className="mb-0">
														<p className="font-bold">Sort By:</p>
													</div>
													<div className="mt-0 w-1/2">
														<Form.Select
															data-testid="select-sort"
															className="bg-slate-200"
															onChange={sortHandler}
														>
															<option>-</option>
															<option value="byLikes">Likes</option>
															<option value="byComments">
																Comments
															</option>
															<option value="byRetweets">
																Re-tweets
															</option>
														</Form.Select>
													</div>
												</div>

												<br />

												{/* this is for the schedule report */}
												<div className="flex flex-col justify-center items-center p-1">
													<div className="mb-0">
														<p className="">Schedule Report</p>
													</div>
													<div className="border-t flex flex-row items-center">
														<p className="">Repeat Schedule: </p>
														<Checkbox
															checked={checkedValue}
															onChange={checkedHandler}
															inputProps={{
																"aria-label": "controlled"
															}}
														/>
													</div>
													{checkedValue && (
														<div className="flex flex-col justify-center items-center p-1 mb-2">
															<div className="flex flex-row justify-center items-center p-4 rounded-md bg-slate-200">
																<DateTimePicker
																	onChange={changeDateTime}
																	value={dateTime}
																/>
															</div>
														</div>
													)}
												</div>

												{/* this is for repeat schedule */}
												{checkedValue && (
													<div className="flex flex-row flex-wrap justify-around items-center p-4 rounded-md bg-slate-200 w-full">
														<div className="mb-0">
															<p className="font-bold">Repeat:</p>
														</div>
														<div className="mt-0 w-1/2">
															<Form.Select
																data-testid="select-sort"
																className="bg-slate-200"
																onChange={repeatHandler}
															>
																<option>-</option>
																<option value="daily">Daily</option>
																<option value="weekly">
																	Weekly
																</option>
																<option value="monthly">
																	Monthly
																</option>
																<option value="annually">
																	Annually
																</option>
															</Form.Select>
														</div>
													</div>
												)}

												<br />

												<button
													type="button"
													className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
													onClick={advanceSearch}
												>
													Search
												</button>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			)}

			{modalChoice === "addTweet" && (
				<Transition appear show={show} as={Fragment}>
					<Dialog as="div" className="relative z-10" onClose={() => setModalOn(false)}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white pt-10 pl-6 pr-6 pb-0 text-left align-middle shadow-xl transition-all">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											<div className="absolute top-0 left-0 p-6 font-bold">
												Add Tweet <br />
												<p className="text-blue-500 cursor-pointer text-sm mt-1">
													<a
														href="https://www.twitter.com/home"
														target="_blank"
														rel="noreferrer"
													>
														Head to twitter.com
													</a>
												</p>
											</div>
											<div className="absolute top-0 right-0 p-6 cursor-pointer text-red-600">
												<AiOutlineClose
													style={style}
													onClick={handleCancelClickAddTweet}
												/>
											</div>
										</Dialog.Title>
										<div className="flex-col justify-center   p-12 ">
											{invalidURL && (
												<div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-60 m-4 mb-5 p-2">
													<BiErrorCircle style={bStyle} />
													<p className="pl-2 items-center justify-center">
														Invalid URL
													</p>
												</div>
											)}
											<div className="flex flex-col justify-center items-center  text-lg  text-zinc-600  my-2">
												<Form className="w-full mb-3">
													<Form.Group>
														<Form.Control
															type="search"
															value={enteredSearch}
															onChange={searchHandler}
															placeholder="Enter the tweet URL..."
															className="w-full"
														/>
													</Form.Group>
												</Form>
												{/* <input
													type="search"
													id="default-search"
													className="p-3 my-5 mx-5 pl-10 text-sm text-gray-900 bg-gray-50 rounded-full border-gray-200 border focus:outline-none focus:ring focus:border-blue-500"
													value={enteredSearch}
													onChange={searchHandler}
													placeholder="Enter the tweet URL..."
													required
												/> */}

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
													<Button
														text="Search"
														size="large"
														handle={search}
														type="search"
													/>
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
								onClick={handleCancelClickAddTweet}
								className="rounded px-4 py-2 ml-4 text-white bg-blue-500 "
							>
								No
							</button>
						</div> */}
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			)}
		</div>
	);
}

export default Modals;
