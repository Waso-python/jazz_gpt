import {useEffect} from "react";

import {Box, Grid, IconButton, Typography} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import useCollapse from "@hooks/useCollapse";
import {useAppSelector} from "@store/hooks";
import {fileIdSelector} from "@store/app";
import {SkeletonLoading} from "@pages/home/SkeletonLoading";

import {useGetMoodMutation} from "@services";
import SnackBarError from "@components/snackBarError";
import getErrorMessage from "@utils/getErrorMessage";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const getMoodIcon = (mood) => {
    switch (mood) {
        case ('neutral'):
            return <SentimentNeutralIcon sx={{color: 'blue'}}/>
        case ('positive'):
            return <MoodIcon sx={{color: 'green'}}/>
        case ('negative'):
            return <SentimentVeryDissatisfiedIcon sx={{color: 'red'}}/>
        default:
            return null
    }
}

export const MetricBlock = () => {
    const fileId = useAppSelector(fileIdSelector)
    const [fetchMoods, {data: usersMoods, isLoading, error}] = useGetMoodMutation()

    const {isOpen, onToggle} = useCollapse()

    useEffect(() => {
        if (fileId) {
            fetchMoods(fileId)
        }
    }, [fileId])

    const getMetricContent = () => {
        if (isLoading || !usersMoods || !isOpen || !fileId) {
            return <SkeletonLoading numStr={6}/>
        } else if (error) {
            return (
                <SnackBarError>{`Не получилось загрузить настроения участников встречи (${getErrorMessage(error)})`}</SnackBarError>
            )
        } else {
            return usersMoods.map((userMetric, i) => {
                return (
                    <Box component="li" key={i} sx={{display: 'flex', mb: '10px'}}>
                        {
                            getMoodIcon(userMetric.common_mood)
                        }
                        <Typography sx={{ml: '10px'}}>
                            {userMetric.name}
                        </Typography>
                    </Box>
                )
            })
        }
    }

    return (
        <Grid container flexDirection='column' justifyContent='start' columnSpacing='16px'
              sx={{height: '100%', minWidth: '100%'}}>
            <Grid item
                  sx={{
                      py: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'end',
                      gap: '16px',
                      height: '60px',
                      minHeight: '60px'
                  }}
            >
                <IconButton sx={{color: 'white'}} onClick={onToggle}>
                    {
                        isOpen
                            ? <ArrowForwardIosIcon/>
                            : <ArrowBackIosIcon/>
                    }
                </IconButton>
                <Typography
                    sx={{
                        lineHeight: '1.75',
                        letterSpacing: '0.02857em'
                    }}
                >
                    Настроение участников встречи
                </Typography>
            </Grid>
            <Grid item>
                {
                    getMetricContent()
                }
            </Grid>
        </Grid>
    )
}