import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

function DraftCard(props: any) {
	const viewGenReport = () => {
		if (localStorage.getItem("draftReportId")) {
			localStorage.removeItem("draftReportId");
			localStorage.setItem("draftReportId", props.data.reportID);
		} else {
			localStorage.setItem("draftReportId", props.data.reportID);
		}
	};

	const iconStyle3 = { fontSize: "1.5rem", color: "red" };

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

				<div
					className=" pl-4 flex flex-row justify-center items-center"
					data-bs-toggle="tooltip"
					title="Delete History"
				>
					<MdDeleteOutline style={iconStyle3} />
				</div>
			</div>
		</div>
	);
}

export default DraftCard;

// changeDate(await data.Report.dateCreated.substring(0, 10));
