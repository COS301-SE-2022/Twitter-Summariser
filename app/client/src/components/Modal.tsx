import React from "react";

function Modal({ setModalOn, setChoice }: any) {
	const handleOKClick = () => {
		setChoice(true);
		setModalOn(false);
		console.log("setModal false");
	};
	const handleCancelClick = () => {
		setChoice(false);
		setModalOn(false);
	};

	return (
		<div className="flex justify-center items-center z-54 px-5">
			<div className="bg-zinc-200 opacity-90 fixed inset-0" />
			<div className="flex justify-center items-center inset-0 fixed">
				<div className="bg-white border-4 opacity-100 border-sky-500 rounded-xl ">
					<div className="flex-col justify-center   py-12 px-24 ">
						<div className="flex  text-lg  text-zinc-600   mb-10">Are you sure ?</div>
						<div className="flex">
							<button
								type="submit"
								onClick={handleOKClick}
								className=" rounded px-4 py-2 text-white  bg-green-400 "
							>
								Yes
							</button>
							<button
								type="submit"
								onClick={handleCancelClick}
								className="rounded px-4 py-2 ml-4 text-white bg-blue-500 "
							>
								No
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
