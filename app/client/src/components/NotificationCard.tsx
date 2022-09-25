import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function NotificationCard(props: any) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const toggling = () => setIsOpen(!isOpen);
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();

	const imageURL =
		(props.data.senderUrl).startsWith("assets/")
			? props.data.senderUrl
			: `https://s3.amazonaws.com/twitter-summariser-images/${
					props.data.senderUrl
			  }?${new Date().getTime()}`;

	const description = () => {
		if (props.data.type === "SHARE") {
			return " has shared a report, ";
		}
		return "A newly generated report has landed, ";
	};

	const navigateToReports = () => {
		navigate(`/report/${props.data.content}`);
		props.onChangePage(true);
	};

	const timeDifference = () => {
		let tString;
		const diff = new Date().valueOf() - new Date(props.data.dateCreated).valueOf();
		const diffDays = Math.floor(diff / 86400000);
		const diffHrs = Math.floor((diff % 86400000) / 3600000);
		const diffMins = Math.floor(((diff % 86400000) % 3600000) / 60000);
		const diffSecs = Math.floor(diff / 1000);

		if (diffDays !== 0) {
			if (diffDays === 1) {
				tString = `${diffDays} day ago`;
			} else {
				tString = `${diffDays} days ago`;
			}
		} else if (diffHrs !== 0) {
			if (diffHrs === 1) {
				tString = `${diffHrs} hour ago`;
			} else {
				tString = `${diffHrs} hours ago`;
			}
		} else if (diffMins !== 0) {
			if (diffMins === 1) {
				tString = `${diffMins} minute ago`;
			} else {
				tString = `${diffMins} minutes ago`;
			}
		} else if (diffSecs === 1) {
			tString = `${diffSecs} second ago`;
		} else {
			tString = `${diffSecs} seconds ago`;
		}

		return tString;
	};

	const deleteNotificationHandler = async () => {
		try {
			await axiosPrivate.post(
				"deleteNotification",
				JSON.stringify({
					apiKey: auth.apiKey,
					id: props.data.id
				}),
				{ signal: controller.signal }
			);
			toggling();
			props.onChange(true);
		} catch (e) {
			console.error(e);
		}
	};

	const optionsMenu = (
		<div>
			<div onClick={toggling}>
				<BsThreeDotsVertical />
			</div>
			{isOpen && (
				<ul className="absolute right-5 bg-white shadow-lg text-sm w-36 p-3 md:p-5 space-y-3 ">
					<li className="flex flex-row ">
						<div onClick={deleteNotificationHandler}>
							<RiDeleteBinFill size={18} style={{ fill: "#b91c1c" }} />
						</div>
						<div onClick={deleteNotificationHandler}>&nbsp;Delete</div>
					</li>
				</ul>
			)}
		</div>
	);

	return (
		<div
			className="flex flex-row rounded space-x-5 px-3 py-3 items-center cursor-pointer hover:shadow-md"
			key={props.data.id}
			onClick={navigateToReports}
		>
			<div>
				<img
					src={imageURL}
					alt="avatar"
					className="object-cover w-12 h-17 rounded-full shadow-sm"
				/>
			</div>
			<div className="flex flex-col text-sm">
				<div className="inline">
					{props.data.type === "SHARE" && <b>{props.data.senderUsername}</b>}
					{description()} <b className="font-bold">{props.data.title}</b>
				</div>

				<div className="relative text-gray-400 text-xs bottom-0 right-0">
					{timeDifference()}
				</div>
			</div>
			{optionsMenu}
		</div>
	);
}

export default NotificationCard;
