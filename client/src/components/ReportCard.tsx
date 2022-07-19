import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";

function ReportCard(props: any) {
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	const controller = new AbortController();

	const viewReport = () => {
		if (localStorage.getItem("reportId")) {
			localStorage.removeItem("reportId");
			localStorage.setItem("reportId", props.data.reportID);
		} else {
			localStorage.setItem("reportId", props.data.reportID);
		}
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
			navigate("/login", { state: { from: location }, replace: true });
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
					Draft Report - {props.data.dateCreated.substring(0, 16)}
				</span>
			</p>
			<div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
				<Link to="/getPublishedReport">
					{/* <div className="w-full rounded-full sm:w-auto bg-twitter-color hover:bg-twitter-color-hover focus:ring-4 focus:outline-none focus:ring-gray-300 text-white inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-400 dark:focus:ring-gray-700"> */}
					<div className="w-full rounded-full sm:w-auto focus:ring-4 focus:outline-none inline-flex items-center justify-center px-4 py-2.5 ">
						<div className="text-left">
							<Button
								text="VIEW REPORT"
								size="small"
								handle={viewReport}
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
						handle={deleteReportHandler}
						type="delete"
					/>
				</div>
			</div>
		</div>
	);
}

export default ReportCard;
