import Alert from '@mui/material/Alert';

const ErrorAlert = ({sx = {}, ...props}) => {
    return (
        <Alert
            severity="error"
            sx={{...sx, border: '1px solid #ffcdcc'}}>
            {props.children}
        </Alert>
    )
}

export default ErrorAlert