import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./styles/FileItem.css";

function FileItem(props: any) {

    const deleteFile = () => {
        props.deleteFile();
    }


    return (
        <li 
            className="bg-[#0054BE] items-center rounded-sm flex p-4 mt-4"
            key={props.file.name}
        >
            <FontAwesomeIcon icon={faFileAlt}/>
            <p> {props.file.name} </p>
            <div className='actions'>
                {props.file.isUploading && 
                    <FontAwesomeIcon icon={faSpinner} className='fa-spinner'/>
                }
                {!props.file.isUploading && 
                    <FontAwesomeIcon icon={faTrash} className='fa-trash' onClick={deleteFile}/>
                }
            </div>
        </li>
    )
}

export default FileItem