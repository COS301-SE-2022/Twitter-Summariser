import { useState } from "react";
import { axiosPublic } from "../api/ConfigAxios";

function TextSummariser() {
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState("");

	const getResponse = async () => {
		try {
			setLoading(true);
			const res = await axiosPublic.post('summarise', {
				text,
				min: 100,
				max: 200
			});
			setResponse(res.data.text);
			setLoading(false);
		} catch (error) {
			setText("Something went wrong. Could not summarise text.");
			setLoading(false);
		}
	};

	return (
		<div className=" mt-3 pt-3 ">
			<div className=" mt-4">
				<div className="flex flex-row justify-around">
					<h1 className="text-3xl hidden lg:flex lg:flex-row lg:justify-center border-b pb-4 w-5/6 align-middle items-center border-slate-300">
						Text Summariser
					</h1>
				</div>
			</div>
			<div className="flex flex-col px-4 bg-background font-poppins items-center min-h-screen">
				<h2 className="text-primary text-md font-bold mb-6 mt-6">
					Summarise text into shorter length.
				</h2>
				<form
					className="flex flex-col justify-between mt-4 w-full"
				>
					<div className=" w-full">
						<label htmlFor="text" className=" text-sm font-medium text-primary">
							Enter the text to summarise:
						</label>
						<div className="mt-2">
							<textarea
								rows={14}
								name="text"
								id="text"
								className="focus:outline-none border focus:ring-4 w-full focus:ring-active text-base p-4 rounded-md"
								onChange={(e) => setText(e.target.value)}
								value={text}
							/>
						</div>
					</div>
					<div className="flex justify-center space-x-2 items-center ml-0 mr-0 mt-4">
						<button
							className="w-full rounded-lg px-2 py-3 bg-active text-center text-sm font-semibold text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow"
							type="submit"
							onClick={(e) => {
								getResponse();
								e.preventDefault();
								e.stopPropagation();
							}}
						>
							{loading ? (
							<span className="animate-pulse">Loading..</span>
						) : (
							<>SUMMARISE TEXT</>
						)}
						</button>
						<button
							className="w-full rounded-lg px-2 py-3 bg-active text-center text-sm font-semibold text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow"
							type="submit"
							onClick={(e) => {e.preventDefault(); setText("")}}
						>
							CLEAR TEXT
						</button>
					</div>
					<div className="mt-4 w-full">
						<label htmlFor="summary" className=" text-sm font-medium text-primary">
							Summarised Text:
						</label>
						<div className="mt-2 mb-8">
							<textarea
								readOnly
								rows={14}
								name="summary"
								id="summary"
								className="focus:outline-none focus:ring-4 border w-full focus:ring-active text-base p-4 rounded-md"
								value={response}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default TextSummariser;
