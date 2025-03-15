import React from 'react';

import { FiCamera } from "react-icons/fi";
import { Loader, Message, Uploader, useToaster } from 'rsuite';


function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
    callback(reader.result);
    };
    reader.readAsDataURL(file);
}

/**
 * TODO: Pas encore implementé
 * Objectif: Permettre l'upload d'un avatar et l'affichage de celui ci si déjà présent/ou à defaut un placeholder
 * Actuellement c/c doc rsuitejs composant AvatarUploader
 * https://rsuitejs.com/components/uploader/#avatar
 */
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
                    <img src={fileInfo} width="100%" height="100%" alt='avatar'/>
                ) : (
                    <FiCamera className='text-7xl mx-auto' />
                )}
            </button>
        </Uploader>
    );
};

export { AvatarUploader };
