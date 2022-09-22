import { useState, useContext, useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import NotificationCard from "./NotificationCard";
import { NotificationsContext } from "../context/NotificationsContext";

function MobileNotifications() {
	const { notifications, getNotifications } = useContext(NotificationsContext);

	const [isOpen, setIsOpen] = useState(false);
	const [shouldRender, changeShouldRender] = useState(false);
	const controller = new AbortController();

	const toggling = () => {
		console.log(isOpen);
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		let isMounted = true;
		getNotifications(isMounted);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	if (shouldRender === true) {
		const isMounted = true;
		getNotifications(isMounted);
		changeShouldRender(false);
	}

	const modal = () => (
		<div className="lg:hidden fixed flex items-center inset-0 justify-center bg-black/75">
			<div className="bg-white rounded max-w-sm  text-black">
				<div className="flex flex-row content-center justify-between  p-2.5 border-solid border-gray border-b-2">
					<h3 className=" text-lg text-center font-bold "> Notifications </h3>

					<button onClick={toggling} type="button" className="ml-28">
						<IoCloseOutline size={22} />
					</button>
				</div>
				<div className="p-2.5 ">
					{notifications.length === 0 ? (
						<div className="text-center">No notifications at the moment.</div>
					) : (
						notifications.map((notification: any) => (
							<NotificationCard
								data={notification}
								key={notification.id}
								onChange={(value: boolean) => changeShouldRender(value)}
								onChangePage={(value: boolean) => {
									if (value) {
										toggling();
									}
								}}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<div
				className="fixed flex w-16 h-16 lg:hidden rounded-full bg-midnight-blue justify-center items-center  bottom-8 right-8 cursor-pointer"
				onClick={toggling}
			>
				{/* <span style={{visibility: unRead ? "visible" : "hidden"}} className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"/> */}
				<BsFillBellFill
					style={{ fill: "white", transform: isOpen ? "rotate(45deg)" : "none" }}
				/>
			</div>

			{isOpen && modal()}
		</div>
	);
}

export default MobileNotifications;
