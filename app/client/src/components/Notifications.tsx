import { useEffect, useState, useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";
import NotificationCard from "./NotificationCard";

function Notifications() {
	const { notifications, getNotifications } = useContext(NotificationsContext);
	const [shouldRender, changeShouldRender] = useState(false);
	const controller = new AbortController();

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

	return (
		<div className="fixed rounded space-y-4  bg-white shadow-md h-2/3 ml-8 p-3 2xl:w-80 xl:w-64 ">
			<h1 className="text-xl text-center font-bold border-solid border-gray border-b-2">
				Notifications
			</h1>

			<div className="w-full flex flex-col ">
				{notifications.length === 0 ? (
					<div className="text-center">No notifications at the moment.</div>
				) : (
					notifications.map((notification: any) => (
						<NotificationCard
							data={notification}
							key={notification.id}
							onChange={(value: boolean) => changeShouldRender(value)}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default Notifications;
