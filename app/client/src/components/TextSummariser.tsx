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
	const [firstFlowControl, setFirstFlowControl] = useState(false);
	const [secondFlowControl, setSecondFlowControl] = useState(false);
	const [summary, setSummary] = useState("");
	const [error, setError] = useState("");
	const bStyle = { fontSize: "1.5rem", color: "red" };

	const removeFile = () => {
		setFiles([]);
		setIsDone(false);
	};

	const generateSummary = async (s: string, option: string) => {
		if (option === "first") {
			setFirstFlowControl(true);
			setSecondFlowControl(false);
		} else {
			setFirstFlowControl(false);
			setSecondFlowControl(true);
		}

		try {
			setShowSpinner(true);
			setShowSummary(false);
			setFiles([]);
			setIsDone(false);

			const response = await axiosTextSummariser.post(
				"summarise",
				{ text: s, min: 100, max: 200 },
				{ signal: controller.signal }
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
		setFirstOption(true);
		setSecondOption(false);
	};

	const handleSecondOption = () => {
		setFirstOption(false);
		setSecondOption(true);
	};

	return (
		<div data-testid="summariser" className=" mt-3 pt-3 ">
			<div className=" mt-4">
				<div className="flex flex-row justify-around">
					<h1 className="text-3xl hidden lg:flex lg:flex-row lg:justify-center border-b pb-4 w-5/6 align-middle items-center border-slate-300">
						Text Summariser
					</h1>
				</div>
			</div>
			<div className="flex justify-center items-center space-x-4 mr-4">
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
				<div className="flex flex-col ml-0 md:ml-12 md:relative px-4 bg-background w-full md:w-10/12">
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
					{error && firstFlowControl && (
						<div className="border-2 border-red-500 rounded-md bg-red-300 p-2 h-auto mt-6 w-full inline-flex items-center text-center justify-center">
							<BiErrorCircle style={bStyle} className="fixed left-0 ml-8 mr-4" />
							<p className=" items-center justify-center"> {error} </p>
						</div>
					)}
					<FileList files={files} removeFile={removeFile} />
					{isDone && (
						<button
							type="submit"
							onClick={() => generateSummary(extractedText, "first")}
							className="items-center py-2.5 mt-3 text-sm font-semibold text-center text-white bg-dark-cornflower-blue rounded-sm  hover:bg-midnight-blue group hover:shadow"
						>
							GENERATE SUMMARY
						</button>
					)}
					{showSpinner && firstFlowControl && (
						<>
							<div className="w-full mt-10 justify-center flex flex-col top-50 items-center">
								<ClipLoader color="#023E8A" size={100} />
							</div>
							<strong className="items-center text-center justify-center w-full p-6">
								Generating Summary. Please be patient.
							</strong>
						</>
					)}
					{showSummary && firstFlowControl && (
						<div className="w-full mt-3">
							<label
								htmlFor="summary"
								className=" text-sm items-center justify-center text-center font-bold"
							>
								<p className="text-center items-center justify-center">
									Summarised Text:
								</p>
							</label>
							<div className="mt-3">
								<textarea
									readOnly
									rows={11}
									name="summary"
									id="summary"
									className="focus:outline-none focus:ring-4 border-2 border-gray-300 w-full focus:ring-active text-base p-4 rounded-md"
									value={summary}
								/>
							</div>
						</div>
					)}
				</div>
			)}
			{secondOption && (
				<form className="flex flex-col justify-between w-full ml-0 md:ml-12 md:relative  px-4 bg-background md:w-10/12">
					<div className=" w-full">
						<label htmlFor="text" className="text-sm font-bold">
							Enter the text to summarise:
						</label>
						<div className="mt-1 mb-2">
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
					<div className="flex justify-center space-x-6 items-center">
						<button
							className="w-full rounded-sm px-1 py-2.5 bg-active text-center text-sm font-fold text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow"
							type="submit"
							onClick={(e) => {
								generateSummary(text, "second");
								e.preventDefault();
								e.stopPropagation();
								setError("");
							}}
						>
							<>Summarise</>
						</button>
						<button
							className="w-full rounded-sm px-1 py-2.5 bg-active text-center text-sm font-semibold text-white bg-dark-cornflower-blue  hover:bg-midnight-blue group hover:shadow"
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								setText("");
								setError("");
							}}
						>
							Clear
						</button>
					</div>
					{error && secondFlowControl && (
						<div className="border-2 border-red-500 rounded-md bg-red-300 flex py-2 mt-4">
							<BiErrorCircle style={bStyle} className="ml-4" />
							<p className=" items-center justify-center"> {error} </p>
						</div>
					)}
					{secondFlowControl && showSpinner && (
						<>
							<div className="w-full mt-10 justify-center flex flex-col top-50 items-center">
								<ClipLoader color="#023E8A" size={100} />
							</div>
							<strong className="items-center text-center justify-center w-full p-6">
								Generating Summary. Please be patient.
							</strong>
						</>
					)}
					{showSummary && secondFlowControl && (
						<div className="w-full mt-3">
							<label
								htmlFor="summary"
								className=" text-sm items-center justify-center text-center font-bold"
							>
								<p className="text-center items-center justify-center">
									Summarised Text:
								</p>
							</label>
							<div className="mt-2">
								<textarea
									readOnly
									rows={8}
									name="summary"
									id="summary"
									className="focus:outline-none focus:ring-4 border-2 border-gray-300 w-full focus:ring-active text-base p-4 rounded-md"
									value={summary}
								/>
							</div>
						</div>
					)}
				</form>
			)}
		</div>
	);
}

export default TextSummariser;
