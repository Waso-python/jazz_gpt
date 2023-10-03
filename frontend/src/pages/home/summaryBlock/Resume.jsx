import {useEffect} from "react";

import {useAppSelector} from "@store/hooks";
import {fileIdSelector, usersSelector} from "@store/app";
import {useGetSummaryMutation} from "@services";

import SnackBarError from "@components/snackBarError";
import CollapsedBlock from "@components/collapsedBlock";
import {SkeletonLoading} from "@pages/home/SkeletonLoading";
import getErrorMessage from "@utils/getErrorMessage";
import {Box, Typography} from "@mui/material";

export const Resume = () => {
    const fileId = useAppSelector(fileIdSelector)
    const users = useAppSelector(usersSelector)
    const [fetchSummary, {data, isLoading, error}] = useGetSummaryMutation()

    useEffect(() => {
        if (fileId) {
            fetchSummary(fileId)
        }
    }, [fileId])

    const getContent = () => {
        if (isLoading || !data)  {
            return <SkeletonLoading numStr={5}/>
        }

        return (
            Object.entries(data).map(([userId, ideas]) => {
                return (
                    <Box key={userId} sx={{mb: '20px'}}>
                        <Typography sx={{fontWeight: '500', mb: '10px'}}>
                            {`${users[userId]}:`}
                        </Typography>
                        {
                            ideas.map((idea, i) => {
                                return (
                                    <Typography key={i}>
                                        {idea}
                                    </Typography>
                                )
                            })
                        }
                    </Box>
                )
            })
        )
    }

    if (!fileId) {
        return (
            <SkeletonLoading numStr={8}/>
        )
    } else if (error) {
        return (
            <SnackBarError>{`Не получилось загрузить краткое содержание встречи (${getErrorMessage(error)})`}</SnackBarError>
        )
    }


    return (
        <CollapsedBlock topicName='Краткое содержание встречи' withDivider>
            {
                getContent()
            }
        </CollapsedBlock>
    )
}