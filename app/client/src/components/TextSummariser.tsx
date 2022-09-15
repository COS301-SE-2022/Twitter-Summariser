import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FileUpload from "./FileUpload";
import FileList from "./FileList";


function TextSummariser() {
	const [files, setFiles] = useState([]);
	const [isDone, setIsDone] = useState(false);
	const [extractedText, setExtractedText] = useState("");
	const [showSummary, setShowSummary] = useState(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [summary, setSummary] = useState("");

	const removeFile = () => {
		setFiles([]);
		setIsDone(false);
	};

	const generateSummary = () => {
		setShowSpinner(true);
		setFiles([]);
		setIsDone(false)

		
		setTimeout(() => {
			setSummary(extractedText);
			setShowSpinner(false);
			setShowSummary(true);
		}, 5000);
		
	};

	const isDoneLoading = () => {
		setIsDone(true);
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
			<div className="flex flex-col ml-0 md:ml-12 mt-4 md:relative fixed px-4 bg-background min-h-screen w-full md:w-10/12">
				<FileUpload
					files={files}
					setFiles={setFiles}
					removeFile={removeFile}
					isDoneLoading={isDoneLoading}
					setIsDone={setIsDone}
					setShowSummary={setShowSummary}
					setExtractedText={setExtractedText}
				/>
				<FileList files={files} removeFile={removeFile} />
				{isDone && (
					<button
						type="submit"
						onClick={generateSummary}
						className="items-center py-3 mt-4 text-sm font-semibold text-center text-white bg-dark-cornflower-blue rounded-sm  hover:bg-midnight-blue group hover:shadow"
					>
						GENERATE SUMMARY
					</button>
				)}
				{showSpinner && (
					<>
					<div className="w-full mt-16 justify-center flex flex-col top-50 items-center">
						<ClipLoader color="#023E8A" size={100} />
					</div>	
					<strong className="items-center text-center justify-center w-full p-6">Generating Summary. Please be patient.</strong>
					</>
					
					
				)}
				{showSummary && (
					<div className="w-full mt-5">
						<label htmlFor="summary" className=" text-sm font-medium text-primary mb-2">
							<p className="text-center items-center justify-center">Summarised Text:</p>
						</label>
						<div className="mt-5">
							<textarea
								readOnly
								rows={14}
								name="summary"
								id="summary"
								className="focus:outline-none focus:ring-4 border-2 border-gray-300 w-full focus:ring-active text-base p-4 rounded-md"
								value={summary}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default TextSummariser;
