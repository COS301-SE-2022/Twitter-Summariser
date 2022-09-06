import { AiOutlineClose } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function AdvanceSearch({
	setAdvanceOn,
	setChoice,
	changeNoOfTweets,
	changeSort,
	changeFilter,
	toggleSearch,
	enteredSearch
}: any) {
	const handleCancelClick = () => {
		setChoice(false);
		setAdvanceOn(false);
	};

	const { auth } = useAuth();

	const style = { fontSize: "1.3rem" };

	const [noOfTweets, changeTweets] = useState(10);
	const [sort, changSort] = useState("-");
	const [filter, changFilter] = useState("-");

	const tweetHandler = (event: any) => {
		changeTweets(event.target.value);
		changeNoOfTweets(event.target.value);
	};

	const sortHandler = (event: any) => {
		changSort(event.target.value);
		changeSort(event.target.value);
	};

	const filterHandler = (event: any) => {
		changFilter(event.target.value);
		changeFilter(event.target.value);
	};

	const tweetOptions = [];

	for (let index = 5; index <= 100; index += 5) {
		tweetOptions.push(<option key={index.toString()}>{index}</option>);
	}

	const [schedule, changeSchedule] = useState("00:00");
	const [repeat, changeRepeat] = useState("Repeat Daily");

	const [checked, setChecked] = useState(false);

	const checkedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const scheduleHandler = (event: any) => {
		changeSchedule(event.target.value);
	};

	const repeatHandler = (event: any) => {
		changeRepeat(event.target.value);
	};

	const triggerScheduleEndpoint = () => {
		const date = new Date();
		const utcDate = date.toUTCString();
		const dateHour = date.getUTCHours();
		const minute = date.getUTCMinutes();
		const day = date.getUTCDate();
		const dateMonth = date.getUTCMonth() + 1;
		const dateYear = date.getUTCFullYear();

		// console.log(date);
		// console.log(utcDate);
		// console.log(hour);
		// console.log(minute);
		// console.log(day);
		// console.log(month);
		// console.log(year);



		const scheduleData = {
			username: auth.username,
			fullUTCDate: utcDate,
			min: minute,
			hour: dateHour,
			dateOfMonth: day,
			month: dateMonth,
			year: dateYear,
			reportDetails: {
				apiKey: auth.apiKey,
				filterBy: filter,
				keyword: enteredSearch,
				numOfTweets: noOfTweets,
				sortBy: sort,
				author: auth.username

			}
		};

		// console.log(scheduleData);

		// use the object "scheduleData" as you see please
		scheduleData;

		// schedule endpoint comes here
	};

	function advanceSearch() {
		toggleSearch();
		setAdvanceOn(false);
		setChoice(false);

		triggerScheduleEndpoint();
	}

	return (
		<div className="flex justify-center items-center z-54 px-5">
			<div className="bg-zinc-200 opacity-90 fixed inset-0" />
			<div className="flex justify-center items-center inset-0 fixed">
				<div className="bg-white border-4 opacity-100 border-sky-500 rounded-xl ">
					<div className="relative">
						<div className="absolute p-3 font-bold">Advanced Search</div>
						<div className="absolute top-0 right-0 p-3 cursor-pointer text-red-600">
							<AiOutlineClose style={style} onClick={handleCancelClick} />
						</div>
					</div>
					<div className="flex-col justify-center mt-4 p-12 ">
						<div className="flex flex-col justify-center items-center  text-lg  text-zinc-600   mb-5">
							{/* certain options and search button comes here */}
							<div className="flex flex-row flex-wrap justify-center items-center p-4 rounded-md bg-slate-200">
								<div className="mb-0">
									<p className="font-bold">Tweets:</p>
								</div>
								&nbsp;
								<div className="mt-0">
									<select
										data-testid="select-num-tweets"
										className=" text-black bg-slate-200"
										// value={noOfTweets}
										onChange={tweetHandler}
									>
										{tweetOptions}
									</select>
								</div>
							</div>
							<br />

							{/* this is for the Fitlering options */}
							<div className="flex flex-row flex-wrap justify-center items-center p-4 rounded-md bg-slate-200">
								<div className="mb-0">
									<p className=" font-bold">Filter:</p>
								</div>
								&nbsp;
								<div className="mt-0 bg-slate-200">
									<select
										data-testid="select-filter"
										className=" text-black text-center bg-slate-200"
										onChange={filterHandler}
										// value={filter}
									>
										<option>-</option>
										<option value="verifiedTweets">Verified Tweets</option>
										<option value="noneReply">Non-Replies</option>
									</select>
								</div>
							</div>
							<br />

							{/* this is for the sorting options */}
							<div className="flex flex-row justify-center items-center p-4 rounded-md bg-slate-200">
								<div className="mb-0">
									<p className="font-bold">Sort By:</p>
								</div>
								<div className="mt-0">
									<select
										data-testid="select-sort"
										className=" text-black text-center bg-slate-200"
										onChange={sortHandler}
									>
										<option>-</option>
										<option value="byLikes">Likes</option>
										<option value="byComments">Comments</option>
										<option value="byRetweets">Re-tweets</option>
									</select>
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
										checked={checked}
										onChange={checkedHandler}
										inputProps={{ "aria-label": "controlled" }}
									/>
								</div>
								{checked && (
									<div className="flex flex-col justify-center items-center p-1">
										<div className="flex flex-row justify-center items-center p-4 rounded-md bg-slate-200">
											<div className="mb-0">
												<p className="font-bold">Interval: </p>
											</div>
											<select
												data-testid="repeat-select"
												className=" text-black text-center bg-slate-200"
												onChange={repeatHandler}
												value={repeat}
											>
												<option value="daily">Repeat Daily</option>
												<option value="weekly">Repeat Weekly</option>
												<option value="monthly">Repeat Monthly</option>
												<option value="monthly">Repeat Yearly</option>
											</select>
										</div>

										<br />

										<div className="flex flex-row justify-center items-center p-4 rounded-md bg-slate-200">
											<div className="mb-0">
												<p className="font-bold">Time: </p>
											</div>
											<select
												data-testid="schedule-select"
												className=" text-black text-center bg-slate-200"
												onChange={scheduleHandler}
												value={schedule}
											>
												<option>-</option>
												<option value="00:00">00:00</option>
												<option value="06:00">06:00</option>
												<option value="12:00">12:00</option>
												<option value="18:00">18:00</option>
											</select>
										</div>
									</div>
								)}
							</div>

							<br />

							<button
								className="button_large text-lg p-0.5 h-10 w-60 bg-dark-cornflower-blue rounded-lg text-white font-semibold hover:bg-midnight-blue group hover:shadow"
								type="button"
								onClick={advanceSearch}
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdvanceSearch;
