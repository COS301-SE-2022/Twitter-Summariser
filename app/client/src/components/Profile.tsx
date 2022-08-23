import "./styles/Profile.css";
// import { AxiosError } from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Profile() {
	const { auth } = useAuth();

	const userInformation = {
		apiKey: auth.apiKey,
		author: auth.username,
		email: auth.email
	};

	const [displayPublished, setDisplayPublished] = useState(true);
	const [displayDraft, setDisplayDraft] = useState(false);

	function displayHandler() {
		setDisplayPublished(!displayPublished);
		setDisplayDraft(!displayDraft);

		console.log("Published is ");
		console.log(displayPublished);
		console.log("Draft is ");
		console.log(displayDraft);
	}

	return (
		<div data-testid="profile">
			<div className="flex flex-col items-center mt-3 p-3">
				{/* div for the image */}
				<div className="h-40 w-1/3 flex flex-col justify-center items-center mt-8 my-3">
					<img
						className="profile"
						src="assets/profile.png"
						alt="Twitter Summariser Logo"
						width="160px"
						height="160px"
					/>
				</div>
				{/* div for name, emails, number of reports published, share icon etc */}
				<div className="h-20 w-2/3 text-center flex flex-col">
					<div className=" text-3xl font-bold">{userInformation.author}</div>
					<div className=" italic">{userInformation.email}</div>
				</div>
				<div className="flex flex-row">
					<button type="submit" onClick={displayHandler}>
						<div className=" border-r border-slate-500 bg-sky-200 p-2 rounded-md">
							&nbsp;Published&nbsp;
						</div>
					</button>
					&nbsp;
					<button type="submit" onClick={displayHandler}>
						<div className=" border-l border-slate-500 p-2 rounded-md">
							&nbsp;Drafts&nbsp;
						</div>
					</button>
				</div>
				<div className=" border-t border-slate-500 w-36 my-4" />

				{displayPublished && <div className="">Published should be displayed here</div>}

				{displayDraft && <div className="">Draft should be displayed here</div>}
			</div>
		</div>
	);
}

export default Profile;
