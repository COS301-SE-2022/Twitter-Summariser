import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BiErrorCircle } from "react-icons/bi";
import { Radio } from "@material-tailwind/react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import { axiosTextSummariser } from "../api/ConfigAxios";

function TextSummariser() {
	const controller = new AbortController();
	const [files, setFiles] = useState([]);
	const [isDone, setIsDone] = useState(false);
	const [extractedText, setExtractedText] = useState("");
	const [text, setText] = useState("");
	const [showSummary, setShowSummary] = useState(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [firstOption, setFirstOption] = useState(true);
	const [secondOption, setSecondOption] = useState(false);
	const [summary, setSummary] = useState("");
	const [error, setError] = useState("");
	const bStyle = { fontSize: "1.5rem", color: "red" };

	const removeFile = () => {
		setFiles([]);
		setIsDone(false);
	};

	const generateSummary = async (s: string) => {
		try {
			setShowSpinner(true);
			setFiles([]);
			setIsDone(false);

			const response = await axiosTextSummariser.post(
				"summarise",
				{
					text: s,
					min: 100,
					max: 200
				},
				{
					signal: controller.signal
				}
			);

			setSummary(response.data.text);
			setShowSpinner(false);
			setShowSummary(true);
		} catch (err) {
			setSummary("");
			setShowSpinner(false);
			setShowSummary(false);
			setError("Failed to generate summary");
			console.error(err);
		}
	};

	const isDoneLoading = () => {
		setIsDone(true);
	};

	const handleFirstOption = () => {
		console.log("first option");
		setFirstOption(true);
		setSecondOption(false);
	};

	const handleSecondOption = () => {
		console.log("second option");
		setExtractedText;
		setFirstOption(false);
		setSecondOption(true);
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
			<div className="flex mt-6 justify-center items-center space-x-4">
				<Radio
					id="doc"
					name="type"
					label="Upload Doc"
					defaultChecked
					ripple
					onClick={handleFirstOption}
				/>
				<Radio
					id="text"
					name="type"
					label="Upload Text"
					ripple
					onClick={handleSecondOption}
				/>
			</div>
			{firstOption && (
				<div className="flex flex-col ml-0 md:ml-12 md:relative fixed px-4 bg-background min-h-screen w-full md:w-10/12">
					<FileUpload
						files={files}
						setFiles={setFiles}
						removeFile={removeFile}
						isDoneLoading={isDoneLoading}
						setIsDone={setIsDone}
						setShowSummary={setShowSummary}
						setExtractedText={setExtractedText}
						setError={setError}
					/>
					{error && (
						<div className="border-2 border-red-500 rounded-md bg-red-300 p-2 h-auto mt-6 w-full inline-flex items-center text-center justify-center">
							<BiErrorCircle style={bStyle} className="fixed left-0 ml-8 mr-4" />
							<p className=" items-center justify-center"> {error} </p>
						</div>
					)}
					<FileList files={files} removeFile={removeFile} />
					{isDone && (
						<button
							type="submit"
							onClick={() => generateSummary(extractedText)}
							className="items-center py-3 mt-4 text-sm font-semibold text-center text-white bg-dark-cornflower-blue rounded-sm  hover:bg-midnight-blue group hover:shadow"
						>
							GENERATE SUMMARY
						</button>
					)}
				</div>
			)}
			{secondOption && (
				<form className="flex flex-col justify-between mt-1 w-full ml-0 md:ml-12 md:relative fixed px-4 bg-background md:w-10/12">
					<div className=" w-full">
						<label htmlFor="text" className="ml-4 text-sm font-medium text-primary">
							Enter the text to summarise:
						</label>
						<div className="mt-4 ml-4 mr-4 mb-2">
							<textarea
								rows={6}
								name="text"
								id="text"
								className="focus:outline-none border focus:ring-4 w-full focus:ring-active text-base p-4 rounded-md"
								onChange={(e) => setText(e.target.value)}
								value={text}
							/>
						</div>
					</div>
					<div className="flex justify-center space-x-4 items-center ml-4 mr-4">
						<button
							className="w-full rounded-sm px-1 py-3 bg-active text-center text-sm font-semibold text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow"
							type="submit"
							onClick={(e) => {
								generateSummary(text);
								e.preventDefault();
								e.stopPropagation();
								setError("");
							}}
						>
							<>SUMMARISE</>
						</button>
						<button
							className="w-full rounded-sm px-1 py-3 bg-active text-center text-sm font-semibold text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow"
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								setText("");
								setError("");
							}}
						>
							CLEAR
						</button>
					</div>
					{error && (
						<div className="border-2 border-red-500 rounded-md bg-red-300 flex py-2 mt-4 mr-4 ml-4">
							<BiErrorCircle style={bStyle} className=" left-0 ml-8" />
							<p className=" items-center justify-center"> {error} </p>
						</div>
					)}
				</form>
			)}
			{showSpinner && (
				<>
					<div className="w-full mt-16 justify-center flex flex-col top-50 items-center">
						<ClipLoader color="#023E8A" size={100} />
					</div>
					<strong className="items-center text-center justify-center w-full p-6">
						Generating Summary. Please be patient.
					</strong>
				</>
			)}
			{showSummary && (
				<div className="w-full mt-2">
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
	);
}

export default TextSummariser;
