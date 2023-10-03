//@ts-nocheck
import {useEffect, useRef, useState} from 'react';

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

import {Box, Button, Grid, Typography} from "@mui/material"
import {SxProps, Theme} from "@mui/material/styles";

import SnackBarError from "@components/snackBarError";

interface IFileDropAreaProps {
    sx?: SxProps<Theme>;
    topic: string;
    width: string;
    height: string;
    fileFormat?: string;
    submitButtonTopic: string;
    onSubmit: (file: FileList) => void;
}

const FileDropArea = ({sx, width, height, topic, fileFormat, submitButtonTopic, onSubmit}: IFileDropAreaProps) => {
    const [files, setFiles] = useState<FileList | null>(null)
    const [dropZoneFocused, setDropZoneFocused] = useState<boolean>(false)
    const [isValidExt, setIsValidExt] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)

    // Проверяет загруженный файл на расширение
    // Расширение должно быть передано в формате '.jpg,.png'
    const checkValidExtension = (files: FileList, fileFormat: string) => {
        const isValidExtension = fileFormat.split(',')
            .some(format => {
                const trimmedFormat = format.trim()

                return files[0].name.includes(trimmedFormat)
            })

        return isValidExtension
    }

    // Очищает загруженный файл в том числе с input.files
    const clearFile = () => {
        inputRef!.current!.files = new DataTransfer().files
        setFiles(null)
    }

    // При изменении файла проверяется расширение
    // если расширение невалидно выводится ошибка
    // и очищается загруженный файл
    useEffect(() => {
        if (files && fileFormat) {
            if (!checkValidExtension(files, fileFormat)) {
                clearFile()
                setIsValidExt(false)
            }
        }
    }, [files])

    // Сохранение файла
    // Если был загружен до этого файл, а новый прикрепленный невалидный
    // тогда новый сбрасываем, старый оставляем. Иначе загружаем новый файл
    const handleSaveFile = (newFiles: FileList | null) => {
        setIsValidExt(true)
        setDropZoneFocused(false)
        if (!newFiles || !newFiles.length) {
            return
        } else if (files && fileFormat && !checkValidExtension(newFiles, fileFormat)) {
            setIsValidExt(false)
            return
        }

        setFiles(newFiles)
    }

    // Обработчик события когда перетаскиваемый объект над зоной дропа
    // @ts-ignore
    const handleDragOver = (e: React.DragEvent) => {
        if (!dropZoneFocused)
            setDropZoneFocused(true)

        e.preventDefault()
    }

    // Обработчик события когда перетаскиваемый объект покинул зону дропа
    // @ts-ignore
    const handleDragLeave = (e: React.DragEvent) => {
        if (dropZoneFocused)
            setDropZoneFocused(false)

        e.preventDefault()
    }

    // Обработчик события когда перетаскиваемый объект был сброшен
    // @ts-ignore
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        handleSaveFile(e.dataTransfer.files)
    }

    // функция отправки файла
    // @ts-ignore
    const handleSumbit = (e: React.MouseEvent) => {
        e.stopPropagation()
        onSubmit(files!)
        clearFile()
        setIsValidExt(true)
    }

    return (
        <>
            {
                !isValidExt &&
                <SnackBarError
                    closeHandler={() => setIsValidExt(true)}
                >
                    Неверное формат файла
                </SnackBarError>
            }
            <Box
                onMouseEnter={() => setDropZoneFocused(true)}
                onMouseLeave={() => setDropZoneFocused(false)}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => inputRef!.current!.click()}
                sx={{
                    ...sx,
                    borderRadius: '10px',
                    bgcolor: dropZoneFocused ? 'hsl(131deg 72.4% 38.48%)' : 'hsl(131deg 71.74% 36.08%)',
                    backgroundClip: 'padding-box',
                    cursor: 'pointer',
                    transition: 'all .3s ease-in-out',
                    width,
                    height
                }}
            >
                <Box sx={{display: 'none', width: '100%', height: '100%'}}>
                    <input
                        type='file'
                        accept={fileFormat}
                        onChange={(e) => handleSaveFile(e.target.files)}
                        hidden
                        ref={inputRef}
                    />
                </Box>
                <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='column'
                    sx={{width: '100%', height: '100%'}}
                >
                    {/*<Grid sx={{py: '10px'}}>*/}
                    {/*    <TextField*/}
                    {/*        onCLick={e => e.stopPropagation()}*/}
                    {/*        sx={{borderColor: 'none', backgroundColor: 'red'}}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item>
                        <InsertDriveFileOutlinedIcon
                            sx={{color: 'white'}}
                            fontSize='large'
                        />
                    </Grid>
                    <Grid item>
                        <Typography sx={{color: 'white'}}>
                            {topic}
                        </Typography>
                    </Grid>
                    {
                        files &&
                        <>
                            <Grid item>
                                <Typography sx={{fontWeight: '500'}}>
                                    {files[0]?.name}
                                </Typography>
                            </Grid>
                            <Grid item sx={{mt: '10px'}}>
                                <Button
                                    onMouseEnter={(e: any) => {
                                        e.stopPropagation();
                                        setDropZoneFocused(false)
                                    }}
                                    onMouseLeave={() => setDropZoneFocused(true)}
                                    variant='outlined'
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            opacity: '.5'
                                        },
                                        transition: 'all .3s ease-in-out'
                                    }}
                                    onClick={handleSumbit}
                                >
                                    {submitButtonTopic}
                                </Button>
                            </Grid>
                        </>
                    }
                </Grid>
            </Box>
        </>
    )
}

export default FileDropArea