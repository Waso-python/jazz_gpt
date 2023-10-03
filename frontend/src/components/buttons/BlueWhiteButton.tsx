import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {SxProps, Theme} from "@mui/material/styles";

interface IBlueWhiteButtonProps {
    sx?: SxProps<Theme>
    children: string

    [x: string]: any
}

const BlueWhiteButton = ({sx, children, ...props}: IBlueWhiteButtonProps) => {
    return (
        <Button variant='customMain' sx={{...sx}} {...props}>
            {
                typeof children === 'string'
                    ? <Typography noWrap sx={{pr: '5px'}}>
                        {children}
                    </Typography>
                    : null
            }

        </Button>
    )
}

export default BlueWhiteButton;