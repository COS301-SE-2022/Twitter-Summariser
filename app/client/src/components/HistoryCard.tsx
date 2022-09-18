import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function HistoryCard(props: any) {
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();

	const { auth } = useAuth();

	const setResultSet = () => {
		localStorage.setItem("resultSetId", props.data.id);
	};

	const deleteHandler = async () => {
		const resultDetails = {
			resultSetID: props.data.id,
			apiKey: auth.apiKey
		};

		try {
			await axiosPrivate.post("deleteResultSet", JSON.stringify(resultDetails), {
				signal: controller.signal
			});
			props.onChange(true);
		} catch (error) {
			console.error(error);
		}
	};

	let sort;
	let filter;

	if (props.data.sortOption === "byLikes") {
		sort = "By Likes";
	} else if (props.data.sortOption === "byComments") {
		sort = "Comments";
	} else {
		sort = "Retweets";
	}

	if (props.data.filterOption === "noneReply") {
		filter = "None Reply";
	} else {
		filter = "Verified Tweets";
	}

	const [options, setoptions] = useState(false);

	function optionhandler() {
		setoptions(!options);
	}

	return (
		<div className="pt-4 pb-4 pl-1 pr-1 m-2 mt-2 bg-gradient-to-b from-blue-50 via-sky-100 border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in hover:bg-blue-200">
			{!options ? (
				<>
					<p
						aria-label="Article"
						title={props.data.searchPhrase}
						className="flex items-center justify-center mb-3 text-xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
					>
						{props.data.searchPhrase}
					</p>
					<p className="flex mb-2 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
						<Carousel controls={false} indicators={false}>
							<Carousel.Item>
								<span className=" font-semiboldtext-deep-purple-accent-400">
									History - {props.data.dateCreated.substring(4, 16)}
								</span>
								{/* <h3>First slide label</h3> */}
							</Carousel.Item>
							<Carousel.Item>
								<span className=" font-semiboldtext-deep-purple-accent-400">
									Sorted By - {sort}
								</span>
								{/* <h3>Second slide label</h3> */}
							</Carousel.Item>
							<Carousel.Item>
								<span className=" font-semiboldtext-deep-purple-accent-400">
									Filtered By - {filter}
								</span>
								{/* <h3>Third slide label</h3> */}
							</Carousel.Item>
						</Carousel>
					</p>
					<div className="flex mt-4 space-x-3 items-center justify-center">
						<Link to="/viewHistory">
							<div className="items-center py-2 px-3 text-xs font-semibold text-center text-white bg-dark-cornflower-blue rounded-md  hover:bg-midnight-blue group hover:shadow">
								<button onClick={setResultSet} type="submit">
									{" "}
									VIEW HISTORY{" "}
								</button>
							</div>
						</Link>
						<div className="inline-flex items-center py-2 px-3 text-xs font-semibold text-center bg-dark-cornflower-blue rounded-md text-white hover:bg-midnight-blue group hover:shadow">
							<button onClick={optionhandler} type="submit">
								{" "}
								DELETE HISTORY{" "}
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
					<p className="flex flex-row mt-2 mb-2 text-gray-600 text-xs text-center items-center justify-center font-semibold tracking-wide uppercase">
						Are you sure you want to delete this draft?
					</p>
					<div className="flex mt-4 mb-2 space-x-3 items-center justify-center">
						<div className="inline-flex items-center py-2.5 px-4 text-xs font-semibold text-center bg-dark-cornflower-blue rounded-md text-white hover:bg-midnight-blue group hover:shadow">
							<button onClick={deleteHandler} type="submit">
								{" "}
								DELETE HISTORY{" "}
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

export default HistoryCard;
