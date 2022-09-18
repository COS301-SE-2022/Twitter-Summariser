import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function NotificationCard(props: any) {
	const [isOpen, setIsOpen] = useState(false);
	const toggling = () => setIsOpen(!isOpen);
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();

	const description = () => {
		if (props.data.type === "SHARE") {
			return "has shared a report, ";
		
		} 
			return "You have a new scheduled report, ";

	}

	const timeDifference = () => {
		let tString;
		const diff = (new Date().valueOf() - new Date(props.data.dateCreated).valueOf());
		const diffDays = Math.floor(diff / 86400000);
		const diffHrs = Math.floor((diff % 86400000) / 3600000);
		const diffMins = Math.floor(((diff % 86400000) %3600000) / 60000);
		const diffSecs = diff / 1000;

		if (diffDays !== 0) {
			tString = `${diffDays} days ago`;
		} else if (diffHrs !==0) {
			tString = `${diffHrs} hours ago`;
		} else if (diffMins !== 0) {
			tString = `${diffMins} minutes ago`;
		} else {
			tString = `${diffSecs} seconds ago`;
		}
		return tString;
	}

	const deleteNotificationHandler =async () => {
		try {
			await axiosPrivate.post(
				"deleteNotification",
				JSON.stringify(
					{
						apiKey: auth.apiKey,
						id: props.data.id
					}
				),
				{ signal: controller.signal }
			);
			props.onChange(true);
		} catch(e) {
			console.error(e);
		}
	}

	const optionsMenu = (
		<div>
			<div onClick={toggling}>
				<BsThreeDotsVertical />
			</div>
			{isOpen && (
				<ul className="absolute bg-white shadow-lg text-sm w-36 p-5 space-y-3 ">
					<li className="flex flex-row ">Mark as read</li>
					<li onClick={deleteNotificationHandler} className="flex flex-row " >
						<div>
							<RiDeleteBinFill size={18} style={{ fill: "#b91c1c" }} />
						</div>
						<div>&nbsp;Delete</div>
					</li>
				</ul>
			)}
		</div>
	);



	return (
		<div className="flex flex-row rounded space-x-5 px-5 py-2 flex items-stretch cursor-pointer hover:shadow-md">
			<div>
				<img
					src={props.data.senderUrl}
					alt="avatar"
					className="object-cover w-12 h-17 rounded-full shadow-sm"
				/>
			</div>
			<div className="flex flex-col text-sm">
				<div className="inline">
					<b>{props.data.senderUsername}</b> {description()} <b className="font-bold">{props.data.content}</b>
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
