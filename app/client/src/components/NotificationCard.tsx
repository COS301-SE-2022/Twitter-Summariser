import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { useState } from "react";

function NotificationCard(props: any){
    
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    const optionsMenu = <div >
        <div onClick={toggling}>
            <BsThreeDotsVertical />
        </div>
        {isOpen && (
            <ul className="absolute bg-white shadow-lg text-sm w-36 p-5 space-y-3 ">
                <li className="flex flex-row ">
                    Mark as read
                </li>
                <li className="flex flex-row ">
                    <div>
                    <RiDeleteBinFill size={18} style={{fill: "#b91c1c"}}/>
                    </div>
                    <div>
                        &nbsp;Delete
                    </div>
        
                </li>
                
            </ul>
        )}
        
    </div>

    return (
        <div className="flex flex-row rounded space-x-5 px-5 py-2 flex items-stretch cursor-pointer hover:shadow-md"> 
            <div>
                <img
                    src="assets/profile.png"
                    alt="avatar"
                    className="object-cover w-9 h-9 rounded-full shadow-sm"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-bold">{props.username}</span> has shared a report.
                <span className="relative text-gray-400 text-xs bottom-0 right-0">3 hrs ago</span>
            </div>
            {optionsMenu}
        </div>
    );
}

export default NotificationCard;