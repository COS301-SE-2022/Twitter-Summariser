import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function FileUpload() {

    // const uploadHandler = () => {
    //     console.log("Upload Handler");
    // }

  return (
    <div className='file-card'>
        <div className='file-inputs'>
            <input type='file' />
            <button type='submit'>
                <i>
                    Hello
                </i>
            </button>
        </div>
    </div>
  )
}

export default FileUpload