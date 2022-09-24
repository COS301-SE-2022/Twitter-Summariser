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
		<div className="lg:hidden fixed flex flex-row justify-end bottom-4 w-full right-2 z-50">
			<button
				type="button"
				onClick={toggling}
				className="opacity-100 inline-flex items-center p-3 rounded-full shadow-sm text-white bg-midnight-blue transition-opacity hover:bg-blue-800 focus:outline-none focus:ring-offset-2 focus:ring-blue-500"
			>
				<BsFillBellFill className="h-6 w-6" aria-hidden="true" />
			</button>

			{isOpen && modal()}
		</div>
	);
}

export default MobileNotifications;
