import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function ReportCard(props: any) {
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();

	const { auth } = useAuth();

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
			apiKey: auth.apiKey
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
		<div className="pt-4 pb-4 pl-1 pr-1 m-2 mt-2 bg-gradient-to-b from-blue-50 via-sky-100 border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in hover:bg-blue-200">
			<div className="flex items-center justify-center">
				<p aria-label="Author" title="Author" className="mr-3 ">
					<img
						src={props.imageURL}
						alt="avatar"
						className="object-cover w-20 h-20 rounded-full shadow-sm"
					/>
				</p>
				{/* <div>
					<p
						aria-label="Author"
						title="Author"
						className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
					>
						{props.data.author}
					</p>
					<p className="text-sm font-medium leading-4 text-gray-600">Author</p>
				</div> */}
			</div>
			<br />

			<p
				aria-label="Article"
				title="Jingle Bells"
				className="flex items-center justify-center mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.title}
			</p>
			<p className="flex mb-2 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<Carousel controls={false} indicators={false}>
					<Carousel.Item>
						<span className=" font-semiboldtext-deep-purple-accent-400">
							AUTHOR - {props.data.author}
						</span>
						{/* <h3>First slide label</h3> */}
					</Carousel.Item>
					<Carousel.Item>
						<span className=" font-semiboldtext-deep-purple-accent-400">
							Published Report - {props.data.dateCreated.substring(0, 16)}
						</span>
						{/* <h3>Second slide label</h3> */}
					</Carousel.Item>
				</Carousel>
			</p>
			<div className="flex mt-4 space-x-3 items-center justify-center">
				<Link to={newReportLink}>
					<div className="items-center py-2 px-3 text-xs font-semibold text-center text-white bg-dark-cornflower-blue rounded-md  hover:bg-midnight-blue group hover:shadow">
						<button onClick={viewReport} type="submit">
							{" "}
							VIEW REPORT{" "}
						</button>
					</div>
				</Link>
				<div className="inline-flex items-center py-2 px-3 text-xs font-semibold text-center bg-crimson rounded-md text-white hover:bg-midnight-blue group hover:shadow">
					<button onClick={deleteReportHandler} type="submit">
						{" "}
						DELETE REPORT{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ReportCard;
