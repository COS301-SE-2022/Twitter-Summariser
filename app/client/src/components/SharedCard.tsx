import { useNavigate } from "react-router-dom";

function SharedCard(props: any) {
	const navigate = useNavigate();

	const repID = props.data.reportID;
	// const newDraftReportLink = `/draftReport/${repID}`;
	const newReportLink = `/report/${repID}`;

	let viewPermission = "";

	const viewReport = () => {
		if(props.data.permission === "EDITOR"){
			viewPermission = "EDIT";
		}
		else{
			viewPermission = "VIEW";
			// console.log("viewPermission");
			// console.log(viewPermission);
		}

		if(viewPermission === "VIEW"){
				// if (localStorage.getItem("reportId")) {
				// 	localStorage.removeItem("reportId");
				// 	localStorage.setItem("reportId", props.data.reportID);
				// } else {
				// 	localStorage.setItem("reportId", props.data.reportID);
				// }

				// console.log("here");
				navigate(newReportLink);
		}
		// else if (localStorage.getItem("draftReportId")) {
		// 	localStorage.removeItem("draftReportId");
		// 	localStorage.setItem("draftReportId", props.data.reportID);
		// 	navigate('/draftReport');
		// }
		else {
			// localStorage.setItem("draftReportId", props.data.reportID);
			navigate(newReportLink);
		}



	};

	// console.log(props);
	return (
		// <div>
		// 	<div className="m-4 w-auto h-20 rounded-md flex flex-row justify-between items-center p-2">
		// 		<div className="">
		// 			<div className="">
		// 				<Link to="/getPublishedReport">
		// 					<button data-testid="btn-report" type="submit" onClick={viewReport}>
		// 						<p className="font-bold">{props.data.title}</p>
		// 					</button>
		// 				</Link>
		// 			</div>
		// 			<div className="mt-2">
		// 				<p className="italic text-xs">Author: {props.data.author}</p>
		// 			</div>
		// 			<div className="">
		// 				<p className="italic text-xs">
		// 					Created on: {props.data.dateCreated.substring(0, 16)}
		// 				</p>
		// 			</div>
		// 		</div>

		// {/* <button type="button" >
		// 	<div
		// 		className=" pl-4 flex flex-row justify-center items-center"
		// 		data-bs-toggle="tooltip"
		// 		title="Delete Report"
		// 	>

		// 	</div>
		// </button> */}
		// 	</div>
		// </div>
		<div className="pt-8 pb-8 pr-2 pl-2 mt-3 mr-1 ml-1 bg-white border rounded-lg transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
			<div className="flex items-center justify-center">
				<p aria-label="Author" title="Author" className="mr-3 ">
					<img
						src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
						alt="avatar"
						className="object-cover w-20 h-20 rounded-full shadow-sm"
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
			<br />

			<p
				aria-label="Article"
				title="Jingle Bells"
				className="flex items-center justify-center mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.title}
			</p>
			<p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					Published Report - {props.data.dateCreated.substring(0, 16)}
				</span>
			</p>
			<div className="flex mt-8 space-x-4 md:mt-8 items-center justify-center">
					<div className="rounded-sm items-center py-2.5 px-16 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
						<button	onClick={viewReport} type="submit"> VIEW REPORT </button>
					</div>
			</div>

			{/* <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"> */}
				{/* <Link to="/getPublishedReport">
					<div className="w-full rounded-full sm:w-auto focus:ring-4 focus:outline-none inline-flex items-center justify-center px-4 py-2.5 ">
						<div className="text-left">
							<Button
								text="View Report"
								size="small"
								handle={viewReport}
								type="view"
							/>
						</div>
					</div>
				</Link> */}

{/* UNCOMMENT BELOW TO FIX PERMISSION BUG */}
				{/* { viewPermission === "VIEW" && <Link to="/getPublishedReport"> */}
					{/* <div className="w-full rounded-full sm:w-auto focus:ring-4 focus:outline-none inline-flex items-center justify-center px-4 py-2.5 ">
						<div className="text-left">
							<Button
								text="View Report"
								size="small"
								handle={viewReport}
								type="view"
							/>
						</div>
					</div> */}
				{/* </Link>} */}

				{/* { viewPermission === "EDIT" && <Link to="/genReport">
					<div className="w-full rounded-full sm:w-auto focus:ring-4 focus:outline-none inline-flex items-center justify-center px-4 py-2.5 ">
						<div className="text-left">
							<Button
								text="View Report"
								size="small"
								handle={viewReport}
								type="view"
							/>
						</div>
					</div>
				</Link>} */}

			{/* </div> */}
		</div>
	);
}

export default SharedCard;
