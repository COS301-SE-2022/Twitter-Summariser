import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import links from "../resources/links.json";

const URL = process.env.NODE_ENV === "development" ? links.teLocalhostLink : links.teSeverLink;

function FileUpload(this: any, props: any) {
	const uploadHandler = async (event: any) => {
		props.setFiles([...props.files, event.target.files[0]]);
		props.setIsDone(false);
		props.setShowSummary(false);
		props.setError("");

		const file = event.target.files[0];
		if (file !== undefined) {
			file.isUploading = true;

			if (file.type === "application/pdf") {
				const formData = new FormData();
				formData.append("pdfFile", event.target.files[0]);

				fetch(URL, {
					method: "POST",
					body: formData
				})
					.then((response) => response.text())
					.then((text) => {
						props.setExtractedText(text);
						props.isDoneLoading();
						file.isUploading = false;
					});
			} else if (file.type === "text/plain") {
				const reader = new FileReader();
				reader.readAsText(file);
				reader.onload = () => {
					props.setExtractedText(reader.result as string);
					props.isDoneLoading();
					file.isUploading = false;
				};
			} else if (
				file.type ===
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			) {
				props.setExtractedText("Still to be implemented");
				props.isDoneLoading();
				file.isUploading = false;
			} else {
				props.setError(
					"File type not supported. Please re-upload a .pdf, .txt or .docx file"
				);
				props.setFiles([]);
				file.isUploading = false;
			}
		}
	};

	const clickHandler = (event: any) => {
		event.target.value = null;
	};

	const uploadFiles = () => {
		document.getElementById("selectedFile")?.click();
	};

	return (
		<div className="file-card bg-[#edf2f7] border mt-4 p-4 w-full flex items-center justify-between flex-col overflow-hidden">
			<div className="file-inputs relative mb-4">
				<input
					type="file"
					id="selectedFile"
					className="max-w-48 h-14 z-0 top-10  opacity-0 cursor-pointer"
					accept=".pdf, .txt, .docx"
					style={{ display: "none" }}
					onChange={uploadHandler.bind(this)}
					onClick={clickHandler.bind(this)}
				/>
				<button
					type="submit"
					onClick={uploadFiles.bind(this)}
					className="items-center cursor-pointer justify-center flex h-12 w-48 md:w-64 text-sm font-semibold text-center text-white bg-dark-cornflower-blue rounded-md  hover:bg-midnight-blue group hover:shadow"
				>
					<i className="w-6 h-6 bg-white text-dark-cornflower-blue rounded-full flex justify-center items-center mr-2">
						<FontAwesomeIcon icon={faPlus} />
					</i>
					Upload File
				</button>
			</div>
			<strong className="mt-6">Supported Files:</strong>
			<p>*.txt *.docx *.pdf</p>
		</div>
	);
}

export default FileUpload;
