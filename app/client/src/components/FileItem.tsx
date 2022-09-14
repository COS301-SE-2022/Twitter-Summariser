import { faFileAlt, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/FileItem.css";

function FileItem(props: any) {
	const deleteFile = () => {
		props.deleteFile();
	};

	return (
		<li className="bg-[#0054BE] items-center rounded-sm flex p-3 mt-4" key={props.file.name}>
			<FontAwesomeIcon icon={faFileAlt} />
			<p className="truncate md:w-full sm:w-3 text-white font-medium"> {props.file.name} </p>
			<div className="actions ml-6 md:ml-0">
				{props.file.isUploading && (
					<FontAwesomeIcon icon={faSpinner} className="fa-spinner text-white" />
				)}
				{!props.file.isUploading && (
					<FontAwesomeIcon
						icon={faTrash}
						className="fa-trash text-white"
						onClick={deleteFile}
					/>
				)}
			</div>
		</li>
	);
}

export default FileItem;
