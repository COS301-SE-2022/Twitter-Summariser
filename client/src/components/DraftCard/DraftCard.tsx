import { Link } from "react-router-dom";

function DraftCard(props: any) {
	const viewGenReport = () => {
		if (localStorage.getItem("draftReportId")) {
			localStorage.removeItem("draftReportId");
			localStorage.setItem("draftReportId", props.data.reportID);
		} else {
			localStorage.setItem("draftReportId", props.data.reportID);
		}
	};

	return (
		<div>
			<Link to="/genReport">
				<div className="m-4 w-auto h-20 bg-gray-400 rounded-md flex flex-col p-2">
					<div className="">
						<button data-testid="btn-report" type="submit" onClick={viewGenReport}>
							<p className="font-bold">{props.data.title}</p>
						</button>
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
			</Link>
		</div>
	);
}

export default DraftCard;

// changeDate(await data.Report.dateCreated.substring(0, 10));
