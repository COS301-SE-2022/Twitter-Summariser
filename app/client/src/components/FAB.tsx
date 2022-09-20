import { useState, useContext} from "react";
import { BsFillBellFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import NotificationCard from "./NotificationCard";
import { NotificationsContext } from "../context/NotificationsContext";


function FAB() {
    const { notifications} = useContext(NotificationsContext);

    const [isOpen, setIsOpen] = useState(false);
	const toggling = () => {
        console.log(isOpen);
        setIsOpen(!isOpen); 
    }

    const modal = () => (
            <div className="lg:hidden fixed flex items-center inset-0 justify-center bg-black/75">
                <div className="bg-white rounded max-w-sm  text-black"> 
                    <div className="flex flex-row content-center  p-2.5">
                        <h3 className=" text-lg text-center font-bold"> Notifications </h3>
                        
                        <button onClick={toggling} type="button" className="ml-28">
                            <IoCloseOutline size={22}  />
                        </button>
                    </div>
                    <div className="p-2.5 ">
                    {
                        notifications.length === 0 ? (
                            <div className="text-center">No notifications at the moment.</div>
                        ) : (
                            notifications.map((notification: any) => (
                                <NotificationCard 
                                    data={notification}
                                />
                            ))
                        )
                        
                    }
                    </div>
                </div>
            </div>
        );
    

    return (
        <div>
			<div className="fixed flex w-16 h-16 lg:hidden rounded-full bg-midnight-blue justify-center items-center  bottom-8 right-8" onClick={toggling}>
                <BsFillBellFill style={{ fill: "white", transform: isOpen ? "rotate(45deg)" : "none"}} />
            </div>
			
			{isOpen && (
				modal()
			)}
		</div>
    );
}

export default FAB;