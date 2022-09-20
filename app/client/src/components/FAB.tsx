import { useState } from "react";
import { BsFillBellFill } from "react-icons/bs";


function FAB() {
    const [isOpen, setIsOpen] = useState(false);
	const toggling = () => {
        console.log(isOpen);
        setIsOpen(!isOpen); 
    }
     

    return (
        <div onClick={toggling}  className="fixed flex z-90  w-16 h-16 rounded-full bg-black justify-center items-center  bottom-8 right-8 hover:cursor">
			<div >
                <BsFillBellFill style={{ fill: "white" }} />
            </div>
            
			
			{isOpen && (
				<div className="absolute text-sm bottom-20 w-36 h-48 max-h-full md:max-h-screen sm:max-h-screen  space-y-3">
					Hello there
				</div>
			)}
		</div>
    );
}

export default FAB;