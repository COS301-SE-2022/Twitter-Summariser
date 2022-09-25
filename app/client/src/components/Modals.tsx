import { useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
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
	toggleSearch,
	setChecked,
	dateTime,
	changeDateTime,
	modalChoice,
	show,
	setModalOn,
	func,
	rID,
	setShare
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

	const handleCancelClickShare = () => {
		setShare(false);
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

	const tweetOptions = [];

	for (let index = 5; index <= 100; index += 5) {
		tweetOptions.push(
			<option key={index.toString()} value={index.toString()}>
				{index}
			</option>
		);
	}

	const [checkedValue, setCheckedValue] = useState(false);


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

			changeLoading(false);

			if (tweet.data === "Invalid Tweet url.") {
				setInvalidURL(true);
			} else {
				setModalOn(false);
				func(true);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const search = () => {
		const tweetData = {
			apiKey: auth.apiKey,
			reportID: rID,
			url: enteredSearch
		};

		if (enteredSearch !== "") {
			loadingHandler();
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

	const [enteredShare, changeEnteredShare] = useState("");
	const [successfulShare, setSuccessfulShare] = useState(false);
	const [NAN, changeNAN] = useState(false);
	// const [share, setShare] = useState(false);
	const [type, changeType] = useState("VIEWER");

	const location = useLocation();
	const ind = location.pathname.lastIndexOf("/");
	const repID = location.pathname.substring(ind + 1);
	const styleNew = { fontSize: "1.5rem", color: "green" };

	const requiredDataForShare = {
		apiKey: auth.apiKey,
		reportID: repID,
		email: enteredShare,
		type
	};

	const enteredShareHandler = (event: any) => {
		changeNAN(false);
		changeEnteredShare(event.target.value);
	};

	const typeHandler = (event: any) => {
		changeType(event.target.value);
	};

	const [shareLoadIcon, setShareLoadIcon] = useState(false);

	const shareReport = async (repData: any) => {
		try {
			const data = await axiosPrivate.post("shareReport", JSON.stringify(repData), {
				signal: controller.signal
			});

			if (data.data === "User is not found within system.") {
				changeNAN(true);
				setShareLoadIcon(false);
			} else {
				changeNAN(false);
				setSuccessfulShare(true);
				setShareLoadIcon(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const shareSearchHandler = () => {
		if (enteredShare !== "") {
			shareReport(requiredDataForShare);
			setShareLoadIcon(!shareLoadIcon);
		}
	};

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

										<div className="w-full mt-4 text-center ">
											<strong>
												<h6 className="mb- text-center">
													Number of Tweets:{" "}
												</h6>
											</strong>
											<input
												type="range"
												min="10"
												max="50"
												defaultValue={10}
												className="w-full mt-2"
												onChange={tweetHandler}
												step="10"
											/>
											<div className="w-full flex justify-between text-xs px-2 mb-2 ">
												<span>10</span>
												<span>20</span>
												<span>30</span>
												<span>40</span>
												<span>50</span>
											</div>

											<div className="d-md-flex justify-start align-center mb-1 py-2">
												<strong>
													<h6 className="mb-2 text-center">Sort By: </h6>
												</strong>
												<div className="justify-center items-center align-center text-center">
													<div className="form-check form-check-inline mb-0 md:ml-4">
														<input
															className="form-check-input"
															type="radio"
															defaultChecked
															name="sortOptions"
															id="likes"
															value="byLikes"
															onClick={sortHandler}
														/>
														<label
															className="form-check-label"
															htmlFor="likes"
														>
															Likes
														</label>
													</div>

													<div className="form-check form-check-inline mb-0 me-4">
														<input
															className="form-check-input"
															type="radio"
															name="sortOptions"
															id="comments"
															value="byComments"
															onClick={sortHandler}
														/>
														<label
															className="form-check-label"
															htmlFor="comments"
														>
															Comments
														</label>
													</div>

													<div className="form-check form-check-inline mb-0">
														<input
															className="form-check-input"
															type="radio"
															name="sortOptions"
															id="retweets"
															value="byRetweets"
															onClick={sortHandler}
														/>
														<label
															className="form-check-label"
															htmlFor="retweets"
														>
															Retweets
														</label>
													</div>
												</div>
											</div>
											<div className="d-md-flex justify-start  mb-1 py-2">
												<strong>
													<h6 className="mb-2 text-center">
														Filter By:{" "}
													</h6>
												</strong>
												<div className="justify-center items-center align-center text-center">
													<div className="form-check form-check-inline mb-0  md:ml-4">
														<input
															className="form-check-input"
															type="radio"
															defaultChecked
															name="filterOptions"
															id="verifiedTweets"
															value="verifiedTweets"
															onClick={filterHandler}
														/>
														<label
															className="form-check-label"
															htmlFor="verifiedTweets"
														>
															Verified Tweets
														</label>
													</div>

													<div className="form-check form-check-inline mb-0">
														<input
															className="form-check-input"
															type="radio"
															name="filterOptions"
															id="noneReplies"
															value="noneReply"
															onClick={filterHandler}
														/>
														<label
															className="form-check-label"
															htmlFor="nonReplies"
														>
															Non-Replies
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="justify-center items-center text-center mt-3">
											<label
												htmlFor="default-toggle"
												className="inline-flex relative items-center align-center text-center  justify-center cursor-pointer"
											>
												<input
													type="checkbox"
													value="checkedValue"
													onClick={() => {
														setCheckedValue(!checkedValue);
														setChecked(!checkedValue);
														console.log(checkedValue);
													}}
													id="default-toggle"
													className="sr-only peer"
												/>
												<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
												<span className="ml-3 text-md font-medium text-center">
													Schedule Report
												</span>
											</label>
										</div>
										{checkedValue && (
											<div className="mt-2 mb-2 relative justify-center items-center align-center text-center">
												<DateTimePicker
													calendarClassName="pr-16 justify-start items-start align-start text-start"
													calendarIcon={null}
													clearIcon={null}
													disableCalendar
													onChange={changeDateTime}
													value={dateTime}
												/>
											</div>
										)}
										<div className="w-full justify-center items-center align-center text-center">
											<button
												type="button"
												className="items-center py-2.5 mb-3  mt-3 w-4/6 text-sm font-semibold text-center justify-center align-center text-white bg-dark-cornflower-blue rounded-lg  hover:bg-midnight-blue group hover:shadow"
												onClick={advanceSearch}
											>
												{checkedValue ? "Schedule & Search" : "Search"}
											</button>
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
												{loading && (
													<button
														type="button"
														className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-60 items-center"
														disabled
													>
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
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			)}

			{modalChoice === "shareReport" && (
				<Transition appear show={show} as={Fragment}>
					<Dialog as="div" className="relative z-10" onClose={() => setShare(false)}>
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
												Share report
											</div>
											<div className="absolute top-0 right-0 p-6 cursor-pointer text-red-600">
												<AiOutlineClose
													style={style}
													onClick={handleCancelClickShare}
												/>
											</div>
										</Dialog.Title>
										<div className="flex-col justify-center   p-12 ">
											<div className="flex flex-col justify-center items-center  text-lg  text-zinc-600  my-2">
												{NAN && (
													<div className="flex flex-row flex-wrap justify-center items-center p-2 mb-4 w-full border-2 border-red-500 rounded-md bg-red-300">
														<BiErrorCircle style={style} />
														<p>User Does not Exist</p>
													</div>
												)}
												{successfulShare && (
													<div className="flex flex-row flex-wrap justify-center items-center p-2 mb-4 w-full border-2 border-green-700 rounded-md bg-green-300">
														<AiOutlineCheckCircle style={styleNew} />
														<p>Report shared successfully</p>
													</div>
												)}
												<Form className="w-full mb-3">
													<Form.Group>
														<Form.Control
															type="search"
															onChange={enteredShareHandler}
															placeholder="enter user email ..."
															className="w-full h-12"
														/>
													</Form.Group>
												</Form>

												<div className="flex flex-row flex-wrap justify-around items-center p-3 rounded-md bg-slate-100 w-full">
													<div className="mb-0">
														<p className="font-bold">Allow User to:</p>
													</div>
													&nbsp;
													<div className="mt-0 w-1/2">
														<Form.Select
															data-testid="select-num-tweets"
															className="bg-slate-100"
															onChange={typeHandler}
														>
															<option value="VIEWER">View</option>
															<option value="EDITOR">Edit</option>
														</Form.Select>
													</div>
												</div>

												<div className="w-full justify-center items-center align-center text-center">
													{shareLoadIcon ? (
														<button
															type="button"
															className="items-center py-2.5 mb-1 mt-3 w-4/6 text-sm font-semibold text-center justify-center align-center text-white bg-dark-cornflower-blue opacity-50 rounded-lg  group"
															onClick={shareSearchHandler}
														>
															{loadIcon}
														</button>
													) : (
														<button
															type="button"
															className="items-center py-2.5 mb-1 mt-3 w-4/6 text-sm font-semibold text-center justify-center align-center text-white bg-dark-cornflower-blue rounded-lg  hover:bg-midnight-blue group hover:shadow"
															onClick={shareSearchHandler}
														>
															Share
														</button>
													)}
												</div>
											</div>
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
