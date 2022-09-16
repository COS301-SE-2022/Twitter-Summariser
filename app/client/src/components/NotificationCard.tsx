

function NotificationCard(props: any){

    return (
        <div className="rounded space-x-5 px-5 py-2 flex items-stretch cursor-pointer"> 
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
            {/* <div className="flex text-xs bottom-0 right-0">3 hrs ago</div> */}
            
        </div>
    );
}

export default NotificationCard;