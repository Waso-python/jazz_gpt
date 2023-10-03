import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import headerLogo from '@src/assets/images/header.svg';
import MarginWrapper from "../page/marginWrapper";

export const Header = () => {
    return (
        <Box sx={{
            height: '60px',
            width: '100%',
            position: 'sticky',
            backgroundColor: '#080808',
            top: '0',
            zIndex: '10',
        }}>
            <MarginWrapper>
                <Grid
                    container
                    justifyContent='space-between'
                    alignItems="center"
                    m='auto'
                    height='100%'
                    color='#ffffff'>
                    <Grid item>
                        <img src={headerLogo} alt='header'/>
                    </Grid>
                </Grid>
            </MarginWrapper>
        </Box>
    )
}