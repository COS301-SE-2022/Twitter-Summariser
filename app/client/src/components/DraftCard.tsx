import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function DraftCard(props: any) {
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();
	const draftID = props.data.reportID;
	const newDraftReportLink = `/report/${draftID}`;

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

		try {
			await axiosPrivate.post("deleteReport", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			props.onChange(true);
		} catch (error) {
			console.error(error);
		}
	};

	function toggleDelete() {
		toast.promise(deleteDraftHandler(), {
			loading: "Deleting.....",
			success: <b>Draft deleted!</b>,
			error: <b>Could not delete.</b>
		});
	}

	const [options, setoptions] = useState(false);

	function optionhandler() {
		setoptions(!options);
	}

	return (
		<div className="pt-3 pb-3 pl-8 pr-8 ml-1 mr-1 mb-4  bg-gradient-to-b from-blue-50 via-sky-100 border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in hover:bg-blue-200">
			{!options ? (
				<>
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

					<div className="flex mt-4 space-x-4 md:mt-8 items-center justify-center">
						<Link to={newDraftReportLink}>
							<div className="rounded-sm items-center py-2.5 px-10 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
								<button onClick={viewDraftReport} type="submit">
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
				<>
					<p className="flex flex-row mt-2 mb-2 text-gray-600 text-xs text-center items-center justify-center font-semibold tracking-wide uppercase">
						Are you sure you want to delete this draft report?
					</p>
					<div className="flex mt-8 space-x-4 md:mt-8 items-center justify-center">
						<div className="rounded-sm items-center py-2.5 px-10 space-x-4 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
							<button onClick={toggleDelete} type="submit">
								Yes
							</button>
						</div>
						<div className="rounded-sm inline-flex items-center py-2.5 px-8 text-sm font-semibold text-center bg-dark-cornflower-blue text-white hover:bg-midnight-blue group hover:shadow">
							<button onClick={optionhandler} type="submit">
								Cancel
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default DraftCard;
