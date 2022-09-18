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

	return (
		<div className="pt-8 pb-8 pr-2 pl-2 m-2 mt-4 bg-white border rounded-lg transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
			<p
				aria-label="Article"
				title="Jingle Bells"
				className="flex items-center justify-center mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.searchPhrase}
			</p>
			<br />
			<p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<Carousel>
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
			{/* <p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					Sorted By - {sort}
				</span>
			</p> */}
			{/* <p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					Filtered By - {filter}
				</span>
			</p> */}
			<div className="flex mt-8 space-x-4 md:mt-8 items-center justify-center">
				<Link to="/viewHistory">
					<div className="rounded-sm items-center py-2.5 px-2 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
						<button onClick={setResultSet} type="submit">
							{" "}
							VIEW HISTORY{" "}
						</button>
					</div>
				</Link>
				<div className="rounded-sm inline-flex items-center py-2.5 px-2 text-sm font-semibold text-center bg-crimson  text-white hover:bg-midnight-blue group hover:shadow">
					<button onClick={deleteHandler} type="submit">
						{" "}
						DELETE HISTORY{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default HistoryCard;
