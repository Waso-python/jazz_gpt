import {useEffect} from "react";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {Grid, IconButton, Typography} from "@mui/material";


import SnackBarError from "@components/snackBarError";

import useCollapse from "@hooks/useCollapse";
import {SkeletonLoading} from "@pages/home/SkeletonLoading";
import {useAppSelector} from "@store/hooks";
import {fileIdSelector,} from "@store/app";
import {useGetLinksMutation} from "@services";
import getErrorMessage from "@utils/getErrorMessage";

export const LinksBlock = () => {
    const fileId = useAppSelector(fileIdSelector)
    const {isOpen, onToggle} = useCollapse()

    const [fetchIdeas, {data, isLoading, error}] = useGetLinksMutation()

    useEffect(() => {
        if (fileId) {
            fetchIdeas(fileId)
        }
    }, [fileId])

    const getBodyContent = () => {
        if (isLoading || !isOpen || !data || !fileId) {
            return <SkeletonLoading numStr={6}/>
        } else if (data && !data.length) {
            return (
                <Typography>
                    Не было найдено ссылок
                </Typography>
            )
        } else {
            return data.map((link, i) => {
                return (
                    <Typography key={i}>
                        {`- ${link}`}
                    </Typography>
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
                    Полезные ссылки
                </Typography>
            </Grid>
            <Grid item>
                {
                    error
                        ? <SnackBarError>{`Не получилось загрузить психологические портреты участников встречи (${getErrorMessage(error)})`}</SnackBarError>
                        : getBodyContent()

                }
            </Grid>
        </Grid>
    )
}