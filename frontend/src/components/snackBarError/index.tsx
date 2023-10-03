//@ts-nocheck
import {useState} from "react";
import {SxProps, Theme} from '@mui/material/styles';

import Portal from '@mui/base/Portal';
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

import ErrorAlert from "@components/errorAlert";

interface ISnackBarError {
    closeHandler?: Function
    autoHideDuration?: number
    children: string
    sx?: SxProps<Theme>

    [x: string]: any
}

const SnackBarError = ({closeHandler, autoHideDuration = 6000, sx, children, ...props}: ISnackBarError) => {
    const [isError, setIsError] = useState(true);

    // @ts-ignore
    const onClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway')
            return

        if (closeHandler) {
            closeHandler()
        }

        setIsError(false)
    }

    return (
        <Portal>
            <Snackbar
                onClick={(e) => e.stopPropagation()}
                {...props}
                onClose={onClose}
                open={isError}
                autoHideDuration={autoHideDuration}
                sx={{...sx}}>
                <Box>
                    <ErrorAlert sx={{borderRadius: '12px'}}>{children}</ErrorAlert>
                </Box>
            </Snackbar>
        </Portal>
    )
}

export default SnackBarError;