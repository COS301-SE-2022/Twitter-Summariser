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
		<div className="pt-3 pb-3 pl-3 pr-3 m-2 bg-gradient-to-b from-blue-50 via-sky-100 border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in hover:bg-blue-200">
			{!options ? (
				<>
					<p
						aria-label="Article"
						title={props.data.searchPhrase}
						className="flex items-center justify-center mb-3 text-xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
					>
						{props.data.searchPhrase}
					</p>
					<div className="flex mb-2 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
						<Carousel controls={false} indicators={false}>
							<Carousel.Item>
								<span className=" font-semiboldtext-deep-purple-accent-400">
									History - {props.data.dateCreated.substring(4, 16)}
								</span>
							</Carousel.Item>
							<Carousel.Item>
								<span className=" font-semiboldtext-deep-purple-accent-400">
									Sorted By - {sort}
								</span>
							</Carousel.Item>
							<Carousel.Item>
								<span className=" font-semiboldtext-deep-purple-accent-400">
									Filtered By - {filter}
								</span>
							</Carousel.Item>
						</Carousel>
					</div>
					<div className="flex mt-4 space-x-6 md:mt-8 items-center justify-center">
						<Link to="/viewHistory">
							<div className="rounded-sm items-center py-2.5 px-10 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
								<button onClick={setResultSet} type="submit">
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
						Are you sure you want to delete this search result?
					</p>
					<div className="flex mt-8 space-x-6 md:mt-8 items-center justify-center">
						<div className="rounded-sm items-center py-2.5 px-10 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
							<button onClick={deleteHandler} type="submit">
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

export default HistoryCard;
