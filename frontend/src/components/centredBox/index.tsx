import {Box} from "@mui/material";

interface ICentredBoxProps {
    sx?: {[x: string]: any}
    position?: string
    children: any

    [x: string]: any
}


const CentredBox = ({sx = {}, position = 'relative', children, ...props}: ICentredBoxProps) => {
    return (
        <Box
            {...props}
            sx={{
                ...sx,
                position: position,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
            {children}
        </Box>
    )
}

export default CentredBox;