import {Grid} from "@mui/material";

import {SectionWrapper} from "@components/sectionWrapper";
import Page from "@components/page";

import {LinksBlock} from "@pages/home/linksBlock";
import {SummaryBlock} from "@pages/home/summaryBlock";

import {MetricBlock} from "@pages/home/metricBlock";

export const Home = () => {
    return (
        <Page>
            <Grid container columnSpacing={2} sx={{mt: '10px'}}>
                {/*<Grid item xs={3} sx={{minHeight: '100px'}}></Grid>*/}
                <Grid item xs sx={{minHeight: '80vh'}}>
                    <SectionWrapper>
                        <SummaryBlock/>
                    </SectionWrapper>
                </Grid>
                <Grid item xs='auto' sx={{minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Grid item sx={{minHeight: '48%'}}>
                        <SectionWrapper sx={{minHeight: '100%', minWidth: '100%'}}>
                            <LinksBlock/>
                        </SectionWrapper>
                    </Grid>
                   <Grid item sx={{minHeight: '48%'}}>
                       <SectionWrapper sx={{minHeight: '100%', minWidth: '100%'}}>
                           <MetricBlock/>
                       </SectionWrapper>
                   </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}