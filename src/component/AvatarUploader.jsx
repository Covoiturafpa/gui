import React from 'react';
import ReactDOM from 'react-dom';

import { Uploader, Message, Loader, useToaster } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { FiCamera } from "react-icons/fi";


function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const AvatarUploader = () => {
    const toaster = useToaster();
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState(null);

    return (
        <Uploader
            fileListVisible={false}
            listType="picture"
            action="//jsonplaceholder.typicode.com/posts/"
            onUpload={file => {
                setUploading(true);
                previewFile(file.blobFile, value => {
                    setFileInfo(value);
                });
            }}
            onSuccess={(response, file) => {
                setUploading(false);
                toaster.push(<Message type="success">Uploaded successfully</Message>);
                console.log(response);
            }}
            onError={() => {
                setFileInfo(null);
                setUploading(false);
                toaster.push(<Message type="error">Upload failed</Message>);
            }}
        >
            <button style={{ width: 150, height: 150 }} >
                {uploading && <Loader backdrop center />}
                {fileInfo ? (
                    <img src={fileInfo} width="100%" height="100%" />
                ) : (
                    <FiCamera className='text-7xl mx-auto' />
                )}
            </button>
        </Uploader>
    );
};

export { AvatarUploader };