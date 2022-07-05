import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

function HistoryCard(props: any) {
	// console.log(props.data);

	const iconStyle3 = { fontSize: "1.5rem", color: "red" };

	const setResultSet = () => {
		// console.log(props.data.id);
		localStorage.setItem("resultSetId", props.data.id);
	};

	return (
		<div className="">
			<div className="m-4 w-auto h-20 p-2 flex flex-row justify-between items-center">
				<div className="">
					<div className="">
						<Link to="/viewHistory">
							<button type="submit" onClick={setResultSet}>
								<p className="font-bold">{props.data.searchPhrase}</p>
							</button>
						</Link>
					</div>
					<div className="mt-2">
						<p className="italic text-xs">Sorted: {props.data.sortOption}</p>
					</div>
					<div className="mt-2">
						<p className="italic text-xs">Filtered: {props.data.filterOption}</p>
					</div>
					<div className="">
						<p className="italic text-xs">{props.data.date}</p>
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

export default HistoryCard;
