import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function DraftCard(props: any) {
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();

	const { auth } = useAuth();

	const draftID = props.data.reportID;
	const newDraftReportLink = `/report/${draftID}`;

	// console.log(props.data.dateCreated);

	const viewDraftReport = () => {
		// if (localStorage.getItem("draftReportId")) {
		// 	localStorage.removeItem("draftReportId");
		// 	localStorage.setItem("draftReportId", props.data.reportID);
		// } else {
		// 	localStorage.setItem("draftReportId", props.data.reportID);
		// }
	};

	const deleteDraftHandler = async () => {
		const resultDetails = {
			reportID: props.data.reportID,
			apiKey: auth.apiKey
		};

		// console.log(resultDetails);

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
		<div className="pt-4 pb-4 pl-1 pr-1 m-2 mt-2 bg-gradient-to-b from-blue-50 via-sky-100 border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in hover:bg-blue-200">
			{/* <div className="flex items-center justify-center">
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
			</div> */}
			{/* <br /> */}
			{!options ? (
				<>
					<div className=" mx-48"> </div>
					<p
						aria-label="Article"
						title={props.data.title}
						className="flex items-center justify-center mb-3 text-xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
					>
						{props.data.title}
					</p>
					<p className="flex mb-2 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
						<span className=" font-semiboldtext-deep-purple-accent-400">
							Draft Report - {props.data.dateCreated.substring(4, 16)}
						</span>
					</p>
					<div className="flex mt-4 space-x-3 items-center justify-center">
						<Link to={newDraftReportLink}>
							<div className="items-center py-2 px-3 text-xs font-semibold text-center text-white bg-dark-cornflower-blue rounded-md  hover:bg-midnight-blue group hover:shadow">
								<button onClick={viewDraftReport} type="submit">
									{" "}
									VIEW{" "}
								</button>
							</div>
						</Link>
						<div className="inline-flex items-center py-2 px-3 text-xs font-semibold text-center bg-dark-cornflower-blue rounded-md text-white hover:bg-midnight-blue group hover:shadow">
							<button onClick={optionhandler} type="submit">
								{" "}
								DELETE{" "}
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					{/* <p
						aria-label="Article"
						title={props.data.title}
						className="flex items-center justify-center mb-3 text-xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
					>
						{props.data.title}
					</p> */}
					<div className=" mx-52"> </div>
					<p className="flex flex-row mt-2 mb-2 text-gray-600 text-xs text-center items-center justify-center font-semibold tracking-wide uppercase">
						Are you sure you want to delete this draft?
					</p>
					<div className="flex mt-4 mb-2 space-x-3 items-center justify-center">
						<div className="inline-flex items-center py-2.5 px-4 text-xs font-semibold text-center bg-dark-cornflower-blue rounded-md text-white hover:bg-midnight-blue group hover:shadow">
							<button onClick={deleteDraftHandler} type="submit">
								{" "}
								DELETE{" "}
							</button>
						</div>

						<div className="items-center py-2.5 px-4 text-xs font-semibold text-center text-white bg-dark-cornflower-blue rounded-md  hover:bg-midnight-blue group hover:shadow">
							<button onClick={optionhandler} type="submit">
								CANCEL
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default DraftCard;
