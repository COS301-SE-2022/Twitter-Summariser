import { useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import NotificationCard from "./NotificationCard";


function FAB() {
    const [isOpen, setIsOpen] = useState(false);
	const toggling = () => {
        console.log(isOpen);
        setIsOpen(!isOpen); 
    }
    
    const mock = {
        type: "SHARE",
        dateCreated: (new Date()).toString(),
        senderUsername: "tlholo",
        senderUrl: "assets/profile.png",
        content: "Queen Elizabeth"
    }

    const modal = (
        <div className="fixed flex items-center inset-0 justify-center bg-black/75">
            <div className="bg-white rounded max-w-sm  text-black"> 
                <div className="flex flex-row content-center p-2.5">
                    <h3 className=" text-lg text-center font-bold"> Notifications </h3>
                    <button onClick={toggling} type="button" className="absolute right-8">
                        <IoCloseOutline size={22}  />
                    </button>
                </div>
                <div className="p-2.5 ">
                    <NotificationCard
                        data = {mock}
                    />
                    <NotificationCard
                        data = {mock}
                    />
                    <NotificationCard
                        data = {mock}
                    />
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
				modal
			)}
		</div>
    );
}

export default FAB;