import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

// importing link
import link from "../../resources/links.json";

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

	const iconStyle3 = { fontSize: "1.5rem", color: "red" };

	const deleteDraftHandler = (event: any) => {
		event.preventDefault();

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
			body: JSON.stringify(resultInfo)
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
		<div>
			<div className="m-4 w-auto h-20 rounded-md flex flex-row justify-between items-center p-2">
				<div className="">
					<div className="">
						<Link to="/genReport">
							<button data-testid="btn-report" type="submit" onClick={viewGenReport}>
								<p className="font-bold">{props.data.title}</p>
							</button>
						</Link>
					</div>
					<div className="mt-2">
						<p className="italic text-xs">Author: {props.data.author}</p>
					</div>
					<div className="">
						<p className="italic text-xs">
							Created on: {props.data.dateCreated.substring(0, 16)}
						</p>
					</div>
				</div>

				<button type="button" onClick={deleteDraftHandler}>
					<div
						className=" pl-4 flex flex-row justify-center items-center"
						data-bs-toggle="tooltip"
						title="Delete History"
					>
						<MdDeleteOutline style={iconStyle3} />
					</div>
				</button>
			</div>
		</div>
	);
}

export default DraftCard;

// changeDate(await data.Report.dateCreated.substring(0, 10));
