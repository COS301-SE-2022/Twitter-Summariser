import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function SharedCard(props: any) {
	const navigate = useNavigate();

	const repID = props.data.reportID;
	const newReportLink = `/report/${repID}`;
	const imageURL =
		props.data.profileKey === "assets/profile.png"
			? props.data.profileKey
			: `https://s3.amazonaws.com/twitter-summariser-images/${
					props.data.profileKey
			  }?${new Date().getTime()}`;

	const viewReport = () => {
		navigate(newReportLink);
	};
	return (
		<div className="pt-4 pb-4 pl-10 pr-10 m-2 mt-2 bg-gradient-to-b from-blue-50 via-sky-100 border rounded-lg transform hover:shadow-md hover:scale-105 transition duration-200 ease-in hover:bg-blue-200">
			<div className=" mx-40 p-0 my-0"> </div>
			<div className="flex items-center justify-center">
				<p aria-label="Author" title="Author" className="mr-3 ">
					<img
						src={imageURL}
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

			<p
				aria-label="Article"
				title={props.data.title}
				className="flex items-center justify-center mt-2 mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.title}
			</p>
			<p className="flex mb-2 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase h-10">
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
			<div className="flex mt-3 space-x-3 items-center justify-center">
				<div className="items-center py-2 px-3 text-xs font-semibold text-center text-white bg-dark-cornflower-blue rounded-md  hover:bg-midnight-blue group hover:shadow">
					<button onClick={viewReport} type="submit">
						{" "}
						VIEW{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default SharedCard;
