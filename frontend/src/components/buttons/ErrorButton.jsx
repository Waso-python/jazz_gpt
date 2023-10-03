import Button from "@mui/material/Button";

const ErrorButton = ({sx, children, fullWidth = true, ...props}) => {
    return (
        <Button
            fullWidth={fullWidth}
            size='large'
            color="error"
            variant="contained"
            sx={{...sx}}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ErrorButton;