import Box from '@mui/material/Box';
import './index.css';

const PageMarginWrapper = ({sx = {}, ...props}) => {
    return (
        <Box sx={{...sx}} className='margin-wrapper'>
            {props.children}
        </Box>
    );
}

export default PageMarginWrapper;