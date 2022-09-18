// import {MdOutlineClose} from "react-icons/md";
// import { MdNotificationsActive } from "react-icons/md";
// import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import NotificationCard from "./NotificationCard";

// const notify = () => {
//     toast.custom( (t) => (
//         <div className="flex flex-row items-center justify-between w-96 bg-white px-4 py-10 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out">
//             <div className="text-xl">
//                 <img
//                     src="assets/profile.png"
//                     alt="avatar"
//                     className="object-cover w-12 h-12 rounded-full shadow-sm"
//                 />
//             </div>
//             <div className="flex flex-col items-start justify-center ml-4 cursor-default">
//                 <h1 className="text-base text-black font-semibold leading-none tracking-wider">This is a new notification</h1>
//                 <p className="text-sm text-gray-400 mt-2 leading-relaxed tracking-wider">Shado has shared a report with you.</p>
//             </div>
//             <div className="absolute top-2 right-2 cursor-pointer text-lg text-gray-400" onClick={() => toast.dismiss(t.id)}>
//                 <MdOutlineClose />
//             </div>
//         </div>

//     ),
//     {id: "unique-notifications", position: "top-center"})
// }

function Notifications() {

	const [notifications, changeNotifications] = useState<any[]>([]);
	const [shouldRender, changeShouldRender] = useState(false)
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();

	const getNotifications =async (isMounted: boolean) => {
		try {
			const response = await axiosPrivate.post(
				"getNotifications",
				JSON.stringify({apiKey: auth.apiKey}),
				{ signal: controller.signal}
			);
			console.log(response);
			isMounted && changeNotifications(response.data.notifications);
		
		} catch(e) {
			console.error(e);
		}
	}

	useEffect(() => {
		let isMounted = true;
		getNotifications(isMounted);

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, []);

	if (shouldRender === true) {
		const isMounted = true;
		getNotifications(isMounted);
		changeShouldRender(false);
	}


	return (
		<div className="fixed rounded space-y-4  bg-white shadow-md h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
			<h1 className="text-xl text-center font-bold">Notifications</h1>

			<div className="w-full flex flex-col ">
				{
					notifications.length === 0 ? (
						<div className="text-center">No notifications at the moment.</div>
					) : (
						notifications.map((notification) => (
							<NotificationCard 
								data={notification} 
								onChange= {(value: boolean) => changeShouldRender(value)}
							/>
						))
					)
					// <button type="submit" onClick={notify}>Not part of design</button>
				}
			</div>
		</div>
	);
}

export default Notifications;
