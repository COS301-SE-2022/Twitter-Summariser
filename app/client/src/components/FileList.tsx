import FileItem from "./FileItem";

function FileList(props: any) {
	const deleteFileHandler = () => {
		props.removeFile();
	};

	return (
		<ul className="ml-0 mt-2">
			{props.files &&
				props.files.map((f: any) => (
					<FileItem file={f} key={f} deleteFile={deleteFileHandler} />
				))}
		</ul>
	);
}

export default FileList;
