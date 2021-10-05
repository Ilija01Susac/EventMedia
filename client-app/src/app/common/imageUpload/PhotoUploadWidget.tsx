import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgeteDropzone from './PhotoWidgeteDropzone';
import { Cropper } from 'react-cropper';
import PhotoWidgeteCroper from './PhotoWidgeteCroper';

interface Props {
    loading: boolean;
    uploadPhoto : (file: Blob) => void;
}

export default function PhotoUploadWidget({loading, uploadPhoto} : Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color="teal" content='Step 1 - Add Photo ' />
                <PhotoWidgeteDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color="teal" content='Step 2 - Resize Image ' />
                {files && files.length > 0 && (
                    <PhotoWidgeteCroper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color="teal" content='Step 1 - Preview and upload ' />
                {files && files.length > 0 &&
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>}
            </Grid.Column>
        </Grid>
    )
}