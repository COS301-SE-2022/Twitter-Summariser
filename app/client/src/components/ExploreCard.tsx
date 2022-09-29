import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function ExploreCard(props: any) {
	const repID = props.data.reportID;
	const newReportLink = `/report/${repID}`;
	const imageURL =
		props.data.profileKey === "assets/profile.png"
			? props.data.profileKey
			: `https://s3.amazonaws.com/twitter-summariser-images/${props.data.profileKey}`;

	const viewReport = () => {
		// if (localStorage.getItem("reportId")) {
		// 	localStorage.removeItem("reportId");
		// 	localStorage.setItem("reportId", props.data.reportID);
		// } else {
		// 	localStorage.setItem("reportId", props.data.reportID);
		// }
	};

	return (
		<div className="pt-3 pb-3 pl-3 pr-3 m-4 bg-gradient-to-b from-blue-50 via-sky-100 border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in hover:bg-blue-200">
			<div className="flex items-center justify-center">
				<p aria-label="Author" title="Author" className="mr-3 ">
					<img
						src={imageURL}
						alt="avatar"
						className="object-cover w-20 h-20 rounded-full shadow-sm"
					/>
				</p>
			</div>
			<br />
			<p
				aria-label="Article"
				title={props.data.title}
				className="flex items-center justify-center mt-2 mb-2 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.title}
			</p>
			<div className="flex mb-1 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase h-10">
				<Carousel controls={false} indicators={false}>
					<Carousel.Item>
						<span className=" font-semiboldtext-deep-purple-accent-400">
							AUTHOR - {props.data.author}
						</span>
					</Carousel.Item>
					<Carousel.Item>
						<span className=" font-semiboldtext-deep-purple-accent-400">
							Published Report - {props.data.dateCreated.substring(0, 16)}
						</span>
					</Carousel.Item>
				</Carousel>
			</div>

			<div className="flex mt-2 space-x-4 md:mt-8 items-center justify-center">
				<Link to={newReportLink}>
					<div className="rounded-sm items-center py-2.5 px-16 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
						<button onClick={viewReport} type="submit">
							VIEW
						</button>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default ExploreCard;
