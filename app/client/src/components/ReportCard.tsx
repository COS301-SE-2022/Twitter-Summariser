import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ReportCard(props: any) {
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();

	const repID = props.data.reportID;
	const newReportLink = `/report/${repID}`;


	const viewReport = () => {
		// if (localStorage.getItem("reportId")) {
		// 	localStorage.removeItem("reportId");
		// 	localStorage.setItem("reportId", props.data.reportID);
		// } else {
		// 	localStorage.setItem("reportId", props.data.reportID);
		// }
	};

	const deleteReportHandler = async () => {
		const resultDetails = {
			reportID: props.data.reportID,
			apiKey: props.data.apiKey
		};

		try {
			await axiosPrivate.post("deleteReport", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			props.onChange(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		// <div>
		//     <div className="m-4 w-auto h-20 rounded-md flex flex-row justify-between items-center p-2">
		//         <div className="">
		//             <div className="">
		//                 <Link to="/getPublishedReport">
		//                     <button data-testid="btn-report" type="submit" onClick={viewReport}>
		//                         <p className="font-bold">{props.data.title}</p>
		//                     </button>
		//                 </Link>
		//             </div>
		//             <div className="mt-2">
		//                 <p className="italic text-xs">Author: {props.data.author}</p>
		//             </div>
		//             <div className="">
		//                 <p className="italic text-xs">
		//                     Created on: {props.data.dateCreated.substring(0, 16)}
		//                 </p>
		//             </div>
		//         </div>

		//         <button type="button" onClick={deleteReportHandler}>
		//             <div
		//                 className=" pl-4 flex flex-row justify-center items-center"
		//                 data-bs-toggle="tooltip"
		//                 title="Delete Report"
		//             >
		//                 <MdDeleteOutline style={iconStyle3} />
		//             </div>
		//         </button>
		//     </div>
		// </div>
		<div className="pt-8 pb-8 pr-2 pl-2 mt-3 mr-1 ml-1 bg-white border rounded-lg transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
			<div className="flex items-center justify-center">
				<p aria-label="Author" title="Author" className="mr-3 ">
					<img
						src={props.imageURL}
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
				<Link to= {newReportLink}>
					<div className="items-center py-2.5 px-4 text-sm font-semibold text-center text-white bg-dark-cornflower-blue rounded-sm  hover:bg-midnight-blue group hover:shadow">
						<button	onClick={viewReport} type="submit"> VIEW REPORT </button>
					</div>
				</Link>
				<div className="inline-flex items-center py-2.5 px-4 text-sm font-semibold text-center bg-crimson rounded-sm text-white hover:bg-midnight-blue group hover:shadow">
					<button	onClick={deleteReportHandler} type="submit"> DELETE REPORT </button>
				</div>
			</div>
		</div>
	);
}

export default ReportCard;
