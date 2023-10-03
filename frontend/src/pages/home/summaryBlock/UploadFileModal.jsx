import {useEffect} from 'react'
import {useDispatch} from "react-redux";

import {Box, Modal, Paper} from "@mui/material";

import CentredBox from "@components/centredBox";
import FileDropArea from "@components/fileDropArea";

import {useUploadFileMutation} from "@services";
import {setFileId, setUsers} from "@store/app";
import SnackBarError from "@components/snackBarError";
import getErrorMessage from "@utils/getErrorMessage";
import {ModalLoading} from "@components/loading";

export const UploadFileModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch()
    const [updatePost, {isLoading, isSuccess, data, error}] = useUploadFileMutation()
    const onUploadFile = (files) => {
        try {
            const file = files[0];
            const formData = new FormData();
            formData.append('file', file)

            updatePost(formData)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUsers(data.users))
            dispatch(setFileId(data.file_id))
        }
        if (isLoading) {
            onClose()
        }
    }, [isSuccess, data, isLoading])

    return (
        <>
            {
                isLoading &&
                <ModalLoading/>
            }
            {
                error &&
                <SnackBarError>
                    {`Не удалось загрузить файл (${getErrorMessage(error)})`}
                </SnackBarError>
            }
            <Modal
                open={isOpen}
                onClose={onClose}
                backdrop={<Paper sx={{backgroundColor: 'inherit'}}/>}
            >
                <Box>
                    <CentredBox
                        position='absolute'
                        sx={{
                            position: 'absolute',
                            width: '450px',
                        }}
                    >
                        <FileDropArea
                            width='100%'
                            height='250px'
                            topic='Загрузите файл'
                            fileFormat=".txt"
                            submitButtonTopic='Отправить'
                            onSubmit={onUploadFile}
                        />
                    </CentredBox>
                </Box>
            </Modal>
        </>
    )
}