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

	return (
		<div className="pt-5 pb-5 pl-1 pr-1 m-1 mt-2 bg-white border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in">
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
					<div className="items-center py-2.5 px-4 text-xs font-semibold text-center text-white bg-dark-cornflower-blue rounded-md  hover:bg-midnight-blue group hover:shadow">
						<button onClick={viewDraftReport} type="submit">
							{" "}
							VIEW REPORT{" "}
						</button>
					</div>
				</Link>
				<div className="inline-flex items-center py-2.5 px-4 text-xs font-semibold text-center bg-crimson rounded-md text-white hover:bg-midnight-blue group hover:shadow">
					<button onClick={deleteDraftHandler} type="submit">
						{" "}
						DELETE REPORT{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default DraftCard;
