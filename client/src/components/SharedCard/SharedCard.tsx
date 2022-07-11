import { Link } from "react-router-dom";
// import { MdDeleteOutline } from "react-icons/md";

// importing link
// import link from "../../resources/links.json";

function SharedCard(props: any) {
	// console.log(props);

	const viewReport = () => {
		if (localStorage.getItem("reportId")) {
			localStorage.removeItem("reportId");
			localStorage.setItem("reportId", props.data.reportID);
		} else {
			localStorage.setItem("reportId", props.data.reportID);
		}
	};

	return (
		<div>
			<div className="m-4 w-auto h-20 rounded-md flex flex-row justify-between items-center p-2">
				<div className="">
					<div className="">
						<Link to="/getPublishedReport">
							<button data-testid="btn-report" type="submit" onClick={viewReport}>
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

				{/* <button type="button" >
					<div
						className=" pl-4 flex flex-row justify-center items-center"
						data-bs-toggle="tooltip"
						title="Delete Report"
					>

					</div>
				</button> */}
			</div>
		</div>
	);
}

export default SharedCard;

// changeDate(await data.Report.dateCreated.substring(0, 10));
