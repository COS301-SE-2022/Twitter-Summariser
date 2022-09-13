// import { useStatse } from "react";
import FileUpload from "./FileUpload";

function TextSummariser() {
	// const [files, setFiles] = useState([{
	// 	"name": "File.pdf"
	// }]);

	return (
		<div className=" mt-3 pt-3 ">
			<div className=" mt-4">
				<div className="flex flex-row justify-around">
					<h1 className="text-3xl hidden lg:flex lg:flex-row lg:justify-center border-b pb-4 w-5/6 align-middle items-center border-slate-300">
						Text Summariser
					</h1>
				</div>
			</div>
			<div className="flex flex-col mt-6 px-4 bg-background font-poppins items-center min-h-screen">
				<p className="title">Upload File</p>
				<FileUpload/>
			</div> 
		</div>
	);
}

export default TextSummariser;
