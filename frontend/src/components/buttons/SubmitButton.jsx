import Button from "@mui/material/Button";

const SubmitButton = ({disabled = false, sx = {}, children, type= 'submit', ...props}) => {
    return (
        <Button
            disabled={disabled}
            fullWidth
            size='large'
            color="success"
            sx={{...sx}}
            type={type}
            variant="contained"
            {...props}
        >{children}</Button>
    )
}

export default SubmitButton;