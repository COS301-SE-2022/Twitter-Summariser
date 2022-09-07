import { useNavigate } from "react-router-dom";

function SharedCard(props: any) {
	const navigate = useNavigate();

	const repID = props.data.reportID;
	const newReportLink = `/report/${repID}`;
	const imageURL = props.data.profileKey === "assets/profile.png" ? props.data.profileKey : `https://s3.amazonaws.com/twitter-summariser-images/${props.data.profileKey}`;

	const viewReport = () => {
		navigate(newReportLink);
	};
	return (
		<div className="pt-8 pb-8 pr-2 pl-2 mt-3 mr-1 ml-1 bg-white border rounded-lg transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
			<div className="flex items-center justify-center">
				<p aria-label="Author" title="Author" className="mr-3 ">
					<img
						src={imageURL}
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
			</div>
			<br />

			<p
				aria-label="Article"
				title="Jingle Bells"
				className="flex items-center justify-center mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
			>
				{props.data.title}
			</p>
			<p className="flex mb-3 text-gray-600 text-xs items-center justify-center font-semibold tracking-wide uppercase">
				<span className=" font-semiboldtext-deep-purple-accent-400">
					Published Report - {props.data.dateCreated.substring(0, 16)}
				</span>
			</p>
			<div className="flex mt-8 space-x-4 md:mt-8 items-center justify-center">
				<div className="rounded-sm items-center py-2.5 px-16 text-sm font-semibold text-center text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow">
					<button onClick={viewReport} type="submit">
						{" "}
						VIEW REPORT{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default SharedCard;
