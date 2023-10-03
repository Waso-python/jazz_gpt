import {Paper} from "@mui/material"
import {SxProps} from "@mui/material/styles";

interface IPaperWrapper {
    children?: React.ReactNode;
    sx?: SxProps;
    [x: string]: any;
}

const PaperWrapper = ({children, sx, ...props}: IPaperWrapper) => {
    return (
        <Paper
            {...props}
            sx={{
                mt: '16px',
                p: '16px',
                borderRadius: 'unset',
                ...sx
            }}>
            {children}
        </Paper>
    )
}

export default PaperWrapper;