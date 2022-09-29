import { createContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

export const NotificationsContext = createContext<any>({});

function NotificationsProvider({ children }: any) {
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();

	const [notifications, setNotifications] = useState<any[]>([]);

	const getNotifications = async (isMounted: boolean) => {
		try {
			const response = await axiosPrivate.post(
				"getNotifications",
				JSON.stringify({ apiKey: auth.apiKey }),
				{ signal: controller.signal }
			);

			isMounted && setNotifications(response.data.notifications);
		} catch (e) {
			console.error(e);
		}
	};

	const addNotifications = async (notification: any) => {
		setNotifications(notification);
	};

	const removeNotification = async (id: any) => {
		notifications.forEach((notification: any, index) => {
			if (notification.id === id) {
				notifications.splice(index, 1);
			}
		});

		setNotifications(notifications);
	};

	return (
		<NotificationsContext.Provider
			value={{ notifications, getNotifications, addNotifications, removeNotification }}
		>
			{children}
		</NotificationsContext.Provider>
	);
}

export default NotificationsProvider;
