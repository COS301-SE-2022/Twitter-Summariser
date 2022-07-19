import { Link } from "react-router-dom";
// import { MdDeleteOutline } from "react-icons/md";

// importing link
import link from "../resources/links.json";
import Button from "./Button";

function HistoryCard(props: any) {
	// console.log(props.data);

	// const iconStyle3 = { fontSize: "1.5rem", color: "red" };

	const setResultSet = () => {
		// console.log(props.data.id);
		localStorage.setItem("resultSetId", props.data.id);
	};

	// ######################### API FOR DELETING RESULT SET ###############################################

	let deleteResultSetEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);
	deleteResultSetEndpoint += "deleteResultSet";

	const deleteResult = (resultInfo: any) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(resultInfo),
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
		};

		fetch(deleteResultSetEndpoint, requestOptions).then(async (response) => {
			response.headers.get("content-type")?.includes("application/json");

			// isJson && (await response.json());
		});
	};

	// #######################################################################

	const deleteHandler = (event: any) => {
		event.preventDefault();

		const resultDetails = {
			resultSetID: props.data.id,
			apiKey: props.data.apiKey
		};

		deleteResult(resultDetails);
	};

	let sort;
	let filter;

	if (props.data.sortOption === "byLikes") {
		sort = "By Likes";
	} else if (props.data.sortOption === "byComments") {
		sort = "Comments";
	} else {
		sort = "Retweets";
	}

	if (props.data.filterOption === "noneReply") {
		filter = "None Reply";
	} else {
		filter = "Verified Tweets";
	}

	return (
		// <div className="">
		//     <div className="m-4 w-auto h-20 p-2 flex flex-row justify-between items-center">
		//         <div className="">
		//             <div className="">
		//                 <Link to="/viewHistory">
		//                     <button type="submit" onClick={setResultSet}>
		//                         <p className="font-bold">{props.data.searchPhrase}</p>
		//                     </button>
		//                 </Link>
		//             </div>
		//             <div className="mt-2">
		//                 <p className="italic text-xs">Sorted: {props.data.sortOption}</p>
		//             </div>
		//             <div className="mt-2">
		//                 <p className="italic text-xs">Filtered: {props.data.filterOption}</p>
		//             </div>
		//             <div className="">
		//                 <p className="italic text-xs">{props.data.date}</p>
		//             </div>
		//         </div>

		//         <button type="button" onClick={deleteHandler}>
		//             <div className=" ml-2" data-bs-toggle="tooltip" title="Delete History">
		//                 <MdDeleteOutline style={iconStyle3} />
		//             </div>
		//         </button>
		//     </div>
		// </div>
		<div className="p-8 bg-white border rounded-lg transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
			{/* <div className="flex items-center justify-center">
				<p aria-label="Author" title="Author" className="mr-3 ">
					<img
						src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
						alt="avatar"
						className="object-cover w-10 h-10 rounded-full shadow-sm"
					/>
				</p>
				<div>
					<p
						aria-label="Author"
						title="Author"
						className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
					>
						{props.data.author}
					</p>
					<p className="text-sm font-medium leading-4 text-gray-600">Author</p>
				</div>
			</div>
			<br></br> */}

			<p
				aria-label="Article"
				title="Jingle Bells"
				className="flex items-center justify-center inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.searchPhrase}
			</p>
			<p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					History - {props.data.dateCreated.substring(4, 16)}
				</span>
			</p>
			<p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					Sorted By - {sort}
				</span>
			</p>
			<p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					Filtered By - {filter}
				</span>
			</p>
			<div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
				<Link to="/viewHistory">
					{/* <div className="w-full rounded-full sm:w-auto bg-twitter-color hover:bg-twitter-color-hover focus:ring-4 focus:outline-none focus:ring-gray-300 text-white inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-400 dark:focus:ring-gray-700"> */}
					<div className="w-full rounded-full sm:w-auto focus:ring-4 focus:outline-none inline-flex items-center justify-center px-4 py-2.5 ">
						<div className="text-left">
							<Button
								text="VIEW HISTORY"
								size="small"
								handle={setResultSet}
								type="view"
							/>
						</div>
					</div>
				</Link>
				{/* <div className="w-full sm:w-auto bg-twitter-color hover:bg-twitter-color-hover focus:ring-4 focus:outline-none focus:ring-gray-300 text-white inline-flex items-center justify-center rounded-full px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-400 dark:focus:ring-gray-700"> */}
				<div className="w-full rounded-full sm:w-auto focus:ring-4 focus:outline-none inline-flex items-center justify-center px-4 py-2.5 ">
					{/* <button data-testid="btn-report" type="submit" onClick={deleteDraftHandler}>
						<p className="font-bold">DELETE REPORT</p>
					</button> */}
					<Button
						text="DELETE HISTORY"
						size="small"
						handle={deleteHandler}
						type="delete"
					/>
				</div>
			</div>
		</div>
	);
}

export default HistoryCard;
