import {Link} from "react-router-dom"

import RefreshIcon from '@mui/icons-material/Refresh';
import {Button,Typography,Grid} from "@mui/material";

import CentredBox from "@components/centredBox";
import Page from "@components/page";

import getErrorMessage from "@utils/getErrorMessage";
import {SectionWrapper} from "@components/sectionWrapper";


const ErrorPage = ({error = {}}) => {
    return (
        <Page>
            <CentredBox
                position='absolute'
                sx={{
                    width: '500px',
                    height: 'max-content',
                    padding: '50px',
                }}>
                <SectionWrapper>
                    <Grid container sx={{height: '100%'}}>
                        <Grid item alignSelf='end' xs={12}>
                            <Typography variant='h5' textAlign='center'>
                                {getErrorMessage(error)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            justifyContent='center'
                            xs={12}
                            sx={{mt: '32px'}}
                        >
                            <Grid item sx={{width: '180px', mr: '32px'}}>
                                <Link to={'/'}>
                                    <Button
                                        variant='outlined'
                                        fullWidth
                                        onClick={() =>window.location.reload()}
                                        startIcon={<RefreshIcon/>}
                                        sx={{
                                            color: '#3F82FD',
                                            borderColor: '#3F82FD',
                                            borderRadius: '12px',
                                            height: '40px',
                                            lexWrap: 'nowrap',
                                            minWidth: 'max-content'
                                        }}
                                    >
                                        Обновить страницу
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item sx={{width: '180px'}}>

                            </Grid>
                        </Grid>
                    </Grid>
                </SectionWrapper>
            </CentredBox>
        </Page>
    )
}

export default ErrorPage