import { Link } from "react-router-dom";
// import { MdDeleteOutline } from "react-icons/md";
// import Report from "../../resources/Report.png";

// importing link
import link from "../../resources/links.json";
import Button from "../Button/Button";

function DraftCard(props: any) {
	// console.log(props);

	const viewGenReport = () => {
		if (localStorage.getItem("draftReportId")) {
			localStorage.removeItem("draftReportId");
			localStorage.setItem("draftReportId", props.data.reportID);
		} else {
			localStorage.setItem("draftReportId", props.data.reportID);
		}
	};

	// const iconStyle3 = { fontSize: "1.5rem", color: "red" };

	// const deleteDraftHandler = (event: any) => {
	const deleteDraftHandler = (event: any) => {
		// event.preventDefault();

		const resultDetails = {
			reportID: props.data.reportID,
			apiKey: props.data.apiKey
		};

		deleteDraft(resultDetails);
	};

	// ######################### API FOR DELETING RESULT SET ###############################################

	let deleteDraftEndpoint =
		process.env.NODE_ENV === "development"
			? String(link.localhostLink)
			: String(link.serverLink);
	deleteDraftEndpoint += "deleteReport";

	const deleteDraft = (resultInfo: any) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(resultInfo),
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
		};

		fetch(deleteDraftEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				isJson && (await response.json());

				// check for error response
				if (!response.ok) {
					// error

					return;
				}
			})
			.catch(() => {});
	};

	// #######################################################################

	return (
		<div className="p-8 bg-white border rounded-lg transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
			<div className="flex items-center justify-center">
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
			<br></br>

			<p
				aria-label="Article"
				title="Jingle Bells"
				className="flex items-center justify-center inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.title}
			</p>
			<p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					Draft Report - {props.data.dateCreated.substring(4, 16)}
				</span>
			</p>
			<div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
				<Link to="/genReport">
					{/* <div className="w-full rounded-full sm:w-auto bg-twitter-color hover:bg-twitter-color-hover focus:ring-4 focus:outline-none focus:ring-gray-300 text-white inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-400 dark:focus:ring-gray-700"> */}
					<div className="w-full rounded-full sm:w-auto focus:ring-4 focus:outline-none inline-flex items-center justify-center px-4 py-2.5 ">
						<div className="text-left">
							<Button
								text="VIEW REPORT"
								size="small"
								handle={viewGenReport}
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
						text="DELETE REPORT"
						size="small"
						handle={deleteDraftHandler}
						type="delete"
					/>
				</div>
			</div>
		</div>
	);
}

export default DraftCard;

// changeDate(await data.Report.dateCreated.substring(0, 10));
