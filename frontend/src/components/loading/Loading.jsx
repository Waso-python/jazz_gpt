import CircularProgress from '@mui/material/CircularProgress';
import CentredBox from "@components/centredBox";

const Loading = () => {
    return (
        <CentredBox position='absolute'>
            <CircularProgress color='inherit'/>
        </CentredBox>
    )
}

export {Loading};