import { useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

function TextSummariser() {
	const [files, setFiles] = useState([]);
	const [isDone, setIsDone] = useState(false);

	const removeFile = () => {
		setFiles([]);
		setIsDone(false)
	};

	const isDoneLoading = () => {
		setTimeout(() => {
			setIsDone(true);
		}, 2000)
		
	}

	return (
		<div className=" mt-3 pt-3 ">
			<div className=" mt-4">
				<div className="flex flex-row justify-around">
					<h1 className="text-3xl hidden lg:flex lg:flex-row lg:justify-center border-b pb-4 w-5/6 align-middle items-center border-slate-300">
						Text Summariser
					</h1>
				</div>
			</div>
			<div className="flex flex-col ml-0 md:ml-12 mt-6 px-4 bg-background min-h-screen w-full md:w-10/12">
				<FileUpload files={files} setFiles={setFiles} removeFile={removeFile} isDoneLoading={isDoneLoading} setIsDone={setIsDone} />
				<FileList files={files} removeFile={removeFile} />
				{isDone && (
					<button type="submit" className="items-center py-3 mt-6 text-sm font-semibold text-center text-white bg-dark-cornflower-blue rounded-sm  hover:bg-midnight-blue group hover:shadow">GENERATE SUMMARY</button>
				)}
			</div> 
		</div>
	);
}

export default TextSummariser;
