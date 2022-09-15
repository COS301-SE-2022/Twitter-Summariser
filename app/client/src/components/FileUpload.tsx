import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function FileUpload(props: any) {
	const uploadHandler = (event: any) => {
		props.setIsDone(false);
		props.setShowSummary(false);

		const file = event.target.files[0];
		if (file !== undefined) {
			file.isUploading = true;
			props.setFiles([file]);

			setTimeout(() => {
				file.isUploading = false;
				props.setFiles([file]);
			}, 2000);

			props.isDoneLoading();
		}
	};

	return (
		<div className="file-card bg-[#edf2f7] border mt-4 p-4 w-full flex items-center justify-between flex-col overflow-hidden">
			<div className="file-inputs relative mb-4">
				<input
					type="file"
					className="relative max-w-48 h-12 z-30 opacity-0 cursor-pointer"
					accept=".txt, .docx, .pdf"
					onChange={uploadHandler}
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