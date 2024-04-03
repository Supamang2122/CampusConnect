import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { uploadImage } from '../apis/apis';

const Dropzone = (props) => {
    const onDrop = useCallback(async acceptedFiles => {
            const formData = new FormData();
            const file = acceptedFiles.at(-1);
            const username = 'swag'.concat('_user');
            const { userRef } = props;
            formData.append('file', file);
            var hostUrl = window.location.hostname;
            hostUrl = hostUrl.replaceAll('.','-');
            uploadImage(hostUrl, formData, file, username, userRef); // TODO change user name to actual username
            props.setRecentImage(file);
            props.setUploadStatus(respJson.message);
        }, [])
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

        return (
        <div {...getRootProps()} className={props.className}>
            <input {...getInputProps()} />
            {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
        )
};

export {Dropzone};