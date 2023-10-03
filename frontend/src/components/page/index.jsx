import PageMarginWrapper from "./marginWrapper";

import Box from '@mui/material/Box';

import {Header} from "@components/header";

const Page = ({sx = {}, withStickyHeader = true, showLogout= true,...props}) => {
    return (
        <Box sx={{...sx}}>
            <Header/>
            <Box sx={{pb: '16px'}}>
                <PageMarginWrapper>
                    {props.children}
                </PageMarginWrapper>
            </Box>
        </Box>
    );
}

export default Page;