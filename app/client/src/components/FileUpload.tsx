import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import links from "../resources/links.json";

const URL = process.env.NODE_ENV === "development" ? links.teLocalhostLink : links.teSeverLink;

function FileUpload(props: any) {

	const uploadHandler = async (event: any) => {
		props.setFiles([...props.files, event.target.files[0]]);
		props.setIsDone(false);
		props.setShowSummary(false);

		const file = event.target.files[0];
		if (file !== undefined) {
			file.isUploading = true;

			if (file.type === "application/pdf") {
				const formData = new FormData();
				formData.append("pdfFile", event.target.files[0]);

				fetch(URL, {
					method: "POST",
					body: formData,
				}).then((response) => response.text()).then((text) => {
					props.setExtractedText(text);
					props.isDoneLoading();
					file.isUploading = false;
				});
			}

			else if (file.type === "text/plain") {
				const reader = new FileReader();
				reader.readAsText(file);
				reader.onload = () => {
					props.setExtractedText(reader.result as string);
					props.isDoneLoading();
					file.isUploading = false;
				};
			}
			console.log(file.type);
			
		}
	};

	return (
		<div className="file-card bg-[#edf2f7] border mt-4 p-4 w-full flex items-center justify-between flex-col overflow-hidden">
			<div className="file-inputs relative mb-4">
				<input
					type="file"
					className="relative max-w-48 h-12 z-30 opacity-0 cursor-pointer"
					accept=".txt, .docx, .pdf"
					onChange={(event: any) => uploadHandler(event)}
				/>
				<button
					type="submit"
					className="absolute mt-5 top-0 left-0 w-10/12 h-full ml-6 z-10 cursor-pointer rounded-md outline-none flex justify-center items-center text-white bg-dark-cornflower-blue hover:bg-midnight-blue group hover:shadow transition-colors"
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
