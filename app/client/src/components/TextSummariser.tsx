import { useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

function TextSummariser() {
	const [files, setFiles] = useState([]);

	const removeFile = () => {
		setFiles([]);
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
			<div className="flex flex-col mt-6 px-4 bg-background min-h-screen w-full">
				<FileUpload files={files} setFiles={setFiles} removeFile={removeFile}/>
				<FileList files={files} removeFile={removeFile}/>
			</div> 
		</div>
	);
}

export default TextSummariser;
