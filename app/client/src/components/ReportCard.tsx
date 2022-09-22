import { useState } from "react";
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

	const [options, setoptions] = useState(false);

	function optionhandler() {
		setoptions(!options);
	}

	return (
		<div className="pt-4 pb-4 pl-1 pr-1 md:pl-4 md:pr-4 m-2 bg-gradient-to-b from-blue-50 via-sky-100  bg-white border rounded-lg transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
			{!options ? (
				<>
					<div className=" p-0 my-0"> </div>
					<div className="flex items-center justify-center">
						<p aria-label="Author" title="Author" className="mr-3 ">
							<img
								src={props.imageURL}
								alt="avatar"
								className="object-cover w-20 h-20 rounded-full shadow-sm"
							/>
						</p>
					</div>
					<br />
					<p
						aria-label="Article"
						title={props.data.title}
						className="flex items-center justify-center mt-2 mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
					>
						{props.data.title}
					</p>

					<div className="flex mb-2 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase h-10">
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
					</div>

					<div className="flex mt-3 space-x-4 md:mt-8 items-center justify-center">
						<Link to={newReportLink}>
							<div className="rounded-sm items-center py-2.5 px-10 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
								<button onClick={viewReport} type="submit">
									View
								</button>
							</div>
						</Link>
						<div className="rounded-sm inline-flex items-center py-2.5 px-8 text-sm font-semibold text-center bg-dark-cornflower-blue  text-white hover:bg-midnight-blue group hover:shadow">
							<button onClick={optionhandler} type="submit">
								Delete
							</button>
						</div>
					</div>
				</>
			) : (
				<div className="pt-8 pb-16">
					<p className="flex flex-row mt-12 mb-2 text-gray-600 text-xs text-center items-center justify-center font-semibold tracking-wide uppercase">
						Are you sure you want to delete this report?
					</p>
					<div className="flex mt-8 space-x-4 md:mt-8 items-center justify-center">
						<div className="rounded-sm items-center py-2.5 px-10 space-x-4 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
							<button onClick={deleteReportHandler} type="submit">
								Yes
							</button>
						</div>
						<div className="rounded-sm inline-flex items-center py-2.5 px-8 text-sm font-semibold text-center bg-dark-cornflower-blue text-white hover:bg-midnight-blue group hover:shadow">
							<button onClick={optionhandler} type="submit">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ReportCard;
