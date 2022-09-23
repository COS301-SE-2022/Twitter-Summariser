import { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Checkbox } from "@mui/material";
import DateTimePicker from "react-datetime-picker";
import Form from "react-bootstrap/Form";

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
	show
}: any) {
	const handleCancelClick = () => {
		setChoice(false);
		setAdvanceOn(false);
	};

	const style = { fontSize: "1.3rem" };

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

	return (
		<div>
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
								{modalChoice === "advancedSearch" && (
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
								)}
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default Modals;
